import React from 'react';
import { Input, Label } from 'reactstrap';
import './index.css';

interface Props {
  numberOfRounds: number,
  changeMatchWeek?: (matchWeek: number) => void,
}


const Menu: React.FC<Props> = ({ numberOfRounds, changeMatchWeek}) => {

  const getRounds = () => {
    const arr = [];
    for (let i= 1; i <= numberOfRounds; i++) {
      arr.push(<option
                  key={i}
                  selected= {i === numberOfRounds ? true : false}
                >{i}</option>)
    }
    return arr;
  }

  return (
    <>
      <Label style={{color: '#963cff',fontSize: '12px', fontWeight: 'bold', margin: 0}}>Select match week:</Label>
      <Input
        style={{border: 'none', fontSize: '18px', fontWeight: 'bold', padding: 0}}
        type='select'
        name='select'
        onChange={(e) =>
          changeMatchWeek?.(parseInt(e.target.value))
        }
      >
        {
          getRounds()
        }
      </Input>
    </>
  );
}

export default Menu;