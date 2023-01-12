import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Search() {
  const { wordSearch, setWordSearch } = useContext(TableContext);

  return (
    <input
      type="text"
      name="wordSearch"
      value={ wordSearch }
      onChange={ (e) => setWordSearch(e.target.value) }
      data-testid="name-filter"
    />

  );
}

export default Search;
