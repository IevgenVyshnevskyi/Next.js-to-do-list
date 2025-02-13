import { useState } from "react";
import Button from "./Button";

export default function TodoItem({
  todo,
  toggleCompleted,
  deleteTodo,
  editTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li
      className={`flex justify-between items-center p-3 border-b-2 ${
        todo.completed ? "bg-green-100" : "bg-gray-50"
      } rounded-lg shadow-sm`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompleted(todo.id)}
        className="form-checkbox text-blue-600"
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      ) : (
        <span
          className={`flex items-center cursor-pointer ${
            todo.completed ? "text-gray-500" : "text-gray-800"
          }`}
        >
          <span
            className={`break-words whitespace-normal px-2 w-[323px] ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.title}
          </span>
        </span>
      )}
      <button
        onClick={handleEdit}
        className="bg-blue-600 text-white px-2 py-2 rounded-l-lg hover:bg-blue-700 focus:ring-2 focus:outline-none"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="bg-red-600 text-white px-2 py-2 rounded-r-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
      >
        Delete
      </button>
    </li>
  );
}
