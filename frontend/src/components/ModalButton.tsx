import * as React from "react";
import * as GovUK from "govuk-react";
import ReactModal from "react-modal";

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

interface Props {
  text: string;
  children: React.ReactNode;
  colour?: string;
}

ReactModal.setAppElement("#root");

function ModalButton({ text, children, colour }: Props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <GovUK.Button
        buttonColour={colour ? colour : "#00703c"}
        onClick={openModal}
      >
        {text}
      </GovUK.Button>
      <ReactModal style={modalStyle} isOpen={modalIsOpen}>
        {children}
        <GovUK.Button onClick={closeModal} buttonColour={"#1d70b8"}>
          Close
        </GovUK.Button>
      </ReactModal>
    </div>
  );
}

export default ModalButton;
