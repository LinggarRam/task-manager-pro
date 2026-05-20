import { renderHook, act } from "@testing-library/react";
import useTasks from "../hooks/useTasks";
import { describe, test, expect, beforeEach } from "vitest";

describe("useTasks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("initializes with default tasks", () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks.length).toBeGreaterThan(0);
  });

  test("adds a new task", () => {
    const { result } = renderHook(() => useTasks());
    const initialLength = result.current.tasks.length;

    act(() => {
      result.current.addTask({
        title: "New Task",
        description: "Test description",
        priority: "high",
        category: "learning",
        dueDate: "",
        tags: [],
      });
    });

    expect(result.current.tasks.length).toBe(initialLength + 1);
    expect(result.current.tasks[0].title).toBe("New Task");
  });

  test("toggles task completion", () => {
    const { result } = renderHook(() => useTasks());
    const taskId = result.current.tasks[0].id;
    const initialCompleted = result.current.tasks[0].completed;

    act(() => {
      result.current.toggleComplete(taskId);
    });

    expect(result.current.tasks.find(t => t.id === taskId).completed).toBe(!initialCompleted);
  });

  test("deletes a task", () => {
    const { result } = renderHook(() => useTasks());
    const initialLength = result.current.tasks.length;
    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks.length).toBe(initialLength - 1);
    expect(result.current.tasks.find(t => t.id === taskId)).toBeUndefined();
  });

  test("calculates stats correctly", () => {
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.stats).toHaveProperty("total");
    expect(result.current.stats).toHaveProperty("completed");
    expect(result.current.stats).toHaveProperty("pending");
    expect(result.current.stats).toHaveProperty("completionRate");
  });

  test("clears completed tasks", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.clearCompleted();
    });

    const hasCompleted = result.current.tasks.some(t => t.completed);
    expect(hasCompleted).toBe(false);
  });
});
