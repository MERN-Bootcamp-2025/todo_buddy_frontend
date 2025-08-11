import React, { useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import Dropdown from "../../components/Button/DropDown";
import Button from "../../components/Button";

import TaskList from "../../components/TaskList";
import UserProfile from "../../components/UserProfile";
import AddTask from "../../components/AddTask";
// import Modal from "../components/Modal";


// interface DropdownEvent {
//     target: {
//         value: string;
//     };
// }


const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const getAllTodos = async (status = "", priority = "") => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      let url = "http://localhost:8080/api/todos";
      const params = [];
      if (status) params.push(`status=${status}`);
      if (priority) params.push(`priority=${priority}`);
      if (params.length) url += `?${params.join("&")}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data.todos || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };



const handleStatusChange = useCallback(
    (selectedStatus: string) => {
        console.log("Selected status:");
        console.log(selectedStatus);

        const status = selectedStatus.toLowerCase();
        setStatusFilter(status);
        getAllTodos(status, priorityFilter);
    },
    [priorityFilter]
);

const handlePriorityChange = useCallback(
    (selectedPriority: string) => {
        const priority = selectedPriority.toLowerCase();
        setPriorityFilter(priority);
        getAllTodos(statusFilter, priority);
    },
    [statusFilter]
);
    useEffect(() => {
    getAllTodos();
  }, [handleStatusChange, handlePriorityChange]);


  const handleModal = () => {
    setIsOpenModal((prev) => !prev);
  };  
  const handleTodoEdit = () => {
    setIsOpenModal((prev) => !prev);
  };
  const handleClose=()=>{
    setIsOpenModal(false)
  }
  return (
    <>
     
      <UserProfile />
      <div className="bg-gray-100 min-h-screen px-8 py-6 mx-auto">
        <div className="flex justify-between items-center  mb-4 max-w-7xl m-auto">
          <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
          <Button
            buttonVariant="solid"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={handleModal}
            
          >
            <FaPlus size={14} />
            <div className="text-md font-light">
            New Task

            </div>
          </Button>
        </div>

        {isOpenModal && (
            <AddTask  onClose={handleClose}/>
        )}

        <div className="bg-white p-5 rounded shadow-sm mt-6 space-y-4  max-w-7xl m-auto">
          <input
            type="text"
            placeholder="Search tasks by name..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <Dropdown
              options={[
                { value: "todo", label: "To Do" },
                { value: "in_progress", label: "In Progress" },
                { value: "on_hold", label: "Hold" },
                { value: "done", label: "Done" },
                { value: "will_not_do", label: "Will Not do" },
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
        <div className="mt-6 max-w-7xl m-auto">

          <TaskList tasks={tasks} onEdit={handleTodoEdit} onDelete={function (id: string): void {
                  throw new Error("Function not implemented.");
              } } />
        </div>
          
        </div>
    
    </>
  );
};

export default MyTask;
