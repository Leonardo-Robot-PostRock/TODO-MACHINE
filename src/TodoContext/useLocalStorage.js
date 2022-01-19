import React from "react";

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

export { useLocalStorage };