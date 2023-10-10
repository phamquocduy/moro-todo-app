import { TaskList, TaskNew } from "./components";

function App() {
  return (
    <div className="mx-auto max-w-xl p-10 flex flex-col gap-20">
      <TaskNew />
      <TaskList />
    </div>
  );
}

export default App;
