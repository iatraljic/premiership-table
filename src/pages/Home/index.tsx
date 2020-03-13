import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { MainContext } from '../../context';
import Menu from '../../components/Menu';
import Results from '../../components/Results';
import Table from '../../components/Table';

import logo from './logos.png'


const Home: React.FC = () => {
    const { results, weekResults, table, changeMatchWeek} = useContext(MainContext);

    useEffect(() => {
    }, [table]);

    return (
        <div>
            <Row
                lg="12"
                style={{
                    height:"20vh",
                    backgroundColor: '#37063b',
                    margin: '0 0 5vh 0',
                    padding: "5vh 0 0 5vh"
                }}
            >
                <img src={logo} style={{height:"10vh"}} alt='Premier league'/>
            </Row>
            <Row style={{margin: 0}}>
            {
                results &&
                <Col lg="2" style={{height:"8vh", border: 'solid 1px #e8e8e8', margin: '1vh 0 1vh 5vh'}}>
                    <Menu
                        numberOfRounds={results.length}
                        changeMatchWeek={changeMatchWeek}
                    />
                </Col>
            }
            </Row>
            <Row lg="12" style={{margin: '0 0 0 4vh'}}>
                <Col lg="12">
                    <Results
                        weekResults={weekResults !== undefined ? weekResults : []}
                    />
                </Col>
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
        </div>
    )
};

export default Home;