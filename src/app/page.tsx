import React from "react";
import TodoApp from "../components/TodoApp";

const Home: React.FC = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-violet-400 overflow-x-hidden px-2 sm:px-8 py-1 sm:py-12">
      <TodoApp />
    </main>
  );
};

export default Home;
