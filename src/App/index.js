import React from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: 'Estudiar', completed: true },
//   { text: 'Tomar el curso de intro de react', completed: false },
//   { text: 'Buscar herramientas para FrontEnd', completed: false },
//   { text: 'Armar portafolio', completed: false },
// ];

function useLocalStorage(itemName) {
  const localStorageTodos = localStorage.getItem('TODOS_V1');
  let parsedTodos;

  //si localStorage está vacío
  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify([]));
    parsedTodos = [];
  } else {
    //Si hay algo en algún todo o localStorage, convertir a un objeto de js
    parsedTodos = JSON.parse(localStorageTodos);
  }

  const [todos, setTodos] = React.useState(parsedTodos);

  //Persistencia
  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', stringifiedTodos);
    setTodos(newTodos);
  };
}

function App() {

  const [todos, saveTodos] = useLocalStorage();
  const [searchValue, setSearchValue] = React.useState('');
  //
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];
  //condición para ver si lo que escribe el usuario es un todo
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }



  //completar todos
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  //eliminar todos
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
