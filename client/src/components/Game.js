import React from 'react';
import { useEffect, useState, useContext, useCallback } from 'react';
import '../App.css';
import Board from './Board'
import Results from './Results'

import { ResultsContext } from '../ResultsContext';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [isPlaying, setIsPlaying] = useState(false);
  const [winner, setWinner] = useState(null);
  const [header, setHeader] = useState(`Turn: ${turn}`);
  const [isStartGame, setIsStartGame] = useState(false);
  
  const { saveResult } = useContext(ResultsContext);

  const getWinner = useCallback(() => {
    if (turn === 'X')
      return 'O'
    else
      return 'X'
  },[turn])

  const handleSave = useCallback(() => {
    const date = new Date().toISOString();
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    saveResult({
      winningPlayer: getWinner(),
      gameDate: `${day}-${month}-${year}`,
    });
  }, [saveResult, getWinner]);
  
  const checkWin = useCallback(() => {
    if (!isPlaying) return;
    const possibleWins = [    
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < possibleWins.length; i += 1) {
      const [first, second, third] = possibleWins[i];
      if (
        (board[first] === 'X' || board[first] === 'O') &&
        board[first] === board[second] &&
        board[second] === board[third]
      ) {
        setWinner(getWinner());
        setIsPlaying(false);
        handleSave();
      }
    }
  }, [board, getWinner, handleSave, isPlaying]);

  const checkTie = useCallback(() => {
    for (let cell of board) {
        if (cell === '')
            return;
    }
    setIsPlaying(false)
  }, [board])

  const handleClick = useCallback((i) => {
    if (!isPlaying || board[i] !== '') return;
    const boardCopy = [...board];
    boardCopy[i] = turn;
    setBoard(boardCopy);
    if (turn === 'X') 
      setTurn('O');
    else 
      setTurn('X');
  }, [board, isPlaying, turn]);

  const reset = useCallback(() => {
    setBoard(Array(9).fill(''))
    setTurn('X')
    setIsPlaying(true) 
    setWinner(null)
    setHeader(`Turn: ${turn}`)
  }, [turn])

  const updateHeader = useCallback(() => {
    if (isPlaying)
      setHeader(`Turn: ${turn}`)
    else if (winner)
      setHeader(`The winner is: ${winner}`)
    else 
      setHeader(`It's a Tie!`)
  }, [isPlaying, winner, turn])

  useEffect(() => {
    checkWin()
  }, [board, isPlaying, checkWin]);

  useEffect(() => {
    checkTie()
  }, [board, isPlaying, checkTie]);

  useEffect(() => {
    updateHeader()
  }, [isPlaying, winner, updateHeader]);

  let data = isStartGame ?
    <div className='app'>
      <h1 className='header'> {header} </h1>
      <Board cells={board} onClick={handleClick} />
      <div className="btnWrap">
        <button className="button" onClick={() => reset()}>Restart</button>
        <button className="button" onClick={() => setIsStartGame(false)}>Results</button>
      </div>
    </div> 
    :
    <div>
      <Results />
      <div id="startBtn" className="btnWrap">
        <button className="button" onClick={() => { setIsPlaying(true); setIsStartGame(true); } }>{isPlaying === true ? "Resume" : "Start"}</button>
      </div>
    </div>
  

  return (
    <>
      { data }
    </>
  );
}

export default Game;


