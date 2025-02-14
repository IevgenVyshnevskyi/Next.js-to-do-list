import React from "react";
import TodoItem from "./TodoItem";

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
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
