import React, { useEffect } from 'react';
import { Row, Col} from 'reactstrap';

import {TableI} from '../../context/index';

import './index.css';

interface Props {
  tableP: TableI[],
}

const TableC: React.FC<Props> = ({ tableP }) => {

  useEffect(() => {}, [tableP])
  

  const showTable = () => {
    let tableTemp: Array<JSX.Element> = [];

    tableTemp = tableP?.map( (el, index) => 
      <Row className="table-row">
        <Col lg="1" md="1" sm="1" xs="1"><b>{index+1}</b></Col>
        <Col lg="3" md="3" sm="3" xs="3"><b>{el.name}</b></Col>
        <Col lg="5" md="5" sm="5" xs="5">
          <Row>
            <Col lg="1" md="1" sm="1" xs="1">{el.win + el.lose + el.draw}</Col>
            <Col lg="1" md="1" sm="1" xs="1">{el.win}</Col>
            <Col lg="1" md="1" sm="1" xs="1">{el.draw}</Col>
            <Col lg="1" md="1" sm="1" xs="1">{el.lose}</Col>
            <Col lg="1" md="1" sm="1" xs="1">{el.goalsScored}</Col>
            <Col lg="1" md="1" sm="1" xs="1">{el.goalsConceded}</Col>
            <Col lg="1" md="1" sm="1" xs="1">{el.gd}</Col>
            <Col lg="1" md="1" sm="1" xs="1"><b>{el.points}</b></Col>
          </Row>
        </Col>
        <Col lg="3" md="3" sm="3" xs="3">
          <Row>
            {
              el.trend.map(el => 
                <Col
                  lg="2" md="2" sm="2" xs="2"
                  className={el === 'w' ? "form win" : ( el === 'l' ? "form lose" : "form")}
                >
                  {el}
                </Col>)
            }
          </Row>
        </Col>
      </Row>);

  tableTemp.unshift(
    <Row className="table-row">
      <Col lg="1" md="1" sm="1" xs="1">Position</Col>
      <Col lg="3" md="3" sm="3" xs="3">Club</Col>
      <Col lg="5" md="5" sm="5" xs="5">
        <Row>
          <Col lg="1" md="1" sm="1" xs="1">Pl</Col >
          <Col lg="1" md="1" sm="1" xs="1">W</Col >
          <Col lg="1" md="1" sm="1" xs="1">D</Col >
          <Col lg="1" md="1" sm="1" xs="1">L</Col >
          <Col lg="1" md="1" sm="1" xs="1">GF</Col >
          <Col lg="1" md="1" sm="1" xs="1">GA</Col >
          <Col lg="1" md="1" sm="1" xs="1">GD</Col >
          <Col lg="1" md="1" sm="1" xs="1">Points</Col >
        </Row>
      </Col>
      <Col lg="3" md="3" sm="3" xs="3">Form</Col>
  </Row>);

    return tableTemp;
  };

  return (
    <>
      {tableP && showTable()}
    </>
  );
}

export default TableC;