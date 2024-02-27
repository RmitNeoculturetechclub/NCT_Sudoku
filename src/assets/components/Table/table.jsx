import React, { useState, useEffect } from 'react';
import "./table.css"
function Table({pressNumber}) {

  const [data, setData] = useState(); // Initialize state for the fetched data

  useEffect(() => {
    fetch('https://sugoku.onrender.com/board?difficulty=easy')
      .then(response => response.json())
      .then(board => {setData(prev=>({...prev, value:board}));
        return board
      })
      .then(board=>(
        fetch('https://sugoku.onrender.com/solve', {
        method: 'POST',
        body: encodeParams(board),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        // .then(()=>console.log("post game data"))
        .then(response => response.json())
        .then(response => setData(prev=>({...prev,answer: response})))
        .catch(console.warn)
      ))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  function encodeParams(params) {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key])))
      .join('&');
  }
  const handleClick = (e) => {
    clearActiveAndSelectClasses();
    hightlightColumTable(e);
    hightlightRowTable(e);
    highlightSmallTable(e);
    highlightSelect(e);
  };
  
  const clearActiveAndSelectClasses = () => {
    const listActive = document.getElementsByClassName("isActive");
    [...listActive].forEach((element) => {
      element.classList.remove("isActive");
    });
    const selectClass = document.getElementsByClassName("isSelect")[0];
    selectClass && selectClass.classList.remove("isSelect"); // if selectClass not null, clear the previous one
  };
  
  const hightlightColumTable = (e) => {
    const colClass = e.target.classList;
    const colList = document.getElementsByClassName(colClass[1]);
    [...colList].forEach((element) => {
      element.classList.add("isActive");
    });
  };
  
  const hightlightRowTable = (e) => {
    const rowList = e.target.parentElement.getElementsByClassName("tile");
    [...rowList].forEach((element) => {
      element.classList.add("isActive");
    });
  };
  
  const highlightSmallTable = (e) => {
    const colNumber = parseInt(e.target.classList[1].slice(4));
    const rowNumber = parseInt(e.target.parentElement.id.slice(4));
  
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

  const highlightSelect = (e)=> {
    e.target.classList.add("isSelect")
  }

  function encodeParams(params) {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key])))
    .join('&');
}
  
  // Template 
  if (!data) {
    return <div>Loading...</div>;
  }
  // Fill the number press in the box or set emty when press return
  if(pressNumber) {
    const selectBox = document.querySelector(`#row-${pressNumber.row}`).querySelector(`.col-${pressNumber.colum}`);
    selectBox.innerHTML = pressNumber.value;
    if(!pressNumber.value){
      selectBox.classList.remove("falseAnswer")
    }
  }
  // Check if the answer is correct
  if(pressNumber && pressNumber.value){
    const rigntAnswer = data.answer.solution[pressNumber.row][pressNumber.colum]
    if(rigntAnswer == pressNumber.value){
      console.log("true");
      const selectBox = document.querySelector(`#row-${pressNumber.row}`).querySelector(`.col-${pressNumber.colum}`);
      selectBox.classList.add("trueAnswer")
    }
    else{
     console.log("false");
     const selectBox = document.querySelector(`#row-${pressNumber.row}`).querySelector(`.col-${pressNumber.colum}`);
     selectBox.classList.add("falseAnswer")
     }
  }

  const tableContent = data.value.board.map((row, rowIndex) =>
    <div key={rowIndex} className='tableRow'id={`row-${rowIndex}`}>
      {row.map((value, colIndex) =>
        <div key={colIndex} className={`tile col-${colIndex}`}  onClick={(e) => handleClick(e)}>
          {value!=0?value:""}
        </div>
      )}
    </div>
  );

  return <><div id='table'>{tableContent}</div><button onClick={()=>(console.log(data))} className='tile'></button></>;
}

export default Table;