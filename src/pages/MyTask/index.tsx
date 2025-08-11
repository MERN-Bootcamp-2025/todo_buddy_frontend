import React, { useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";

import Dropdown from "../../components/Button/DropDown";
import Button from "../../components/Button";
import TaskList from "../../components/TaskList";
import UserProfile from "../../components/UserProfile";
import AddTask from "../../components/AddTask";
import ConfirmDeleteModal from "../../components/DeleteTask";
import TaskUpdate from "../../components/TaskUpdate/incex";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  expected_completion: string;
}

const MyTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const getAllTask = useCallback(
    async (status = "", priority = "") => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authentication token is missing.");
          return;
        }

        let endpoint = "http://localhost:8080/api/todos";
        const queryParams = [];

        if (status) queryParams.push(`status=${status}`);
        if (priority) queryParams.push(`priority=${priority}`);
        if (queryParams.length > 0) endpoint += `?${queryParams.join("&")}`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch tasks.");

        const data = await response.json();
        setTasks(data.todos || []);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    },
    []
  );

  useEffect(() => {
    getAllTask();
  }, [getAllTask]);

  const handleStatusChange = (selectedStatus: string) => {
    const status = selectedStatus.toLowerCase();
    setStatusFilter(status);
    getAllTask(status, priorityFilter);
  };

  const handlePriorityChange = (selectedPriority: string) => {
    const priority = selectedPriority.toLowerCase();
    setPriorityFilter(priority);
    getAllTask(statusFilter, priority);
  };

  const toggleAddModal = () => setAddModalOpen((prev) => !prev);

  const openEditModal = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
      setEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setSelectedTask(null);
    setEditModalOpen(false);
  };

  const updateTaskInList = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const confirmDeleteTask = async () => {
    if (!taskIdToDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/todos/${taskIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete task.");

      setTasks((prev) => prev.filter((task) => task.id !== taskIdToDelete));
      setDeleteModalOpen(false);
      setTaskIdToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const openDeleteModal = (taskId: string) => {
    setTaskIdToDelete(taskId);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <UserProfile />

      <div className="bg-gray-100 min-h-screen px-8 py-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
          <Button
            buttonVariant="solid"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={toggleAddModal}
          >
            <FaPlus size={14} />
            <span className="text-md font-light">New Task</span>
          </Button>
        </div>

        {isAddModalOpen && <AddTask onClose={toggleAddModal} />}

        {isEditModalOpen && selectedTask && (
          <TaskUpdate
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            task={selectedTask}
            onTaskUpdated={updateTaskInList}
          />
        )}

        <div className="bg-white p-5 rounded shadow-sm mt-6 space-y-4">
          <input
            type="text"
            placeholder="Search tasks by name..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-4 mt-2">
            <Dropdown
              options={[
                { value: "todo", label: "To Do" },
                { value: "in_progress", label: "In Progress" },
                { value: "on_hold", label: "Hold" },
                { value: "done", label: "Done" },
                { value: "will_not_do", label: "Will Not Do" },
              ]}
              value={statusFilter}
              onSelect={handleStatusChange}
              placeholder="Filter by Status"
            />

            <Dropdown
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
                { value: "critical", label: "Critical" },
              ]}
              value={priorityFilter}
              onSelect={handlePriorityChange}
              placeholder="Filter by Priority"
            />
          </div>
        </div>

        <div className="mt-6">
          <TaskList
            tasks={tasks}
            onEdit={openEditModal}
            onTaskUpdate={updateTaskInList}
            onDelete={openDeleteModal}
          />
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteTask}
      />
    </>
  );
};

export default MyTasksPage;
