import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Modal from "react-modal";

import Button from "./Button";

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
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <form onSubmit={addTodo} className="flex mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onDoubleClick={openModal}
          placeholder="Enter the task..."
          className="flex-1 p-2 border rounded-l w-full"
        />
        <Button className="bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none px-2 sm:px-6 py-2">
          ADD
        </Button>
      </form>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-lg w-[96%] sm:w-[523px]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <form onSubmit={addTodo} className="my-4 flex-col">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter the task..."
              className="flex-1 p-4 border rounded-l w-full text-xl"
            />
            <Button className="bg-blue-600 text-white rounded-r-lg rounded-l-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none h-12 sm:px-6 py-2 mt-4 sm:mt-2 w-[100%]">
              ADD
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default InputForm;
