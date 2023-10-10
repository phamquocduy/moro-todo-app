import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../types";
import { RootState } from "../store";

const initialState: {
  arr: Task[];
} = {
  arr: [
    { id: 1, content: "Hit the gym", done: false },
    { id: 2, content: "Meet Duy", done: false },
  ],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Math.random(),
        content: action.payload,
        done: false,
      };
      state.arr.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const { arr } = state;
      state.arr = arr.filter((item) => item.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const { arr } = state;
      state.arr = arr.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    markAllAsDone: (state) => {
      const { arr } = state;
      state.arr = arr.map((item) => ({ ...item, done: true }));
    },
    deleteCompleted: (state) => {
      const { arr } = state;
      state.arr = arr.filter((item) => item.done === false);
    },
  },
});

export default taskSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.arr;
export const { addTask, deleteTask, editTask, markAllAsDone, deleteCompleted } =
  taskSlice.actions;
