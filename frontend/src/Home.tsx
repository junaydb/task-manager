import TaskColumn from "./components/TaskColumn";
import CreateTaskModal from "./components/CreateTaskModal";

function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Your Board</h2>
        <CreateTaskModal />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <TaskColumn status="TODO" />
        <TaskColumn status="IN_PROGRESS" />
        <TaskColumn status="DONE" />
      </div>
    </div>
  );
}

export default Home;
