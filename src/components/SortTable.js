import React, { useContext, useState } from 'react';
import TableContext from '../context/TableContext';

function SortTable() {
  const {
    // sort,
    sortSetup } = useContext(TableContext);
  const [column, setColumn] = useState('population');
  const [order, setOrder] = useState('');
  return (
    <>
      <select
        data-testid="column-sort"
        value={ column }
        name="sort"
        onChange={ (e) => setColumn(e.target.value) }
      >
        <option aria-label="option">population</option>
        <option aria-label="option">orbital_period</option>
        <option aria-label="option">diameter</option>
        <option aria-label="option">rotation_period</option>
        <option aria-label="option">surface_water</option>
      </select>
      <div>
        <label htmlFor="ASC">
          <input
            type="radio"
            value="ASC"
            name="sort"
            onChange={ (e) => setOrder(e.target.value) }
            data-testid="column-sort-input-asc"
          />
          ASC
        </label>
        <label htmlFor="DSC">
          <input
            type="radio"
            value="DESC"
            name="sort"
            onChange={ (e) => setOrder(e.target.value) }
            data-testid="column-sort-input-desc"
          />
          DSC
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => sortSetup(column, order) }
      >
        ORDENAR
      </button>
    </>

  );
}

export default SortTable;
