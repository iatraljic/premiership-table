import React from 'react';
import { Input, Label } from 'reactstrap';

interface Props {
  numberOfRounds: number;
  changeMatchWeek?: (matchWeek: number) => void;
}

const Menu: React.FC<Props> = ({ numberOfRounds, changeMatchWeek }) => {
  const getRounds = () => {
    const arr = [];

    for (let i = 1; i <= numberOfRounds; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return arr;
  };

  return (
    <>
      <Label
        style={{
          color: '#963cff',
          margin: 0
        }}
      >
        Select match week:
      </Label>
      <Input
        type='select'
        name='select'
        defaultValue={numberOfRounds}
        onChange={e => changeMatchWeek?.(parseInt(e.target.value))}
      >
        {getRounds()}
      </Input>
    </>
  );
};

export default Menu;
