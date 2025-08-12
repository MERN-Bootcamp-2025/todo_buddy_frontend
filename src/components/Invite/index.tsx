import { useState } from "react";
import Button from "../Button";
import CardComponent from "../CardComponent";

interface InviteProps {
  isOpen: boolean;
  onClose: () => void;
}

const Invite: React.FC<InviteProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !role) {
      alert("Please fill in all fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No authentication token found");
      return;
    }

    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      console.log("userID", user.email);

      if (!user || !user.email) {
        alert("User information is missing or invalid.");
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await fetch("http://localhost:8080/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, role, password,from_email: user.email }),
      });

      if (!response.ok) throw new Error("Failed to invite user");

      onClose();
    } catch (error) {
      console.error("Error inviting user:", error);
      alert("Failed to invite. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <CardComponent className="w-full max-w-md">
        <CardComponent.Header>
          <CardComponent.Header.Title>Invite User</CardComponent.Header.Title>
        </CardComponent.Header>
        <CardComponent.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm">Name</label>
              <input
                type="text"
                placeholder="e.g., John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                placeholder="e.g., john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div> 
            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </CardComponent.Body>
        <CardComponent.Footer>
          <div className="flex justify-end gap-3 p-4">
            <Button
              onClick={onClose}
              buttonVariant="solid"
              className="bg-[#E5E7EB] text-black h-10 w-auto p-2 rounded-lg"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              isLoading={loading}
              buttonVariant="solid"
              className="bg-[#60A5FA] text-white h-10 w-auto p-2 rounded-lg"
          
            >
              {loading ? "Inviting..." : "Invite"}
            </Button>
          </div>
        </CardComponent.Footer>
      </CardComponent>
    </div>
  );
};

export default Invite;