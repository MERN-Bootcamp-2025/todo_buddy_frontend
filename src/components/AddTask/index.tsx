import React, { useState } from "react";
import CardComponent from "../CardComponent";
import Button from "../Button";
import Dropdown from "../Button/DropDown";
import BaseInput from "../BaseInput";
import TextArea from "../TextArea";
// import Modal from "./Modal";

interface AddTaskProps {
  onClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

 const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log("userId", userId  );
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    } 
    const payload = {
      title,
      description,
      status: status.toLowerCase().replace(" ", "_"),
      priority: priority.toLowerCase(),
      user_id: userId,
    };

    try {
        const response = await fetch(`http://localhost:8080/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, },
        body: JSON.stringify(payload),

      });
      console.log("response", response  );
      
      onClose();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  function handlePriorityChange(value: string): void {
    setPriority(value);
  }

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">


       <div
        className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
    <CardComponent.Body className="space-y-4 bg-black-900  ">
    <form className="space-y-4 bg-black-900  ">

  
      <div className="space-y-4">
        <div>
          <BaseInput
            type="text"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            // className="w-full border-gray-900 rounded px-3 py-2"
            />
        </div>
        <div>
          <TextArea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of the task..."
            className="w-full border-gray-300 rounded  py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative gap-4 ">
            <label className="block text-sm ">Priority</label>
            <Dropdown
                options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
                { value: "critical", label: "Critical" },
              ]}
              value={priority}
              onSelect={handlePriorityChange}
              placeholder="Filter by Priority"
            />
          </div>
          <div>
            <label className="block text-sm">Status</label>
            <Dropdown
              options={[
                { value: "todo", label: "To Do" },
                { value: "in_progress", label: "In Progress" },
                { value: "on_hold", label: "Hold" },
                { value: "done", label: "Done" },
                { value: "will_not_do", label: "Will Not do" },
              ]}
              value={status}
              onSelect={(value) => setStatus(value)}
              placeholder="Filter by Status"
              />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center w-full">
        <Button type= "button" className="bg-blue-600 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-700" buttonVariant="solid" onClick={handleSubmit}>
          Submit Task
        </Button>
      </div>
        </form>
        </CardComponent.Body>
        </div>
    // </Modal>
  );
};

export default AddTask;




