import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { MainContext } from '../../context';
import Menu from '../../components/Menu';
import Results from '../../components/Results';
import Table from '../../components/Table';


const Home: React.FC = () => {
    const { results, weekResults, table, changeMatchWeek} = useContext(MainContext);

    useEffect(() => {
    }, [table]);

    return (
        <Container>
            <Row lg="12" style={{height:"10vh", backgroundColor: '#37003c'}}>
            </Row>
            <Row lg="12">
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
            <Row lg="12">
                <Col lg="3"></Col>
                <Col lg="6">
                    <Results
                        weekResults={weekResults}
                    />
                </Col>
                <Col lg="3"></Col>
            </Row>
            <Row lg="12">
                <Col lg="3"></Col>
                <Col lg="6">
                    <Table
                        table={table}
                    />
                </Col>
                <Col lg="3"></Col>
            </Row>
        </Container>
    )
};

export default Home;