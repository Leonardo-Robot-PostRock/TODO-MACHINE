import React from "react";
import { TodoIcon } from "./TodoIcon";

function DeleteIcon({ onDelete }) {
    return (
        <TodoIcon className="delete"
            type="delete"
            onClick={onDelete}
        />
    );
}

export { DeleteIcon };