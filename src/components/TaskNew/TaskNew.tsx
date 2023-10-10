import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addTask } from "../../slices/taskSlice";

export function TaskNew() {
  const [newTaskContent, setNewTaskContent] = useState("");
  const dispatch = useAppDispatch();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskContent(event.currentTarget.value);
  };

  const onAddClick = () => {
    if (newTaskContent != "") {
      dispatch(addTask(newTaskContent));
      setNewTaskContent("");
    }
  };

  return (
    <div>
      <label
        htmlFor="task"
        className="text-base font-semibold leading-6 text-gray-900"
      >
        New task
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            name="task"
            id="task"
            className="block w-full rounded-none rounded-l-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="e.g. Buy clothes"
            value={newTaskContent}
            onChange={onInputChange}
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={onAddClick}
        >
          Add
        </button>
      </div>
    </div>
  );
}
