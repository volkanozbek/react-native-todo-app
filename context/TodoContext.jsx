import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';

// TodoProvider component to manage the todo state
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  // AsyncStorage
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('TODOS');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load todos');
      }
    };
    loadTodos();
  }, []);

  // Save todos to AsyncStorage
  const saveTodos = async (newTodos) => {
    try {
      await AsyncStorage.setItem('TODOS', JSON.stringify(newTodos));
    } catch (error) {
      Alert.alert('Error', 'Failed to save todos');
    }
  };

  // Function to add a new todo
  const addTodo = (todo) => {
    const newItem = { id: uuid.v4(), text: todo };
    const updatedTodos = [newItem, ...todos];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Function to remove a todo
  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, removeTodo, toggleComplete }}
    >
      {children}
    </TodoContext.Provider>
  );
};
