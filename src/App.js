import React, { useState, useEffect } from 'react';
import TableContext from './context/TableContext';
import Table from './components/Table';
import './App.css';

function App() {
  const [myTable, setMyTable] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        setMyTable(data.results);
      });
  }, []);

  myTable.map((elemento) => delete elemento.residents);

  const context = {
    myTable,
  };
  return (
    <TableContext.Provider value={ context }>
      <h1> StarWars</h1>
      <Table />
    </TableContext.Provider>

  );
}

export default App;
