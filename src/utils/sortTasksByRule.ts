import { Task } from "../types";

export const sortTasksByRule = (tasks: Task[], rule: string): Task[] => {
  switch (rule) {
    case "done":
      return tasks.filter((item) => item.done);

    case "uncompleted":
      return tasks.filter((item) => !item.done);

    case "all":
    default:
      return tasks;
  }
};
