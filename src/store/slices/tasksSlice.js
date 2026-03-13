import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [{ id: crypto.randomUUID(), title: "Купить что-то", isDone: false }],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add(state, action) {
      state.tasks.push({
        id: crypto.randomUUID(),
        title: action.payload,
        isDone: false,
      });
    },

    deleteTask(state, action) {
      const index = state.tasks.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },

    switchIsDone(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },

    update(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.newTitle;
      }
    },
    reverse(state) {
      state.tasks.reverse();
    },

    removeFinished(state) {
      state.tasks = state.tasks.filter((task) => !task.isDone);
    },
  },
  selectors: {
    selectTasks: (state) => state.tasks,
  },
});

export const {
  add,
  deleteTask,
  switchIsDone,
  update,
  reverse,
  removeFinished,
} = tasksSlice.actions;

export const { selectTasks } = tasksSlice.selectors;

export default tasksSlice.reducer;
