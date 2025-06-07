import { useState } from 'react';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export function useTodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (text: string) => {
    console.log('useTodoList - addTodo called with:', text);
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    console.log('useTodoList - Created new todo:', newTodo);
    setTodos(prev => {
      console.log('useTodoList - Previous todos:', prev.length);
      const newTodos = [newTodo, ...prev];
      console.log('useTodoList - New todos array:', newTodos.length);
      return newTodos;
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
} 