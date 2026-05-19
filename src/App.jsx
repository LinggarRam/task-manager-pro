import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import useTasks from "./hooks/useTasks";
import "./styles/App.css";

function AppContent() {
  const { isLoggedIn } = useAuth();
  const {
    tasks,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
  } = useTasks();
  const pendingCount = stats.pending;

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <h1>✅ TaskManager Pro</h1>
          <p>Your personal productivity dashboard</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Login Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar taskCount={pendingCount} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} stats={stats} />} />
          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                onAdd={addTask}
                onToggle={toggleComplete}
                onDelete={deleteTask}
                onUpdate={updateTask}
                onClearCompleted={clearCompleted}
              />
            }
          />
          <Route
            path="/stats"
            element={<Stats tasks={tasks} stats={stats} />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>&copy; Mei 2026 - Mohammad Linggar Ramadhan Prasetyo</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
