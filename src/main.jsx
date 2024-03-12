import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './assets/components/Header/header';
import Button from './assets/components/Button/button';
import Table from './assets/components/Table/table';
import Numbers from './assets/components/Numbers/number';
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <Button />
    <Table />
    <Numbers />
  </>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './assets/components/Header/header'
import Button from './assets/components/Button/button'
import Numbers from './assets/components/Numbers/number'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Header></Header>
    <Numbers></Numbers>
  </>,
)
