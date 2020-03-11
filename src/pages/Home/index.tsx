import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { MainContext } from '../../context';
import Menu from '../../components/Menu';
import Results from '../../components/Results';


const Home: React.FC = () => {
    const { results, matchWeek, changeMatchWeek } = useContext(MainContext);

    return (
        <Container>
            <Row lg="12" style={{height:"10vh", backgroundColor: '#37003c'}}>
            </Row>
            <Row lg="3">
                <Col></Col>
                {
                    results &&
                    <Col>
                        <Menu
                            numberOfRounds={results.length}
                            changeMatchWeek={changeMatchWeek}
                        />
                    </Col>
                }
                <Col></Col>
            </Row>
            <Row xs="8">
                <Col></Col>
                {
                    results &&
                    <Col>
                        <Results
                            weekResults={results[matchWeek? (matchWeek - 1) : 0]}
                        />
                    </Col>
                }
                <Col></Col>
            </Row>
        </Container>
    )
};

export default Home;