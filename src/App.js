import React from "react";
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';

// import './App.css';

const todos = [
  { text: 'Estudiar', completed: true },
  { text: 'Tomar el curso de intro de react', completed: true },
  { text: 'Buscar herramientas para FrontEnd', completed: false },
];

function App() {
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {todos.map(todo => (
          <TodoItem 
          key={todo.text} 
          text={todo.text}
          completed={todo.completed}
          />
        ))}
        </TodoList>
      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
