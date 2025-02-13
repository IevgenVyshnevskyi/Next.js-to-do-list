# Todo List Application

This is a simple to-do list application built with **Next**. It allows users to create, edit, delete, and manage tasks. The tasks are stored in the browser's **localStorage** to ensure persistence across page reloads. Below is a detailed breakdown of the components and functionality.

## Features:

- **Add a Task**: Create a new task and add it to the list.
- **Edit a Task**: Modify the title of a task.
- **Delete a Task**: Remove a task from the list.
- **Toggle Completion**: Mark tasks as completed or not completed.
- **Persistent Data**: Tasks and the current title are saved in `localStorage` to maintain data even after the page reloads.

---

## 1. **`TodoApp` Component**

This is the main component of the application that handles the state and manages the to-do list:

- **State**:
  - `todos`: Stores the list of tasks.
  - `title`: Stores the current input value for a new task.
- **`useEffect`**:
  - The first `useEffect` fetches saved tasks from `localStorage` when the component loads. If no tasks are found, it fetches tasks from an API (`jsonplaceholder`).
  - The second `useEffect` loads the saved title from `localStorage`.
- **`handleTitleChange`**: Updates the task title and saves it to `localStorage`.

- **`addTodo`**:

  - Adds a new task to the list, checks for non-empty input, and sends a POST request to save it in the API.
  - Updates the `todos` state and stores the updated list in `localStorage`.
  - Clears the input field and removes the saved title from `localStorage`.

- **`toggleCompleted`**: Toggles the completion status of a task. Updates the task list and saves the new state in `localStorage`.

- **`deleteTodo`**: Sends a DELETE request to remove a task from the API and updates the state.

- **`editTodo`**: Updates a task’s title when editing and saves the change to `localStorage`.

---

## 2. **`TodoList` Component**

This component is responsible for displaying the list of tasks using the **`TodoItem`** component for each task.

---

## 3. **`InputForm` Component**

This component contains a form for adding a new task:

- It includes a text input and a button to submit the task.
- When the form is submitted, the `addTodo` function is triggered.

---

## 4. **`TodoItem` Component**

Each task is rendered with the **`TodoItem`** component:

- Displays the task title and allows the user to edit it.
- Includes buttons to toggle the completion status, edit the task, and delete the task.

---

## Key Concepts:

- **localStorage**: Tasks and the current title are saved to `localStorage` to ensure persistence even after the page reloads.
- **fetch API**: Used to fetch tasks from an external API (JSONPlaceholder), and to send POST and DELETE requests.
- **nanoid**: A library used to generate unique IDs for each task.
- **React State**: Managed using `useState` and `useEffect` hooks for handling component state and side effects.

---

## How to Use:

1. Clone this repository or download the files.
2. Install dependencies using `npm install`.
3. Run the app with `npm run dev` and interact with the to-do list. Your tasks will persist even after page reloads!

---

This app demonstrates basic Next functionality, state management, and localStorage persistence. It's a great starting point for building more advanced task management systems!
