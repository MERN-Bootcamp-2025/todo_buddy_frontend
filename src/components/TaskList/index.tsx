// TaskList.tsx
import React from "react";
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
}


const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  console.log("tasks", tasks);
  
  return (

    <div className="space-y-4">
      {tasks.map((task) => (
        <CardComponent.Body
          as="div"
          key={task.id}
          className="bg-white  p-4 rounded shadow-sm flex justify-between items-flex-start"
        >
          <div className="flex flex-col gap-2 ">
          <div className="mb-3 flex border-red-500 flex-col">
            <h3 className="text-xl font-semibold text-gray-900">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="flex w-[200px] justify-between">
            <span
              className={`text-xs font-medium py-1 px-2 rounded-full ${
                task.status === "todo"
                  ? "bg-gray-200 text-gray-800"
                  : task.status === "in_progress"
                  ? "bg-blue-200 text-blue-800"
                  : task.status === "done"
                  ? "bg-green-200 text-green-800"
                  : task.status === "on-hold"
                  ? "bg-orange-200 text-orange-800"
                  : task.status === "will-not-do"
                  ? "bg-red-200 text-red-800"
                  : ""
              }`}
            >
              {task.status.replace("-", " ").toUpperCase()}
            </span>
            <span
              className={`text-xs font-medium py-1 px-2 rounded-full ${
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
              </div> 
               </div>
             <div className="relative flex gap-5 mt-2 " >
                <Button   onClick={() => onEdit(task.id)}
                className="text-gray-500 hover:text-blue-500"> <FaEdit size={16} /></Button> 
                <Button   onClick={() => onDelete(task.id)}
                className="text-gray-500 hover:text-red-500">  <FaTrash size={16} /></Button>
            </div>
         
         
            
        </CardComponent.Body>
      ))}
    </div>

  );
};

export default TaskList;
