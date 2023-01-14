import React, { useContext, useEffect } from 'react';
import TableContext from '../context/TableContext';

function Search() {
  const { wordSearch, setWordSearch,
    numberSearch, setNumberSearch, columnFilter,
    setColumnFilter, comparisonFilter,
    setComparisonFilter, planets, setPlanets,
    planetsBackup, optionList, setOptionsList, filter, setFilter,
    optionListBackUp } = useContext(TableContext);

  // const mySearch = planets;

  function renderOptionList() {
    return optionList.map((option, index) => (
      <option
        key={ index }
        aria-label="option"
      >
        {option}
      </option>
    ));
  }

  function removeAllFilters() {
    setFilter([]);
    setOptionsList(optionListBackUp);
    setPlanets(planetsBackup);
  }

  // function handleFilter() {
  //   if (comparisonFilter === 'menor que') {
  //     setPlanets(planets
  //       .filter(
  //         (planet) => Number(planet[columnFilter]) < Number(numberSearch),
  //       ));

  //     setOptionsList(optionList.filter((option) => option !== columnFilter));
  //   } else if (comparisonFilter === 'maior que') {
  //     setPlanets(planets
  //       .filter((planet) => Number(planet[columnFilter]) > Number(numberSearch)));

  //     setOptionsList(optionList.filter((option) => option !== columnFilter));
  //   } else {
  //     setPlanets(planets
  //       .filter((planet) => Number(planet[columnFilter]) === Number(numberSearch)));
  //     setOptionsList(optionList.filter((option) => option !== columnFilter));
  //   }
  //   // renderOptionList();
  //   setFilter([...filter, {
  //     coluna: columnFilter,
  //     tamanho: comparisonFilter,
  //     numero: numberSearch,
  //   },
  //   ]);
  //   console.log('planets handle filter', planets);
  //   console.log('filter handlefilters', filter);
  // }

  function handleClick() {
    setFilter([...filter, {
      coluna: columnFilter,
      tamanho: comparisonFilter,
      numero: numberSearch,
    },
    ]);
    setOptionsList(optionList.filter((option) => option !== columnFilter));
  }

  useEffect(() => {
    filter.forEach((filtro) => {
      if (filtro.tamanho === 'maior que') {
        const planetsBiggerThan = planets
          .filter((planet) => (Number(planet[filtro.coluna]) > Number(filtro.numero)));
        console.log(Number(filtro.numero));
        // planet.filtro.coluna === dados numerais da coluna que selecionada
        // filtro.numero = valor de comparação com o numero digitado pelo usuário
        setPlanets(planetsBiggerThan);
      } else if (filtro.tamanho === 'menor que') {
        const planetsSmallerThan = planets
          .filter((planet) => (Number(planet[filtro.coluna]) < Number(filtro.numero)));
        setPlanets(planetsSmallerThan);
      } else {
        const planetsEqualsTo = planets
          .filter((planet) => (Number(planet[filtro.coluna]) === Number(filtro.numero)));
        setPlanets(planetsEqualsTo);
      }
    });
  }, [filter]);

  function removeFilter(param) {
    const columnName = filter.filter((elemento) => elemento.coluna !== param);
    setFilter(columnName);
    optionList.push(param);
    setOptionsList(optionList);
    setPlanets(planetsBackup);
    // handleFilter();
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
        {renderOptionList()}
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
        onClick={ handleClick }
      >
        Filtrar
      </button>

      <ul>
        { filter.map((filtro, index) => (
          <li key={ index } data-testid="filter">
            {`${filtro.coluna} ${filtro.tamanho} 
            ${filtro.numero}`}
            <button
              type="button"
              onClick={ () => removeFilter(filtro.coluna) }
            >
              X
            </button>
          </li>
        )) }

        {
          filter.length > 0
            ? (
              <button
                type="button"
                onClick={ removeAllFilters }
                data-testid="button-remove-filters"
              >
                Deletar todos
              </button>
            )
            : null
        }
      </ul>
    </>

  );
}

export default Search;
