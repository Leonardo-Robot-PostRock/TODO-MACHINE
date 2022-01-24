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
    const [openModal, setOpenModal] = React.useState(false);

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


    //Agregar un todo
    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    //completar todos
    const toggleCompleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        saveTodos(newTodos);
    };

    //eliminar todos
    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        saveTodos(newTodos);
    }
    //propiedades a TodoContext.Provider
    return (
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            toggleCompleteTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        }}>
            {props.children}
        </TodoContext.Provider >
    );
}

export { TodoContext, TodoProvider };