import Button from "./Button";
import { ChangeEvent, FormEvent } from "react";

interface InputFormProps {
  title: string;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addTodo: (e: FormEvent) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  title,
  handleTitleChange,
  addTodo,
}) => {
  return (
    <form onSubmit={addTodo} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter the task..."
        className="flex-1 p-2 border rounded-l w-full"
      />
      <Button className="bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none px-2 sm:px-6 py-2">
        ADD
      </Button>
    </form>
  );
};

export default InputForm;
