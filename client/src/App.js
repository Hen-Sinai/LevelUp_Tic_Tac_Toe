import React from 'react';
import './App.css';
import Game from './components/Game'
import { ResultsProvider } from './ResultsContext';

const App = () => {
  return (
    <ResultsProvider>
      <Game />
    </ResultsProvider>
  );
}

export default App;


