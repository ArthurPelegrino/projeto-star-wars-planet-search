import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Search() {
  const { wordSearch, setWordSearch,
    numberSearch, setNumberSearch, columnFilter,
    setColumnFilter, comparisonFilter,
    setComparisonFilter, planets, setPlanets,
    // planetsBackup, setPlanetsBackup
  } = useContext(TableContext);

  const mySearch = planets;

  function handleFilter() {
    if (comparisonFilter === 'menor que') {
      setPlanets(mySearch
        .filter((planet) => Number(planet[columnFilter]) < Number(numberSearch)));
    } else if (comparisonFilter === 'maior que') {
      setPlanets(mySearch
        .filter((planet) => Number(planet[columnFilter]) > Number(numberSearch)));
    } else {
      setPlanets(mySearch
        .filter((planet) => Number(planet[columnFilter]) === Number(numberSearch)));
    }
  }

  return (
    <>
      <input
        type="text"
        name="wordSearch"
        value={ wordSearch }
        onChange={ (e) => setWordSearch(e.target.value) }
        data-testid="name-filter"
      />

      <select
        data-testid="column-filter"
        name="columnFilter"
        value={ columnFilter }
        onChange={ (e) => setColumnFilter(e.target.value) }
      >
        <option aria-label="option">population</option>
        <option aria-label="option">orbital_period</option>
        <option aria-label="option">diameter</option>
        <option aria-label="option">rotation_period</option>
        <option aria-label="option">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparisonFilter"
        value={ comparisonFilter }
        onChange={ (e) => setComparisonFilter(e.target.value) }
      >
        <option aria-label="option">maior que</option>
        <option aria-label="option">menor que</option>
        <option aria-label="option">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        name="numberSearch"
        value={ numberSearch }
        onChange={ (e) => setNumberSearch(e.target.value) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>

    </>

  );
}

export default Search;
