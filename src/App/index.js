import React from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: 'Estudiar', completed: true },
//   { text: 'Tomar el curso de intro de react', completed: false },
//   { text: 'Buscar herramientas para FrontEnd', completed: false },
//   { text: 'Armar portafolio', completed: false },
// ];

//Custom Hook
function useLocalStorage(itemName, initialValue) {
  React.useEffect(()=>{setTimeout(()=>{

  }, 10000)
});
  const localStorageItem = localStorage.getItem('itemName');
  let pasedItem;

  //si localStorage está vacío
  if (!localStorageItem) {
    localStorage.setItem('itemName', JSON.stringify(initialValue));
    pasedItem = initialValue;
  } else {
    //Si hay algo en algún todo o localStorage, convertir a un objeto de js
    pasedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(pasedItem);

  //Persistencia
  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem('itemName', stringifiedItem);
    setItem(newItem);
  };

  return [
    item,
    saveItem,
  ]
}

function App(itemName) {
  //Array: 1ra posición: estado y 2da posición: forma de actualizar ese estado
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  //Filtrar todos que tengan el atributo completed como true
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  //cantidad de todos
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
  // console.log('Render (antes del use effect)');
  // //Se renderiza cada vez que cambia la cantidad de todos
  // React.useEffect(() => {
  //   console.log('use effect')
  // }, [totalTodos]);
  // console.log('Render (luego del use effect)');

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
