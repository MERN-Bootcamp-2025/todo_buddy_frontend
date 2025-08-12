import React, { useState } from "react";
import BaseInput from "../../components/BaseInput";
import CardComponent from "../../components/CardComponent";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const navigate = useNavigate();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("login response =>", result);

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      const { accessToken, user } = result;

      // Save to localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("user", JSON.stringify(user));

      // Close modal
      setIsOpen(false);

      navigate("/dashboard");
      // window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CardComponent className="space-y-4 max-w-md mx-auto mt-80 ">
        <CardComponent.Header>
          <CardComponent.Header.Title className="ml-2">TaskMaster</CardComponent.Header.Title>
        </CardComponent.Header>
        <CardComponent.Body>
          <form  onSubmit={handleLogin}>
            <div>             
              <BaseInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className=" border-gray-300 rounded px-3 py-2 "
                required
              />
            </div>
            <div>
                 <BaseInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className=" border-gray-300 rounded px-3 py-2"
                required
              />
              
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              buttonVariant="solid"
              disabled={loading}
              className=" bg-blue-600 w-full text-white py-2 mt-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardComponent.Body>
      </CardComponent>
    </>
  );
}

export default Register;
