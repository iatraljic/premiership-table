import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import ContextlProvider from './context';
import Home from './pages/Home';

import './index.css';


ReactDOM.render(
    <ContextlProvider>
        <Home />
    </ContextlProvider>
, document.getElementById('root'));