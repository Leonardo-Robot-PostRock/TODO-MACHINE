import React from "react";
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';


//props
function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    toggleCompleteTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext)

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {error && <p>Hubo un error :|</p>}
        {loading && <p>Estamos cargargando, por favor espera</p>}
        {(!loading && !searchedTodos.length) && <p>¡Crea tu primer TODO!</p>}
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => toggleCompleteTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>


      {!!openModal && (
        <Modal>
          <p>
            {searchedTodos[0]?.text}
          </p>
        </Modal>
      )}

      <CreateTodoButton
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </React.Fragment>
  );
}

export { AppUI };