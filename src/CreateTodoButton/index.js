import React from "react";
import './CreateTodoButton.css';

// function CreateTodoButton({openModal, setOpenModal}) {
function CreateTodoButton(props) {
    const onClickButton = () => {
        // setOpenModal(!openModal)
        props.setOpenModal(prevState => !prevState);
    };
    return (
        <button
            className="CreateTodoButton"
            onClick={onClickButton}
        >
            +
        </button>
    );
}

export { CreateTodoButton };