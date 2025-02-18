import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: string | number;
}

interface TodoItemProps {
  todo: Todo;
  toggleCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleCompleted,
  deleteTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <span
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
          className="flex-1 p-2 border rounded w-full max-w-xs"
        />
      ) : (
        <span
          className={`flex-1 items-center cursor-pointer ${
            todo.completed ? "text-gray-500" : "text-gray-800"
          }`}
        >
          <span
            className={` flex-1 break-words whitespace-normal px-2 w-[323px] ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.title}
          </span>
        </span>
      )}
      <button
        onClick={handleEdit}
        className={`bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 p-1 sm:px-2 py-1 sm:py-2`}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <button
        onClick={() => deleteTodo(todo.id)}
        className={`bg-red-600 text-white rounded-r-lg hover:bg-red-700  focus:ring-red-500 p-1 sm:px-2 py-1 sm:py-2`}
      >
        Delete
      </button>
    </span>
  );
};

export default TodoItem;
