import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const responseAllTasks = await api.get("/todos");
      return responseAllTasks.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getDoneTasks = createAsyncThunk(
  "tasks/getDoneTasks",
  async (_, { rejectWithValue }) => {
    try {
      const responseAllTasks = await api.get("/todos?isCompleted=true");
      return responseAllTasks.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getActiveTasks = createAsyncThunk(
  "tasks/getActiveTasks",
  async (_, { rejectWithValue }) => {
    try {
      const responseAllTasks = await api.get("/todos?isCompleted=false");
      return responseAllTasks.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addInputTask = createAsyncThunk(
  "tasks/addInputTask",
  async (inputText, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", { title: inputText });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const switchIsDone = createAsyncThunk(
  "tasks/switchIsDone",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/todos/${id}/isCompleted`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateTaskName = createAsyncThunk(
  "tasks/updateTaskName",
  async ({ id, newTitle }, { rejectWithValue }) => {
    try {
      await api.patch(`/todos/${id}`, { title: newTitle });
      return { id, newTitle };
    } catch (error) {
      console.error("Ошибка при обновлении названия:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteCompletedTasks = createAsyncThunk(
  "tasks/deleteCompletedTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const store = getState();
      const completedTasks = store.tasks.tasks.filter(
        (item) => item.isCompleted === true,
      );
      if (completedTasks.length === 0) {
        return;
      }
      const deletePromises = completedTasks.map((task) =>
        api.delete(`/todos/${task.id}`),
      );
      await Promise.all(deletePromises);
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    errors: null,
    inputText: "test",
  },
  reducers: {
    addInputText(state, action) {
      state.inputText = action.payload;
    },
    addErrors(state, action) {
      state.errors = action.payload;
    },

    reverse(state) {
      state.tasks.reverse();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })

      .addCase(addInputTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.inputText = "";
        state.errors = "";
        state.loading = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (item) => item.id === action.payload,
        );
        if (index !== -1) {
          state.tasks.splice(index, 1);
        }
        state.loading = false;
      })
      .addCase(switchIsDone.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (item) => item.id === updatedTask.id,
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
        state.loading = false;
      })
      .addCase(updateTaskName.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (task) {
          task.title = action.payload.newTitle;
        }
        state.loading = false;
      })
      .addCase(getDoneTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getActiveTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(deleteCompletedTasks.fulfilled, (state) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => !task.isCompleted);
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.errors =
            action.payload || action.error?.message || "Произошла ошибка";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        },
      );
  },

  selectors: {
    selectTasks: (state) => state.tasks,
  },
});

export const { addInputText, reverse, addErrors } = tasksSlice.actions;

export const { selectTasks } = tasksSlice.selectors;

export default tasksSlice.reducer;
