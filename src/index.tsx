import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import ContextlProvider from './context';

ReactDOM.render(
    <ContextlProvider>
        <Home />
    </ContextlProvider>
, document.getElementById('root'));