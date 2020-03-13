import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import './index.css';

interface Table {
  name: string,
  goalsScored: number,
  goalsConceded: number,
  points: number,
}

interface Props {
  weekResults: Table[],
}


const Results: React.FC<Props> = ({ weekResults }) => {

  useEffect(() => { }, [weekResults])


  const showResults = () => {
    let results: Array<JSX.Element> = [];

    if (weekResults !== undefined)
      for (let i = 0; i < weekResults?.length - 1; i++) {
        results.push(
          <Row className="result" key={i}>
            <Col lg="3" className="team-left"><b>{weekResults[i]?.name}</b></Col>
            <Col lg="1" className="score-left"><b>{weekResults[i]?.goalsScored}</b></Col>
            <Col lg="1" className="score-right"><b>{weekResults[++i]?.goalsScored}</b></Col>
            <Col lg="3" className="team-right"><b>{weekResults[i]?.name}</b></Col>
          </Row>
        )
      }
    return results;
  }

  return (
    <>
      <h1>Results</h1>
      {showResults()}
    </>
  );
}

export default Results;