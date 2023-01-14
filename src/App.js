import React, { useState, useEffect } from 'react';
import TableContext from './context/TableContext';
import Table from './components/Table';
// import OrderTable from './components/SortTable';
import './App.css';
import Search from './components/Search';

function App() {
  const [planets, setPlanets] = useState([]);
  const [planetsBackup, setPlanetsBackup] = useState([]);
  const [wordSearch, setWordSearch] = useState('');
  const [numberSearch, setNumberSearch] = useState(0);
  const [optionList, setOptionsList] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [optionListBackUp, setOptionListBackup] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [columnFilter, setColumnFilter] = useState(optionList[0]);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [filter, setFilter] = useState([
  ]);
  const [sort, setSort] = useState({
    order: {
      column: 'population',
      sortOrder: 'ASC',
    },
  });

  function sortSetup(coluna, ordem) {
    setSort({ order: {
      column: coluna,
      sort: ordem,
    } });
  }

  useEffect(() => {
    setColumnFilter(optionList[0]);
  }, [optionList]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
        setPlanetsBackup(data.results);
      });
  }, []);

  planets.map((elemento) => delete elemento.residents);

  const context = {
    planets,
    setPlanets,
    planetsBackup,
    setPlanetsBackup,
    wordSearch,
    setWordSearch,
    numberSearch,
    setNumberSearch,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    filter,
    setFilter,
    optionList,
    setOptionsList,
    sort,
    setSort,
    sortSetup,
    optionListBackUp,
    setOptionListBackup,
  };

  return (
    <TableContext.Provider value={ context }>
      <h1> StarWars</h1>
      <Search />
      {/* <OrderTable /> */}
      <Table />
    </TableContext.Provider>

  );
}

export default App;
