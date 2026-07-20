import React, { useEffect, useState } from "react";
import Animate from "./components/Animate";
import Notification from "./components/Notification";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import ClearButton from "./components/ClearButton";
import {playSound} from "./components/PlaySound";

const App = () => {
  const STORAGE_KEY = "todos";

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  
  // Get from LocalStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if(data) {
        setTodos(JSON.parse(data))
      }
    } catch (error) {
      console.log("Load Error: ", error);
    } finally {
      setHasLoaded(true);
    }
  }, [])
  
  
  // Save to LocalStorage
  useEffect(() => {
    if(!hasLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
    } catch (error) {
      console.log("save error : ", error);
    }
  }, [todos, hasLoaded])
  

  // Show Notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Add Todo
  const handleAddTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([newTodo, ...todos]);
    setInput("");
    playSound("add");
    showNotification("✨ Task added Successfully!");
  };

  // OnToggle
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.complete } : todo,
      ),
    );
    const todo = todos.find((t) => t.id === id);

    if (!todo.completed) {
      playSound("complete");
      showNotification("🎉 Great Job! Task Completed!");
    }
  };

  // Key Press Down (add)
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleAddTodo();
    }
  };

  // Edit Key Press
  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  // Start Editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Update Todo
  const saveEdit = (id) => {
    if (!editText.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo,
      ),
    );

    setEditText("");
    setEditingId(null);
    playSound("update");
    showNotification("Task updated successfully!");
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditText("");
    setEditingId(null);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todos) => todos.id !== id));
    playSound("delete");
    showNotification("🗑 Task deleted ", "info");
  };

  // Clear All Completed Task
  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
    playSound("delete");
    showNotification("🗑 Task deleted ", "info");
  };

  const activeTodos = todos.filter((t) => !t.completed).length;
  const completeTodos = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? (completeTodos / todos.length) * 100 : 0;

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden">
        <Animate />

        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <Header
            activeTodos={activeTodos}
            progress={progress}
            totalTodos={todos.length}
          />

          <StatsGrid
            activeTodos={activeTodos}
            completedTodos={completeTodos}
            totalTodos={todos.length}
          />

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onAdd={handleAddTodo}
            onKeyPress={handleKeyPress}
          />

          <TodoList
            todos={todos}
            onDelete={deleteTodo}
            onStartEdit={startEditing}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            editingId={editingId}
            editText={editText}
            onEditTextChange={(e) => setEditText(e.target.value)}
            onEditKeyPress={handleEditKeyPress}
            onToggle={toggleTodo}
          />

          <ClearButton
            completedTodos={completeTodos}
            onClick={clearCompleted}
          />
        </div>

        <style>
          {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px);}
          50% { transform: translateY(-20px) translateX(10px); }
          }
          @keyframes shimmer {
          0% { transform: translateX(-100%);
          100% { transform: translateX(100%)}; }
          .animate-shimmer {
          animation: shimmer 2s infinite;
          }
        `}
        </style>
      </div>
    </>
  );
};

export default App;
