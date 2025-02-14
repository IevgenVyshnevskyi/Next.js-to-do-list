import React from "react";
import TodoApp from "../components/TodoApp";

const Home: React.FC = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-violet-400 py-12">
      <TodoApp />
    </main>
  );
}

export default Home;
