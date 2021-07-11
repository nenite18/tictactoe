import React,{useState} from "react";
import Board from "./components/Board";
import History from "./components/History";
import "./style/root.scss";
import { calculateWinner } from "./Helpers";
const New_Game = [{board: Array(9).fill(null),isNext: true}]

const App = () => {
  const [history,setHistory]  = useState(New_Game);
  
  const [currentMove,setCurrentMove] = useState(0);
  const current = history[currentMove];
  const {winner ,winningSquares}= calculateWinner(current.board);
  
  function getStatusMessage(board, winner) {
    if (winner) {
     return `Winner is ${winner}`;
    }
 
   if(board.every(cell => cell !== null)) {
     return 'Draw!';
   }
 
   return  `Next player is ${current.isNext ? 'X' : 'O'}`;
 }
 

 

  const handleSquareClick = (position) =>{
  
      if(current.board[position] || winner) return;
      setHistory((prev)=> {

        const last = prev[prev.length -1];
          const newBoard = last.board.map((square,pos) => {
              if(pos==position) return last.isNext?'X':'0';
              return square;
          });
          return prev.concat({board : newBoard, isNext : !last.isNext});
      });

      setCurrentMove(prev => prev +1);

     
  }
  const moveTo = (move) => {
    setCurrentMove(move);

  }
  const onNewGame = () => {
    setHistory(New_Game);
    setCurrentMove(0);

  }

  return (
   <div className = "app">
    <h1>TIC <span className ="text-green">TAC </span>TOE</h1>
    <h2> {getStatusMessage(current.board, winner)}</h2>
    <Board board ={current.board} handleSquareClick = {handleSquareClick} winningSquares ={winningSquares}/>
    <button type = "button" onClick = {onNewGame} className = {`btn-reset ${winner ?'active':''}`} >Start new Game</button>
    <h2 style ={{fontWeight:'normal'}}>Current Game History</h2>
    <History history={history} moveTo = {moveTo} currentMove = {currentMove}/>
    <div className = " bg-balls"></div>
   </div>
  );
};
export default App;
