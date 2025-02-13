"use client";

import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import InputForm from "./InputForm";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then((res) => res.json())
        .then((data) => {
          setTodos(data);
          localStorage.setItem("todos", JSON.stringify(data));
        })
        .catch((error) => console.error("Download error: ", error));
    }
  }, []);

  useEffect(() => {
    const savedTitle = localStorage.getItem("title");
    if (savedTitle) {
      setTitle(savedTitle);
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    localStorage.setItem("title", e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: nanoid(),
      title,
      completed: false,
      userId: 1,
    };

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();

    setTodos((prevTodos) => {
      const updatedTodos = [{ ...data, id: nanoid() }, ...prevTodos];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setTitle("");
    localStorage.removeItem("title");
  };

  const toggleCompleted = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const deleteTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTodos((prevTodos) => {
            const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
          });
        } else {
          throw new Error("Failed to delete task");
        }
      })
      .catch((error) => console.error("Error deleting:", error));
  };

  const editTodo = (id, newTitle) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-sky-200 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-5 text-gray-700">
        To-Do List
      </h1>
      <InputForm title={title} handleTitleChange={handleTitleChange} addTodo={addTodo} />
      <TodoList todos={todos} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} editTodo={editTodo}/>
    </div>
  );
}
