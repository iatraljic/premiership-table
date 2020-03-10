import React, { createContext, useState, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';

export const MainContext = createContext({});

interface Props {
  children?: JSX.Element,
}

const ContextlProvider: React.FC<Props> = ({children}) => {
    const [data, setData] = useState<AxiosResponse | null>(null)

    useEffect(() => {
        axios.get('/js-assignment/data.json')
        .then(response => {
          console.log(response.data);
          setData(response.data);
        })
        .catch(err => console.log(err));
      }, []);
    

    return (
        <MainContext.Provider
          value={{
              data,
          }}
        >
          {children}
        </MainContext.Provider>
      );
}

export default ContextlProvider;
