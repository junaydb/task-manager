import ModalButton from "./components/ModalButton";
import TaskSection from "./components/TaskSection";
import CreateTaskForm from "./components/CreateTaskForm";

function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Task manager</h2>
        <ModalButton text="Create task">
          <CreateTaskForm />
        </ModalButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskSection status="TODO" />
        <TaskSection status="IN_PROGRESS" />
        <TaskSection status="DONE" />
      </div>
    </div>
  );
}

export default Home;
