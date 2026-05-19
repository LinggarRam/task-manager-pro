import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { describe, test, expect } from "vitest";

const renderNavbar = (taskCount = 0) =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <AuthProvider>
          <Navbar taskCount={taskCount} />
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>,
  );

describe("Navbar", () => {
  test("renders brand name", () => {
    renderNavbar();
    expect(screen.getByText(/TaskManager Pro/i)).toBeInTheDocument();
  });

  test("renders all nav links", () => {
    renderNavbar();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });

  test("shows badge when taskCount > 0", () => {
    renderNavbar(5);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("hides badge when taskCount is 0", () => {
    renderNavbar(0);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
