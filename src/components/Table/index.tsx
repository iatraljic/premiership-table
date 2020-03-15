import React from 'react';
import { Table } from 'reactstrap';

import { TableI } from '../../context/index';

import './index.css';

interface Props {
  tableP: TableI[];
}

const TableC: React.FC<Props> = ({ tableP }) => {

  const showTable = () => {
    let tableTemp: Array<JSX.Element> = [];

    tableTemp = tableP.map((el, index) => (
          <tr>
            <td><b>{el.place}</b></td>
            <td><b>{el.name}</b></td>
            <td>{el.win + el.lose + el.draw}</td>
            <td>{el.win}</td>
            <td>{el.draw}</td>
            <td>{el.lose}</td>
            <td>{el.goalsScored}</td>
            <td>{el.goalsConceded}</td>
            <td>{el.gd}</td>
            <td><b>{el.points}</b></td>
            <td className="form-container">
              {el.trend.map(el => (
              <span
                  className={
                  el === 'w' ? 'form win' : el === 'l' ? 'form lose' : 'form'
                  }
              >
                  {el}
              </span>
              ))}
            </td>
        </tr>  
      ));

    tableTemp.unshift(
      <tr>
          <th>Position</th>
          <th>Club</th>
          <th>Pl</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>Points</th>
          <th>Form</th>            
      </tr>
    );

    return tableTemp;
  };

  return <Table responsive>{tableP && showTable()}</Table>;
};

export default TableC;
