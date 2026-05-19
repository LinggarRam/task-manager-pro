import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskCard from "../components/TaskCard";
import { describe, test, expect, vi } from "vitest";

const mockTask = {
  id: "1",
  title: "Test Task",
  description: "Test description",
  priority: "high",
  category: "learning",
  dueDate: "",
  completed: false,
  tags: ["react"],
};

describe("TaskCard", () => {
  test("renders task title", () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />,
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("calls onToggle when checkbox clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockToggle}
        onDelete={() => {}}
        onEdit={() => {}}
      />,
    );
    await user.click(screen.getByLabelText(/mark complete/i));
    expect(mockToggle).toHaveBeenCalledWith("1");
  });

  test("calls onDelete when delete button clicked", async () => {
    const user = userEvent.setup();
    const mockDelete = vi.fn();
    render(
      <TaskCard
        task={mockTask}
        onToggle={() => {}}
        onDelete={mockDelete}
        onEdit={() => {}}
      />,
    );
    await user.click(screen.getByLabelText(/delete task/i));
    expect(mockDelete).toHaveBeenCalledWith("1");
  });

  test("shows line-through when completed", () => {
    const completedTask = { ...mockTask, completed: true };
    render(
      <TaskCard
        task={completedTask}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />,
    );
    expect(screen.getByText("Test Task").closest(".task-card")).toHaveClass(
      "completed",
    );
  });
});
