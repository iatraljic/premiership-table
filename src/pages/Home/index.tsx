import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { MainContext } from '../../context';
import Menu from '../../components/Menu';
import Results from '../../components/Results';
import TableC from '../../components/Table';

import logo from './logos.png'


const Home: React.FC = () => {
    const { results, weekResults, table, matchWeek, changeMatchWeek} = useContext(MainContext);

    useEffect(() => {
    }, [table]);

    return (
        <div style={{marginBottom: '10vh'}}>
            <Row
                style={{
                    height:"20vh",
                    backgroundColor: '#37063b',
                    margin: '0 0 5vh 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Col lg="4">
                    <img src={logo} style={{height:"10vh"}} alt='Premier league'/>
                </Col>
                <Col style={{fontSize: '40px', color: 'white'}}><b>Week {matchWeek}</b></Col> 
            </Row>
            <Row style={{margin: 0}}>
            {
                results &&
                <Col lg="2" style={{height:"10vh", border: 'solid 1px #e8e8e8', margin: '1vh 0 1vh 5vh'}}> 
                    <Menu
                        numberOfRounds={results.length}
                        changeMatchWeek={changeMatchWeek}
                    />
                </Col>
            }
            </Row>
            <Row style={{margin: '8vh 0 0 4vh'}}>
                <Col lg="3" style={{fontSize: '2rem'}}>Results</Col>
                <Col lg="5">
                    <Results
                        weekResults={weekResults !== undefined ? weekResults : []}
                    />
                </Col>
            </Row>
            <Row style={{margin: '8vh 0 0 4vh', fontSize: '2rem'}}>Table</Row>
            <Row style={{margin: '8vh 0 0 4vh'}}>
                <Col lg="12" md="12" sm="12">
                    <TableC
                        tableP={table !== undefined ? table : []}
                    />
                </Col>
            </Row>
        </div>
    )
};

export default Home;