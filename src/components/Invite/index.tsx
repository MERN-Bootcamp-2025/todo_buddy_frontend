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
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, role }),
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
        {/* Header */}
        <CardComponent.Header>
          <CardComponent.Header.Title>Invite User</CardComponent.Header.Title>
        </CardComponent.Header>

        {/* Body */}
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

        {/* Footer */}
        <CardComponent.Footer>
          <div className="flex justify-end gap-3 p-4">
            <Button
              onClick={onClose}
              buttonVariant="solid"
              buttonStyle={{
                backgroundColor: "#E5E7EB",
                color: "black",
                height: "40px",
                width: "auto",
                padding: "0.5rem 1rem",
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              isLoading={loading}
              buttonVariant="solid"
              buttonStyle={{
                backgroundColor: "#60A5FA",
                color: "white",
                height: "40px",
                width: "auto",
                padding: "0.5rem 1rem",
              }}
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
