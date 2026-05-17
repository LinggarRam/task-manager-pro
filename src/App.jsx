import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {  ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
import "./styles/App.css";

function AppContent() {

  return (
    <div className="app">
      {/* <Navbar taskCount={pendingCount}/>*/}
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
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
