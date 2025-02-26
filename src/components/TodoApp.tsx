"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { nanoid } from "nanoid";
import { DragDropContext } from "@hello-pangea/dnd";
import InputForm from "./InputForm";
import TodoList from "./TodoList";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: string | number;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    localStorage.setItem("title", e.target.value);
  };

  const addTodo = async (e: FormEvent) => {
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

  const toggleCompleted = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const deleteTodo = (id: number) => {
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

  const editTodo = (id: number, newTitle: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyTodos = [...todos];
    const [reorderTodo] = copyTodos.splice(startIndex, 1);
    copyTodos.splice(endIndex, 0, reorderTodo);
    setTodos(copyTodos);
  };

  return (
    <div className="p-1 py-2 max-w-lg mx-auto bg-sky-200 shadow-lg rounded-lg container mx-auto sm:p-6">
      <DragDropContext
        //onBeforeCapture={onBeforeCapture}
        //onBeforeDragStart={onBeforeDragStart}
        //onDragStart={onDragStart}
        //onDragUpdate={onDragUpdate}
        //onDragEnd={onDragEnd}
        onDragEnd={handleDragEnd}
      >
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-700 sm:mb-5">
          To-Do List
        </h1>
        <InputForm
          title={title}
          handleTitleChange={handleTitleChange}
          addTodo={addTodo}
        />
        <TodoList
          todos={todos}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </DragDropContext>
    </div>
  );
}
