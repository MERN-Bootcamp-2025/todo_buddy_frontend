import React, { useEffect, useState } from "react";
import CardComponent from "../CardComponent";
import Button from "../Button";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

interface TaskUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onConfirm: () => void;
  titleValue: string;
  descriptionValue: string;
  statusValue: string;
  priorityValue: string;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  setStatus: (val: string) => void;
  setPriority: (val: string) => void;
  onTaskUpdated?: (updatedTask: Task) => void;
  task?: Task;
}

const TaskUpdate: React.FC<TaskUpdateProps> = ({
  isOpen,
  onClose,
  onConfirm,
  titleValue,
  descriptionValue,
  statusValue,
  priorityValue,
  onTaskUpdated,
  task,
}) => {

     const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  // Populate form from task when modal opens
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "");
      setStatus(task.status || "");
    }
  }, [task, setTitle, setDescription, setPriority, setStatus]);

  if (!isOpen) return null;

  const handleUpdate = async () => {

   const userid= localStorage.getItem("userId")
    if (!task?.id) {
      console.error("Missing task ID.");
      return;
    }

    const updatedTask = {
      id: task.id,
      title: title,
      description: description,
      priority: priority,
      status: status,
      user_id: userid
      
    };
    

    try {
      const token = localStorage.getItem("token");
      console.log("task.id",task.id);
      
      const response = await fetch(`http://localhost:8080/api/todos/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) throw new Error("Failed to update task");

      if (onTaskUpdated) {
        onTaskUpdated(updatedTask);
      }

      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <CardComponent className="w-full max-w-xl">
        <CardComponent.Header>
          <CardComponent.Header.Title>{title}</CardComponent.Header.Title>
        </CardComponent.Header>

        <CardComponent.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm">Title</label>
              <input
                type="text"
                value={titleValue}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm">Description</label>
              <textarea
                value={descriptionValue}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">Priority</label>
                <select
                  value={priorityValue}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm">Status</label>
                <select
                  value={statusValue}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="on-hold">Hold</option>
                  <option value="done">Done</option>
                  <option value="will-not-do">Will Not Do</option>
                </select>
              </div>
            </div>
          </div>
        </CardComponent.Body>

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
              onClick={handleUpdate}
              buttonVariant="solid"
              buttonStyle={{
                backgroundColor: "#60A5FA",
                color: "white",
                height: "40px",
                width: "auto",
                padding: "0.5rem 1rem",
              }}
            >
              Update
            </Button>
          </div>
        </CardComponent.Footer>
      </CardComponent>
    </div>
  );
};

export default TaskUpdate;
