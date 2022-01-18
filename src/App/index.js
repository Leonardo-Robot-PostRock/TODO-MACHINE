import React from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: 'Estudiar', completed: true },
//   { text: 'Tomar el curso de intro de react', completed: false },
//   { text: 'Buscar herramientas para FrontEnd', completed: false },
//   { text: 'Armar portafolio', completed: false },
// ];

//Custom Hook: para localStorage
function useLocalStorage(itemName, initialValue) {
  //Estado de error, estado inicial de los errores inicializado en false.
  const [error, setError] = React.useState(false);
  //Estado de carga, cuando aún no se tiene la información 
  const [loading, setLoading] = React.useState(true);
  //Estado inicial vacio, de la información que ingresa el usuario. 
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem('itemName');
        let parsedItem;
        //si localStorage está vacío
        if (!localStorageItem) {
          localStorage.setItem('itemName', JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          //Si hay algo en algún todo o localStorage, convertir a un objeto de js
          parsedItem = JSON.parse(localStorageItem);
        }
        //Devuelve el valor verdadero que esta almacenado en localStorage
        setItem(parsedItem);
        //Termina la espera; la carga a finalizado, la información de la aplicación esta lista. De lo contrario hay un error.
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000)
  });

  //Persistencia: trae los datos de localStorage. Además va a actualizar nuestro estado
  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem('itemName', stringifiedItem);
      setItem(newItem);
    } catch {
      setError(Error);
    }
  };

  return {
    item,
    saveItem,
    loading,
    error,
  }

}

function App(itemName) {
  //Array: 1ra posición: estado y 2da posición: forma de actualizar ese estado. Nuevo; 3ra posición estado de carga. Aparte, hay cambio de nombres de 2 estados.
  const { item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);
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

  return (
    <AppUI
      error={error}
      loading={loading}
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
