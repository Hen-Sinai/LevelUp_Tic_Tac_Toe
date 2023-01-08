import React from 'react';
import { createContext, useState, useEffect } from "react";
import axios from 'axios';

// import { getResultsFromLocalStorage, saveResultToLocalStorage } from './api/storage';

const ResultsContext = createContext();

const ResultsProvider = (props) => {
  const [state, setState] = useState({results: []});
  
  const date = new Date().toISOString();
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const today = `${day}-${month}-${year}`

  const getResults = async(player = 'X & O', startDate = '01/01/2023', endDate = today) => {
    const res = await axios({
      method: 'get',
      url: 'http://localhost:8080/',
      params: {
        'winningPlayer': player,
        'startDate': startDate,
        'endDate':  endDate
      }
    })
    return res;
  }

  const getData = async (player, startDate, endDate) => {
    const {data} = await getResults(player, startDate, endDate);
    const results = data;
    if (results) {
      setState({ results });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const saveResult = (result) => {
    const postResult = async (result) => {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:8080/',
        data: {
          'winInfo': result
        }
      })
      return res;
    }
    postResult(result)
    getData();
  }

  return (
    <ResultsContext.Provider value={{ state, getData, saveResult }}>
      {props.children}
    </ResultsContext.Provider>
  );
}

export { ResultsContext, ResultsProvider };