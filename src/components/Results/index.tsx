import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { TableI } from '../../context/index';

import './index.css';

interface Props {
  weekResults: TableI[];
}

const Results: React.FC<Props> = ({ weekResults }) => {
  useEffect(() => {
  }, [weekResults]);

  const showResults = () => {
    let results: Array<JSX.Element> = [];

    if (weekResults !== undefined)
      for (let i = 0; i < weekResults.length; i += 2) {
        const teamHome = weekResults[i];
        const teamGuest = weekResults[i + 1];
        let trendHome = 'd';
        let trendGuest = 'd';

        if (teamHome.points === 3) {
          trendHome = 'w';
        } else if (teamHome.points === 0) {
          trendHome = 'l';
        }

        if (teamGuest.points === 3) {
          trendGuest = 'w';
        } else if (teamGuest.points === 0) {
          trendGuest = 'l';
        }

        results.push(
          <Row className='result' key={i}>
            <Col xs='5' className={`team-home ${trendHome}`}>
              <strong>{teamHome.name}</strong>
            </Col>
            <Col xs='1' className='score-home'>
              <strong>{teamHome.goalsScored}</strong>
            </Col>
            <Col xs='1' className='score-guest'>
              <strong>{teamGuest.goalsScored}</strong>
            </Col>
            <Col xs='5' className={`team-guest ${trendGuest}`}>
              <strong>{teamGuest.name}</strong>
            </Col>
          </Row>
        );
      }
    return results;
  };

  return <>{showResults()}</>;
};

export default Results;
