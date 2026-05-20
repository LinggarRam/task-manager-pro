import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "../components/TaskForm";
import { describe, test, expect, vi } from "vitest";

describe("TaskForm", () => {
  test("renders form with title input", () => {
    render(<TaskForm onSubmit={() => {}} onCancel={() => {}} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  });

  test("calls onSubmit with form data", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<TaskForm onSubmit={mockSubmit} onCancel={() => {}} />);

    await user.type(screen.getByLabelText(/title/i), "New Task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(mockSubmit).toHaveBeenCalled();
  });

  test("calls onCancel when cancel button clicked", async () => {
    const user = userEvent.setup();
    const mockCancel = vi.fn();
    render(<TaskForm onSubmit={() => {}} onCancel={mockCancel} />);

    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockCancel).toHaveBeenCalled();
  });

  test("shows edit mode when editTask is provided", () => {
    const editTask = {
      id: "1",
      title: "Edit Task",
      description: "Edit description",
      priority: "high",
      category: "learning",
      dueDate: "",
      tags: ["react"],
    };

    render(
      <TaskForm
        onSubmit={() => {}}
        onCancel={() => {}}
        editTask={editTask}
      />,
    );

    expect(screen.getByDisplayValue("Edit Task")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });
});
