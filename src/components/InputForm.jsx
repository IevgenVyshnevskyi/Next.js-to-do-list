import Button from "./Button";

export default function InputForm({ title, handleTitleChange, addTodo }) {
  return (
    <form onSubmit={addTodo} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter the task..."
        className="flex-1 p-2 border rounded-l"
      />
      <Button className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
        ADD
      </Button>
    </form>
  );
}
