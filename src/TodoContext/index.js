import React from "react";
import { useLocalStorage } from "./useLocalStorage";
//Archivo para usar React Context
const TodoContext = React.createContext()

//TodoContext lleva sus dos propiedades(props): Provider(El contenedor que va a envolver a todos los componentes de la aplicación) y  Consumer; el cual cada componente va a poder consumir. Ambos son del método createContext.
function TodoProvider(props) {
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
        //propiedades a TodoContext.Provider
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}>
            {props.children}
        </TodoContext.Provider >
    );
}

export { TodoContext, TodoProvider };