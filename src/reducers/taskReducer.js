export const TASK_ACTIONS = {
  ADD: "ADD_TASK",
  UPDATE: "UPDATE_TASK",
  DELETE: "DELETE_TASK",
  TOGGLE_COMPLETE: "TOGGLE_COMPLETE",
  SET_PRIORITY: "SET_PRIORITY",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.ADD:
      return [
        {
          id: crypto.randomUUID(),
          title: action.payload.title,
          description: action.payload.description || "",
          priority: action.payload.priority || "medium",
          category: action.payload.category || "general",
          dueDate: action.payload.dueDate || "",
          completed: false,
          createdAt: new Date().toISOString(),
          tags: action.payload.tags || [],
        },
        ...state,
      ];

    case TASK_ACTIONS.UPDATE:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.update }
          : task,
      );

    case TASK_ACTIONS.DELETE:
      return state.filter((task) => task.id !== action.payload.id);

    case TASK_ACTIONS.TOGGLE_COMPLETE:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task,
      );

    case TASK_ACTIONS.SET_PRIORITY:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, priority: action.payload.priority }
          : task,
      );

    case TASK_ACTIONS.CLEAR_COMPLETED:
      return state.filter((task) => !task.completed);

    default:
      return state;
  }
};

export default taskReducer;
