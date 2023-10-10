import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import {
  markAllAsDone,
  selectTasks,
  deleteCompleted,
} from "../../slices/taskSlice";
import { classNames, sortTasksByRule } from "../../utils";
import { SortingRule } from "../../types";
import { TaskListItem } from "./TaskListRow";

const sortOptions: SortingRule[] = [
  { name: "All", rule: "all" },
  { name: "Done", rule: "done" },
  { name: "Uncompleted", rule: "uncompleted" },
];

export function TaskList() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const [sorting, setSorting] = useState<SortingRule>({
    name: "All",
    rule: "all",
  });
  const filteredTasks = sortTasksByRule(tasks, sorting.rule);

  const onMarkAllClick = () => {
    dispatch(markAllAsDone());
  };

  const onDeleteCompletedClick = () => {
    dispatch(deleteCompleted());
  };

  return (
    <fieldset>
      <legend className="text-base font-semibold leading-6 text-gray-900 flex flex-row justify-between w-full items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              {sorting.name}
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm font-medium text-gray-900"
                        )}
                        onClick={() => setSorting(option)}
                      >
                        {option.name}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onMarkAllClick}
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Mark all as done
        </button>
      </legend>

      <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        {filteredTasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </div>

      <div className="flex flex-row justify-between w-full mt-3 items-center">
        <div>({tasks.filter((item) => item.done).length}) completed tasks</div>

        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={onDeleteCompletedClick}
        >
          <XMarkIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Delete completed tasks
        </button>
      </div>
    </fieldset>
  );
}
