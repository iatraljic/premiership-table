import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

interface Table {
  name: string,
  goalsScored: number,
  goalsConceded: number,
  points: number,
}

interface Props {
  weekResults?: Table[],
}


const Results: React.FC<Props> = ({ weekResults }) => {

  useEffect(() => {}, [weekResults])
  

  const showResults = () => {
    console.log(weekResults);
  }

  return (
    <>
      {weekResults && showResults()}
    </>
  );
}

export default Results;