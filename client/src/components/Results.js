import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Calendar from "react-select-date";
import './Result.css'

import { ResultsContext } from '../ResultsContext';

const Results = () => {
  const [player, setPlayer] = useState('X & O');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [chooseingDate, setChooseingDate] = useState(false);

  const { state, getData } = useContext(ResultsContext);
  const results = state.results;

  const updateDates = ({startDate, endDate}) => {
    setDate(startDate, setStartDate);
    setDate(endDate, setEndDate);
  }

  const setDate = (chosenDate, setFunc) => {
    const date = new Date(chosenDate);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${day}/${month + 1}/${year}`;
    setFunc(formattedDate);
  }
  
  useEffect(() => {
    getData(player, startDate, endDate);
  }, [player, startDate, endDate]);

  const data = results.map((result, index) => {
    return (
    <div className="row" key={index}>
        <div className="col">{result.winningPlayer}</div>
        <div className="col">{result.gameDate}</div>
    </div>
    )
  })

  return (
    <>
      <select className='winnerSelect' onChange={(e) => setPlayer(e.target.value)}>
        <option value="X & O">X & O</option>
        <option value="X">X</option>
        <option value="O">O</option>
      </select>
      <button className='dateButton' onClick={() => setChooseingDate(!chooseingDate)}> Date </button>
      {chooseingDate ? 
        <div style={{marginLeft: '60%'}}>
          <Calendar
            onSelect={(date) => updateDates(date)}
            selectDateType="range"
            templateClr="blue"
          />
        </div>
         : null
      }
      
      <section className='table'>
          <header className='headRow'>
              <div className="col">Winner</div>
              <div className="col">Date</div>
          </header>
          {data}
      </section>
    </>
  )
}

export default Results