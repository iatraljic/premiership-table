import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Results from '../components/Results';

export const MainContext = createContext<Partial<ContextProps>>({});

interface Props {
  children?: JSX.Element,
}

interface Match {
  [key: string]: number,
}

interface Result {
  round: number,
  matches:  Array<Match>,
}

type ContextProps = {
  results: Result[],
  weekResults: Table[],
  changeMatchWeek: (matchWeek: number) => void,
  table: Table[],
}

interface Table {
  name: string,
  goalsScored: number,
  goalsConceded: number,
  points: number,
}

const ContextlProvider: React.FC<Props> = ({ children }) => {

  const [results, setResults] = useState<Result[]>([]);
  const [weekResults, setWeekResults] = useState<Table[]>([]);
  const [table, setTable] = useState<Table[]>([]);

  useEffect(() => {

    axios.get('/js-assignment/data.json')
      .then(response => {
        setResults(response.data);
        getWeekResults(response.data[response.data.length-1].matches);
        setTableResults(response.data);
      })
      .catch(err => console.log(err));

  }, []);

  const changeMatchWeek = (matchWeek: number) => {
    setTableResults(results.filter(el => el.round <= matchWeek));
  }


  const getWeekResults = (matches: Match[]): Table[] => {
    let arr: Table[] = [];

    for(let i=0; i < matches.length; i++){
      let team = Object.getOwnPropertyNames(matches[i]);
      let score = Object.values(matches[i]);

      arr.push({
        name: team[0],
        goalsScored: score[0],
        goalsConceded: score[1],
        points: score[0] > score[1] ? 3 : (score[0] < score[1] ? 0 : 1),
      },{
        name: team[1],
        goalsScored: score[1],
        goalsConceded: score[0],
        points: score[1] > score[0] ? 3 : (score[1] < score[0] ? 0 : 1),           
      });
    }

    return arr;
  }


  const setTableResults = (results: Result[]) => {
    let arr: Table[];
    let tableTemp: Table[] = [];

    setWeekResults(getWeekResults(results[results.length - 1].matches));
    
    for(let i = 0; i < results.length; i++){
      arr = getWeekResults(results[i].matches);

      if(tableTemp.length < 20){
        tableTemp = arr.map(el => el);
      } else {
        for(let j = 0; j<tableTemp.length; j++)
          for(let k = 0; k < tableTemp.length; k++){
            if(tableTemp[j].name === arr[k].name){
              tableTemp[j].goalsScored += arr[k].goalsScored;
              tableTemp[j].goalsConceded += arr[k].goalsConceded;
              tableTemp[j].points += arr[k].points;
            }
        }
      }
      
    }

    tableTemp.sort((a,b) => ( a.points > b.points ? -1 : 1));
    setTable(tableTemp);
  }


  return (
    <MainContext.Provider
      value={{
        results,
        weekResults,
        changeMatchWeek,
        table,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default ContextlProvider;
