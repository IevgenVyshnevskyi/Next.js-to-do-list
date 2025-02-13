import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleCompleted, deleteTodo, editTodo }) {

    const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const reorderedTodos = Array.from(todos);
        const [movedItem] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, movedItem);
    
        setTodos(reorderedTodos);
        localStorage.setItem("todos", JSON.stringify(reorderedTodos));
      };
    
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
