import * as React from "react";
import * as GovUK from "govuk-react";
import ReactModal from "react-modal";
import CreateTaskForm from "./CreateTaskForm";

const modalStyle = {
  content: {
    width: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

function AddTaskButton() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <GovUK.Button onClick={openModal}>Add task</GovUK.Button>
      <ReactModal
        style={modalStyle}
        isOpen={modalIsOpen}
        contentLabel="Minimal Modal Example"
      >
        <CreateTaskForm />
        <GovUK.Button onClick={closeModal} buttonColour={"#d4351c"}>
          Cancel
        </GovUK.Button>
      </ReactModal>
    </div>
  );
}

export default AddTaskButton;
