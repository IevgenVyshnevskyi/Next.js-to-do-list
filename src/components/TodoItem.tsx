import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";

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
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };


  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
    handleEdit();
    setIsEditing(false);
  }

  return (
    <>
      <span
        className={`flex justify-between items-center p-2 sm:p-3 border-b-2 ${
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
            className="flex-1 p-2 border rounded w-full mx-1 max-w-xs"
          />
        ) : (
          <span
            onDoubleClick={openModal}
            className={`flex-1 items-center cursor-pointer w-[100px] break-words whitespace-normal px-1 sm:w-[323px] ${
              todo.completed ? "text-gray-500" : "text-gray-800"
            }`}
          >
            <span
              className={` flex-1 break-words whitespace-normal px-2 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </span>
          </span>
        )}
        <div className="flex flex-col sm:flex-row">
          <button
            onClick={handleEdit}
            className={`bg-blue-600 text-white rounded-t-lg sm:rounded-r-none sm:rounded-l-lg hover:bg-blue-700 p-1 sm:px-2 py-1 sm:py-2 sm:w-[44px]`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className={`bg-red-600 text-white rounded-b-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-red-700  focus:ring-red-500 p-1 sm:px-2 py-1 sm:py-2`}
          >
            Delete
          </button>
        </div>
      </span>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-lg w-[96%] sm:w-[523px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <span
          className={`flex justify-between items-center p-2 sm:p-3 border-b-2 ${
            todo.completed ? "bg-green-100" : "bg-gray-50"
          } rounded-lg shadow-sm`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo.id)}
            className="form-checkbox text-blue-600"
            onClick={handleEdit}
          />
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 p-2 border rounded w-full max-w-sm text-xl mx-1"
            />
          ) : (
            <span
              onClick={handleEdit}
              className={`flex-1 items-center cursor-pointer w-[100px] break-words whitespace-normal px-2 sm:w-[323px] ${
                todo.completed ? "text-gray-500" : "text-gray-800"
              }`}
            >
              <span
                className={` flex-1 break-words whitespace-normal px-2 text-2xl ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.title}
              </span>
            </span>
          )}
          <div className="flex flex-col sm:flex-row">
            <button
              onClick={handleEdit}
              className={`bg-blue-600 text-white rounded-t-lg sm:rounded-r-none sm:rounded-l-lg hover:bg-blue-700 p-1 sm:px-2 py-1 sm:py-2 sm:w-[44px]`}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className={`bg-red-600 text-white rounded-b-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-red-700  focus:ring-red-500 p-1 sm:px-2 py-1 sm:py-2`}
            >
              Delete
            </button>
          </div>
        </span>
      </Modal>
    </>
  );
};

export default TodoItem;
