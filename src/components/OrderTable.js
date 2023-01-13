import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function OrderTable() {
  const { optionList } = useContext(TableContext);
  return (
    <>
      <select>
        {optionList.map((option, index) => (
          <option
            key={ index }
            aria-label="option"
          >
            {option}
          </option>
        ))}
      </select>
      <div>
        <input type="radio" value="ASC" />
        <input type="radio" value="DESC" />
      </div>
      <button
        type="button"
      >
        ORDENAR
      </button>
    </>

  );
}

export default OrderTable;
