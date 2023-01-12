import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { myTable } = useContext(TableContext);
  return (
    <>
      <h4> Table </h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {
            myTable.map((info) => (
              <tr key={ info.url }>
                <td>{info.name}</td>
                <td>{info.rotation_period}</td>
                <td>{info.orbital_period}</td>
                <td>{info.diameter}</td>
                <td>{info.climate}</td>
                <td>{info.gravity}</td>
                <td>{info.terrain}</td>
                <td>{info.surface_water}</td>
                <td>{info.population}</td>
                <td>{info.films}</td>
                <td>{info.created}</td>
                <td>{info.edited}</td>
                <td>{info.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <button
        type="button"
        onClick={ console.log(myTable) }
      >
        console
      </button>
    </>
  );
}

export default Table;
