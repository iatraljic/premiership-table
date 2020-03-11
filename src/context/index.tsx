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
  matchWeek: number,
  changeMatchWeek: (matchWeek: number) => void,
}

const ContextlProvider: React.FC<Props> = ({ children }) => {

  const [results, setResults] = useState<Result[]>([]);
  const [matchWeek, setMatchWeek] = useState<number>(0);
  const [table, setTable] = useState({});

  useEffect(() => {

    axios.get('/js-assignment/data.json')
      .then(response => {
        console.log(response.data);
        setResults(response.data);
        setMatchWeek(response.data.length);
      })
      .catch(err => console.log(err));

  }, []);

  const changeMatchWeek = (matchWeek: number) => {
    setMatchWeek(matchWeek);
  }


  return (
    <MainContext.Provider
      value={{
        results,
        matchWeek,
        changeMatchWeek,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default ContextlProvider;
