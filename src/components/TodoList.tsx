import React from "react";
import TodoItem from "./TodoItem";
import { Draggable, Droppable } from '@hello-pangea/dnd';

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

  return (
      <Droppable droppableId="todos">
          {(droppableProvider) => (
            <ul
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
              className="space-y-3"
            >
              {todos.map((todo, index) => (
                <Draggable
                  index={index}
                  key={todo.id}
                  draggableId={`${todo.id}`}
                >
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
