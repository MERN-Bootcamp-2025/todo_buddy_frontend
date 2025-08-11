
import React, { useState, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button";
import CardComponent from "../CardComponent";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  expected_completion: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTaskUpdate: (updatedTask: Task) => void;
}

const statusOptions = ["todo", "in_progress", "done", "on_hold", "will_not_do"];
const priorityOptions = ["low", "medium", "high", "critical"];

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onTaskUpdate }) => {
  const [editingField, setEditingField] = useState<{ id: string; field: "status" | "priority" } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = async (task: Task, field: "status" | "priority", value: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/todos/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [field]: value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();
      onTaskUpdate(updatedTask);
      setEditingField(null);
    } catch (error) {
      console.error(error);
      alert("Error updating task.");
    }
  };

  const loadMoreTasks = () => {
    console.log("Reached bottom! Load more tasks here...");

  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreTasks();
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="space-y-4 h-[600px] overflow-y-auto pr-2"
    >
      {tasks.map((task) => (
        <CardComponent.Body
          as="div"
          key={task.id}
          className="bg-white p-4 rounded shadow-sm flex justify-between items-start"
        >
          <div className="flex flex-col gap-2">
            <div className="mb-3 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>


<div className="flex w-[200px] justify-between gap-2 relative">

  {editingField?.id === task.id && editingField.field === "status" ? (
    <select
      className="text-xs border rounded px-2 py-1"
      value={task.status}
      onChange={(e) => handleChange(task, "status", e.target.value)}
      onBlur={() => setEditingField(null)}
      autoFocus
    >
      {statusOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt.replace("_", " ").toUpperCase()}
        </option>
      ))}
    </select>
  ) : (
    <span
      onClick={() => setEditingField({ id: task.id, field: "status" })}
      className={`text-xs font-medium py-1 px-2 rounded-full cursor-pointer ${
        task.status === "todo"
          ? "bg-gray-200 text-gray-800"
          : task.status === "in_progress"
          ? "bg-blue-200 text-blue-800"
          : task.status === "done"
          ? "bg-green-200 text-green-800"
          : task.status === "on_hold"
          ? "bg-orange-200 text-orange-800"
          : task.status === "will_not_do"
          ? "bg-red-200 text-red-800"
          : ""
      }`}
    >
      {task.status.replace("_", " ").toUpperCase()}
    </span>
  )}

  {editingField?.id === task.id && editingField.field === "priority" ? (
    <select
      className="text-xs border rounded px-2 py-1"
      value={task.priority}
      onChange={(e) => handleChange(task, "priority", e.target.value)}
      onBlur={() => setEditingField(null)}
      autoFocus
    >
      {priorityOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt.toUpperCase()}
        </option>
      ))}
    </select>
  ) : (
    <span
      onClick={() => setEditingField({ id: task.id, field: "priority" })}
      className={`text-xs font-medium py-1 px-2 rounded-full cursor-pointer ${
        task.priority === "low"
          ? "bg-green-200 text-green-800"
          : task.priority === "medium"
          ? "bg-yellow-200 text-yellow-800"
          : task.priority === "high"
          ? "bg-red-200 text-red-800"
          : task.priority === "critical"
          ? "bg-purple-200 text-purple-800"
          : ""
      }`}
    >
      {task.priority.toUpperCase()}
    </span>
  )}
</div>

            
          </div>

          <div className="relative flex gap-5 mt-2">
            <Button
              onClick={() => onEdit(task.id)}
              className="text-gray-500 hover:text-blue-500"
            >
              <FaEdit size={16} />
            </Button>
            <Button
              onClick={() => onDelete(task.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <FaTrash size={16} />
            </Button>
          </div>
        </CardComponent.Body>
      ))}
    </div>
  );
};

export default TaskList;
