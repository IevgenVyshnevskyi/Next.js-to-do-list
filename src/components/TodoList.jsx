import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleCompleted, deleteTodo, editTodo }) {
 
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
}
