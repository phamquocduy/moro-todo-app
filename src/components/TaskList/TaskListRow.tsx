import { ChangeEvent, useState } from "react";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

import { Task } from "../../types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { deleteTask, editTask } from "../../slices/taskSlice";
import { classNames } from "../../utils";

interface TaskListItemProps {
  task: Task;
}

export function TaskListItem({ task }: TaskListItemProps) {
  const [taskContent, setTaskContent] = useState(task.content);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  const onStateChange = () => {
    dispatch(editTask({ ...task, done: !task.done }));
  };

  const onContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskContent(event.currentTarget.value);
  };

  const onEditConfirm = () => {
    setEditMode(false);
    dispatch(editTask({ ...task, content: taskContent }));
  };

  const onDeleteClick = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className="relative flex items-start py-4">
      <div className="mr-3 flex h-6 items-center">
        <input
          id={`task-${task.id}`}
          name={`task-${task.id}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-0 focus:ring-offset-0"
          checked={task.done}
          onChange={onStateChange}
        />
      </div>

      <div className="min-w-0 mr-3 flex-1 text-sm leading-6">
        {editMode ? (
          <input
            name={`task-${task.id}`}
            id={`task-${task.id}`}
            className="block w-full rounded-none rounded-l-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="e.g. Buy clothes"
            value={taskContent}
            onChange={onContentChange}
          />
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={classNames(
              "select-none font-medium text-gray-900",
              task.done && "line-through"
            )}
          >
            {task.content}
          </label>
        )}
      </div>

      {editMode ? (
        <button
          type="button"
          className="rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mr-3"
          onClick={onEditConfirm}
        >
          <CheckIcon className="h-3 w-3" aria-hidden="true" />
        </button>
      ) : (
        <>
          <button
            type="button"
            className="rounded-full bg-cyan-600 p-2 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 mr-3"
            onClick={() => setEditMode(true)}
          >
            <PencilSquareIcon className="h-3 w-3" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={onDeleteClick}
          >
            <XMarkIcon className="h-3 w-3" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
