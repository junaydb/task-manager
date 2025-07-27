import * as GovUK from "govuk-react";
import ModalButton from "./components/ModalButton";
import TaskSection from "./components/TaskSection";
import CreateTaskForm from "./components/CreateTaskForm";
import "./style/globals.css";

function Home() {
  return (
    <>
      <div className="header">
        <GovUK.H2>Task manager</GovUK.H2>
        <ModalButton text="Create task">
          <CreateTaskForm />
        </ModalButton>
      </div>
      <TaskSection status="TODO" />
      <GovUK.SectionBreak level="LARGE" visible />{" "}
      <TaskSection status="IN_PROGRESS" />
      <GovUK.SectionBreak level="LARGE" visible /> <TaskSection status="DONE" />
    </>
  );
}

export default Home;
