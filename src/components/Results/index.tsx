import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';

interface Props {
  weekResults?: {round: number, matches?: Array<{[key: string]: number}> },
}


const Results: React.FC<Props> = ({ weekResults }) => {
  

  const showResults = () => {
    let matchNumber = weekResults?.matches?.length;
    let arr = [];

    if(matchNumber!== undefined) {
      for(let i=0; i < matchNumber; i++){
        let tempResult= "";
        for(let club in weekResults?.matches?.[i]){
          tempResult+=club + weekResults?.matches?.[i][club];
        }
          arr.push(<div>{tempResult}</div>)
      }
    }


    return arr;
  }

  return (
    <>
      {weekResults && showResults()}
    </>
  );
}

export default Results;