import React, { createContext, useState } from 'react';

// TodoProvider component to manage the todo state
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now().toString(), title: todo },
    ]);
  };

  // Function to remove a todo
  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
