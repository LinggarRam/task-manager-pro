import { useReducer, useEffect, useMemo, useCallback } from "react";
import taskReducer, { TASK_ACTIONS } from "../reducers/taskReducer";
import useLocalStorage from "./useLocalStorage";

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Learn React Context API",
    description: "Study useContext and createContext patterns",
    priority: "high",
    category: "learning",
    dueDate: "2026-05-20",
    completed: false,
    createdAt: new Date().toISOString(),
    tags: ["react", "study"],
  },
  {
    id: "2",
    title: "Build Shopping Cart",
    description: "Complete the Odin Project cart assignment",
    priority: "high",
    category: "project",
    dueDate: "2026-05-15",
    completed: true,
    createdAt: new Date().toISOString(),
    tags: ["react", "project"],
  },
  {
    id: "3",
    title: "Practice useReducer",
    description: "Build a todo app using useReducer instead of useState",
    priority: "medium",
    category: "learning",
    dueDate: "2026-05-25",
    completed: false,
    createdAt: new Date().toISOString(),
    tags: ["react", "hooks"],
  },
];

const useTasks = () => {
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", INITIAL_TASKS);

  const [tasks, dispatch] = useReducer(taskReducer, storedTasks);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  const addTask = useCallback((taskData) => {
    dispatch({ type: TASK_ACTIONS.ADD, payload: taskData });
  }, []);

  const updateTask = useCallback((id, updates) => {
    dispatch({ type: TASK_ACTIONS.UPDATE, payload: { id, updates } });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: TASK_ACTIONS.DELETE, payload: { id } });
  }, []);

  const toggleComplete = useCallback((id) => {
    dispatch({ type: TASK_ACTIONS.TOGGLE_COMPLETE, payload: { id } });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: TASK_ACTIONS.CLEAR_COMPLETED });
  }, []);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      highPriority: tasks.filter((t) => t.priority === "high" && !t.completed)
        .length,
      overdue: tasks.filter((t) => {
        if (!t.dueDate || t.completed) return false;
        return new Date(t.dueDate) < new Date();
      }).length,
      byCategory: tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
      }, {}),
      completionRate: tasks.length
        ? Math.round(
            (tasks.filter((t) => t.completed).length / tasks.length) * 100,
          )
        : 0,
    }),
    [tasks],
  );

  return {
    tasks,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
  };
};

export default useTasks;
