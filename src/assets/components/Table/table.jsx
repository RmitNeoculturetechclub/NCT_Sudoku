import React, { useState, useEffect } from 'react';
import "./table.css";
import { generateSudoku } from './sudoku/generateSudoku';
function Table({pressNumber, note, arrNote, actionList, sendBackParentdata, levelChose, triggerFetch}) {
  const [data, setData] = useState(); // Initialize state for the fetched data
  useEffect(() => {
      const value =generateSudoku(levelChose);
      setData(value)
      sendBackParentdata(value);
  }, [levelChose, triggerFetch]);
  useEffect(() => {
    // Fill the number press in the box or set emty when press return
    if (pressNumber) {
      const selectBox = document.querySelector(`#row-${pressNumber.row}`).querySelector(`.col-${pressNumber.colum}`);
      selectBox.querySelector(".number").textContent = pressNumber.value;
      // const dataFill = data.value.board[pressNumber.row][pressNumber.colum];
      // dataFill = pressNumber.value;
      // When return the current step, clear the class
      if (!pressNumber.value) {
        selectBox.classList.remove("falseAnswer");
        selectBox.classList.remove("trueAnswer");
      }
    }
    if(pressNumber && pressNumber.value){
      const rigntAnswer = data.answer.solution[pressNumber.row][pressNumber.colum]
      if(rigntAnswer == pressNumber.value){
        // console.log("true");
        const selectBox = document.querySelector(`#row-${pressNumber.row}`).querySelector(`.col-${pressNumber.colum}`);
        selectBox.classList.add("trueAnswer");
        setTimeout(()=>{selectBox.classList.remove("trueAnswer")},2000);
        blockRightAnswer(actionList);
      }
      else{
      //  console.log("false");
       const selectBox = document.querySelector(`#row-${pressNumber.row}`).querySelector(`.col-${pressNumber.colum}`);
       selectBox.classList.add("falseAnswer");
       hightlightWrongAnswer(pressNumber.value);
       }
    }
  }, [pressNumber,data]);

  useEffect(()=>{
    if(note == "ON") {
      const selectBox = document.querySelector(`#row-${arrNote.row}`).querySelector(`.col-${arrNote.colum}`);
      const noteArray = arrNote.arr[arrNote.row][arrNote.colum];
      const noteNumberClassList = selectBox.querySelectorAll(".noteNumber");
      for(let i=0; i<9;i++){
        noteNumberClassList[i].textContent = noteArray[i];
        noteNumberClassList[i].style.display = "block";
      }
    }
  },[arrNote]);
  function encodeParams(params) {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key])))
      .join('&');
  }
  const handleClick = (e) => {
    const element = e.target.classList.contains('noteNumber') ? e.target.parentElement :
    (e.target.classList.contains('number') ? e.target.parentElement : e.target);
    clearActiveAndSelectClasses();
    hightlightColumTable(element);
    hightlightRowTable(element);
    highlightSmallTable(element);
    highlightSelect(element);
  };
  const clearActiveAndSelectClasses = () => {
    const listActive = document.getElementsByClassName("isActive");
    [...listActive].forEach((element) => {
      element.classList.remove("isActive");
    });
    const selectClass = document.getElementsByClassName("isSelect")[0];
    selectClass && selectClass.classList.remove("isSelect"); // if selectClass not null, clear the previous one
  };
  
  const hightlightColumTable = (el) => {
    const colClass = el.classList;
    const colList = document.getElementsByClassName(colClass[1]);
    [...colList].forEach((element) => {
      element.classList.add("isActive");
    });
  };
  
  const hightlightRowTable = (el) => {
    const rowList = el.parentElement.getElementsByClassName("tile");
    [...rowList].forEach((element) => {
      element.classList.add("isActive");
    });
  };
  
  const highlightSmallTable = (el) => {
    const colNumber = parseInt(el.classList[1].slice(4));
    const rowNumber = parseInt(el.parentElement.id.slice(4));
  
    const startRow = Math.floor(rowNumber / 3) * 3;
    const startCol = Math.floor(colNumber / 3) * 3;
  
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        const colTable = document.getElementsByClassName(`col-${j}`);
        Array.from(colTable).slice(startRow, startRow + 3).forEach((element) => {
          element.classList.add("isActive");
        });
      }
    }
  };

  const highlightSelect = (el)=> {
    el.classList.add("isSelect")
  }

  function hightlightWrongAnswer(value) {
    const lisTtile =  document.querySelectorAll(".number");
    lisTtile.forEach(title=>{
      if(title.textContent == value){
        title.parentNode.classList.add("wrongBackground");
      }
    })
  }

  function blockRightAnswer(actionList){
    actionList.current.pop();
  };
  // Template 
  if (!data) {
    return <div>Loading...</div>;
  }
  const arrayNote = [0,1,2,3,4,5,6,7,8]
  const tableContent = data.value.board.map((row, rowIndex) =>
    <div key={rowIndex} className='tableRow'id={`row-${rowIndex}`}>
      {row.map((value, colIndex) =>
        <div key={colIndex} className={`tile col-${colIndex}`}  onClick={(e) => handleClick(e)}>
          <div className='number'>{value!="."?value:""}</div>
          {arrayNote.map((numNote,index)=>
          <div key={index} className='noteNumber' >
          </div>)}
        </div>
      )}
    </div>
  );
  
  return <><div id='table'>{tableContent}</div></>;
}

export default Table;