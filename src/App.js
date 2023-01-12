import React, { useState, useEffect } from 'react';
import TableContext from './context/TableContext';
import Table from './components/Table';
import './App.css';
import Search from './components/Search';

function App() {
  const [planets, setPlanets] = useState([]);
  const [wordSearch, setWordSearch] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
      });
  }, []);

  planets.map((elemento) => delete elemento.residents);

  const context = {
    planets,
    wordSearch,
    setWordSearch,
  };
  return (
    <TableContext.Provider value={ context }>
      <h1> StarWars</h1>
      <Search />
      <Table />
    </TableContext.Provider>

  );
}

export default App;
