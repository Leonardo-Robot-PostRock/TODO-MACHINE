import React from "react";
import { TodoContext } from '../TodoContext';
import './TodoForm.css'

function TodoForm() {
    const [newTodoValue, setNewTodoValue] = React.useState('');
    const {
        addTodo,
        setOpenModal,
    } = React.useContext(TodoContext);

    //event: escritura o acción que se va a recibir del usuario
    const onChange = (event) => {
        //target: elemento que se modificó, elemento donde sucede el evento
        //value: ese elemento modificado; que es textarea; se va a tomar su nuevo valor
        //con la función setNewTodoValue, se va a enviar ese nuevo valor
        setNewTodoValue(event.target.value)
    };
    const onCancel = () => {
        setOpenModal(false);
    };

    //recargar la página
    const onSubmit = (event) => {
        //cancela que la página se recarge o nos envie a otro lado
        event.preventDefault();
        addTodo(newTodoValue);
        setOpenModal(false);
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Escribe tu nuevo TODO</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="Ingrese TODO"
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    className="TodoForm-button TodoForm-button--cancel"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                >
                    Confirmar
                </button>
            </div>
        </form>
    );
}

export { TodoForm };