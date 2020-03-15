import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { MainContext } from '../../context';
import Menu from '../../components/Menu';
import Results from '../../components/Results';
import TableC from '../../components/Table';

import logo from './logos.png';
import './index.css';

const Home: React.FC = () => {
  const {
    results,
    weekResults,
    table,
    matchWeek,
    changeMatchWeek
  } = useContext(MainContext);


  return (
    <Container fluid>
      <Row className='home-header'>
        <Col xs='12'>
          <img src={logo} className='home-header-logo' alt='Premier league' />
        </Col>
      </Row>

      {results && results.length !== 0 && (
        <Row>
          <Col lg='6'>
            <h3>
              <strong>Results Week {matchWeek}</strong>
            </h3>
            <Menu
              numberOfRounds={results.length}
              changeMatchWeek={changeMatchWeek}
            />
            <Results
              weekResults={weekResults !== undefined ? weekResults : []}
            />
          </Col>
          <Col lg='6'></Col>
        </Row>
      )}

      <Row>
        <Col xs='12'>
          <h3>
            <strong>Table Week {matchWeek}</strong>
          </h3>
        </Col>
      </Row>
      <Row>
        <Col xs='12'>
          <TableC tableP={table !== undefined ? table : []} />
        </Col>
      </Row>
    </Container>
  );
};

/*
 */
export default Home;
