import React from 'react';
import './index.css';


const Menu: React.FC = () => {
  return (
    <div className="menu">
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
            <div>Link 1</div>
            <div>Link 2</div>
            <div>Link 3</div>
        </div>
    </div>
  );
}

export default Menu;