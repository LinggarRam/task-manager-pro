import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/App.css";

function AppContent() {
  // taskCount={pendingCount}
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route />
          <Route />
          <Route />
          <Route />
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
      <AppContent />
    </BrowserRouter>
  );
}
