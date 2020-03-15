import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MainContext = createContext<Partial<ContextProps>>({});

interface Props {
  children?: JSX.Element;
}

interface Match {
  [key: string]: number;
}

interface Result {
  round: number;
  matches: Array<Match>;
}

export interface TableI {
  place: number | string;
  name: string;
  goalsScored: number;
  goalsConceded: number;
  points: number;
  gd: number;
  win: number;
  lose: number;
  draw: number;
  trend: Array<string>;
}

type ContextProps = {
  results: Result[];
  weekResults: TableI[];
  matchWeek: number;
  changeMatchWeek: (matchWeek: number) => void;
  table: TableI[];
};

const ContextlProvider: React.FC<Props> = ({ children }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [matchWeek, setMatchWeek] = useState<number>(0);
  const [weekResults, setWeekResults] = useState<TableI[]>([]);
  const [table, setTable] = useState<TableI[]>([]);

  // --------------------------------------------------------------------------
  useEffect(() => {
    axios
      .get('/js-assignment/data.json')
      .then(response => {
        setResults(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  // --------------------------------------------------------------------------
  useEffect(() => {
    if (results && results.length !== 0) {
      changeMatchWeek(results.length);
    }
  }, [results]);

  // --------------------------------------------------------------------------
  // ----- changeMatchWeek
  // --------------------------------------------------------------------------
  const changeMatchWeek = (argMatchWeek: number) => {
    setMatchWeek(argMatchWeek);
    storeWeekResults(argMatchWeek);
    storeTableResults(results.filter(el => el.round <= argMatchWeek));
  };

  // --------------------------------------------------------------------------
  // ----- storeWeekResults
  // --------------------------------------------------------------------------
  const storeWeekResults = (argMatchWeek: number) => {

    const arr: TableI[] = [];
    const matches: Match[] = results[argMatchWeek - 1].matches;

    for (let i = 0; i < matches.length; i++) {
      const team = Object.getOwnPropertyNames(matches[i]);
      const score = Object.values(matches[i]);

      arr.push(
        {
          name: team[0],
          goalsScored: score[0],
          goalsConceded: score[1],
          points: score[0] > score[1] ? 3 : score[0] < score[1] ? 0 : 1,
          place: '',
          gd: 0,
          win: 0,
          lose: 0,
          draw: 0,
          trend: []
        },
        {
          name: team[1],
          goalsScored: score[1],
          goalsConceded: score[0],
          points: score[1] > score[0] ? 3 : score[1] < score[0] ? 0 : 1,
          place: '',
          gd: 0,
          win: 0,
          lose: 0,
          draw: 0,
          trend: []
        }
      );
    }
    
    setWeekResults(arr);
  };

  // --------------------------------------------------------------------------
  // ----- storeTableResults
  // --------------------------------------------------------------------------
  const storeTableResults = (argResults: Result[]) => {
    const tempTable: TableI[] = [];

    for (let i = 0; i < argResults.length; i++) {
      for (let j = 0; j < argResults[i].matches.length; j++) {
        const team = Object.getOwnPropertyNames(argResults[i].matches[j]);
        const score = Object.values(argResults[i].matches[j]);

        for (let k = 0; k < 2; k++) {
          const name = team[k];
          const goalsScored = score[k];
          const goalsConceded = score[1 - k];
          const points =
            score[k] > score[1 - k] ? 3 : score[k] < score[1 - k] ? 0 : 1;
          const trend =
            score[k] > score[1 - k] ? 'w' : score[k] < score[1 - k] ? 'l' : 'd';
          let indexClub = -1;

          for (let l = 0; l < tempTable.length; l++) {
            if (tempTable[l].name === name) {
              indexClub = l;
              break;
            }
          }

          if (indexClub === -1) {
            const clubTable: TableI = {
              place: '',
              name,
              goalsScored,
              goalsConceded,
              points,
              gd: goalsScored - goalsConceded,
              win: points === 3 ? 1 : 0,
              lose: points === 0 ? 1 : 0,
              draw: points === 1 ? 1 : 0,
              trend: [trend]
            };

            tempTable.push(clubTable);
          } else {
            tempTable[indexClub].goalsConceded += goalsConceded;
            tempTable[indexClub].goalsScored += goalsScored;
            tempTable[indexClub].points += points;
            tempTable[indexClub].gd =
              tempTable[indexClub].goalsScored -
              tempTable[indexClub].goalsConceded;
            tempTable[indexClub].win += points === 3 ? 1 : 0;
            tempTable[indexClub].lose += points === 0 ? 1 : 0;
            tempTable[indexClub].draw += points === 1 ? 1 : 0;
            tempTable[indexClub].trend.push(trend);
          }
        }
      }
    }

    tempTable.sort((a, b) => {
      if (a.points === b.points) {
        if (a.gd === b.gd) {
          return b.goalsScored - a.goalsScored;
        }
        return b.gd - a.gd;
      }
      return b.points - a.points;
    });

    let place = 1;
    let oldPoints = -1;
    let oldGd = -1;
    let oldGoalsScored = -1;
    for (let i = 0; i < tempTable.length; i++) {
      if (tempTable[i].points !== oldPoints) {
        tempTable[i].place = place;
      } else if (tempTable[i].gd !== oldGd) {
        tempTable[i].place = place;
      } else if (tempTable[i].goalsScored !== oldGoalsScored) {
        tempTable[i].place = place;
      } else {
        tempTable[i].place = '';
      }

      if (tempTable[i].trend.length > 5) {
        tempTable[i].trend = tempTable[i].trend.slice(
          tempTable[i].trend.length - 5
        );
      }

      ++place;
      oldPoints = tempTable[i].points;
      oldGd = tempTable[i].gd;
      oldGoalsScored = tempTable[i].goalsScored;
    }

    setTable(tempTable);
  };

  // --------------------------------------------------------------------------
  return (
    <MainContext.Provider
      value={{
        results,
        weekResults,
        matchWeek,
        table,
        changeMatchWeek
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default ContextlProvider;
