import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

interface Table {
  name: string,
  goalsScored: number,
  goalsConceded: number,
  points: number,
}

interface Props {
  table?: Table[],
}

const Table: React.FC<Props> = ({ table }) => {

  useEffect(() => {}, [table])
  

  const showTable = () => {
    console.log(table);
  }

  return (
    <>
      {table && showTable()}
    </>
  );
}

export default Table;