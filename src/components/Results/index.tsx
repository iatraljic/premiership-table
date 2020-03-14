import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import {TableI} from '../../context/index';

import './index.css';


interface Props {
  weekResults: TableI[],
}


const Results: React.FC<Props> = ({ weekResults}) => {

  useEffect(() => { }, [weekResults])


  const showResults = () => {
    let results: Array<JSX.Element> = [];

    if (weekResults !== undefined)
      for (let i = 0; i < weekResults?.length - 1; i++) {
        results.push(
          <Row className="result" key={i}>
            <Col
              lg="5" md="5" sm="5" xs="5"
              className={"team-left " + weekResults[i]?.trend[0]}
            >
              <b>{weekResults[i]?.name}</b>
            </Col>
            <Col lg="1" md="1" sm="1" xs="1" className="score-left"><b>{weekResults[i]?.goalsScored}</b></Col>
            <Col lg="1" md="1" sm="1" xs="1" className="score-right"><b>{weekResults[++i]?.goalsScored}</b></Col>
            <Col
              lg="5" md="5" sm="5" xs="5"
              className={"team-right " + weekResults[i]?.trend[0]}
            >
              <b>{weekResults[i]?.name}</b>
            </Col>
          </Row>
        )
      }
    return results;
  }

  return (
    <>
      {showResults()}
    </>
  );
}

export default Results;