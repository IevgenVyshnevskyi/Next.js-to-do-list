import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";
/* import Modal from "react-modal"; */

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: string | number;
}

interface TodoListProps {
  todos: Todo[];
  toggleCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleCompleted,
  deleteTodo,
  editTodo,
}) => {
  /* const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  let subtitle;

  useEffect(() => {
  Modal.setAppElement(document.body);
}, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  }; */

  return (
    <Droppable droppableId="todos">
      {(droppableProvider) => (
        <ul
          ref={droppableProvider.innerRef}
          {...droppableProvider.droppableProps}
          className="space-y-1 sm:space-y-3"
          /* onClick={openModal} */
        >
          {todos.map((todo, index) => (
            <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
              {(draggableProvider) => (
                <li
                  ref={draggableProvider.innerRef}
                  {...draggableProvider.draggableProps}
                  {...draggableProvider.dragHandleProps}
                >
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleCompleted={toggleCompleted}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                  {/* <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      toggleCompleted={toggleCompleted}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                    />
                  </Modal> */}
                </li>
              )}
            </Draggable>
          ))}
          {droppableProvider.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default TodoList;
