import "./number.css"
import Table from "../Table/table";
import React, { useState, useRef } from 'react';
function Numbers(){
    const[number,setNumber] = useState();
    const actionList = useRef([]);

    function handlePress(e) {
      const fillBox = document.querySelector(".isSelect");
      // Fill the number in the emty box
      if (fillBox && fillBox.textContent ==="") {
      // Get the position of the fill number on the table
      const numberColum = fillBox.classList[1][4];
      const numberRow = fillBox.parentNode.id[4]
      const action = {
        value: e.target.textContent,
        row: numberRow,
        colum: numberColum,
      };
      actionList.current.push(action);
      setNumber(action);
      }
    }

    function handleReturn(){
      const prevAction = actionList.current.pop();
      if(prevAction && prevAction.value){
        setNumber({
          ...prevAction,
          value:"",
        })
      }
    };
    // Template
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <button key={i} onClick={e=>{handlePress(e)}}>{i}</button>
      );
    }
  
    return (
      <>
      <Table pressNumber={number} />
      <div id="numberContainer">
        {buttons}
      </div>
      <button onClick={()=>{handleReturn()}}>R</button>
      </>
    );
  }
export default Numbers;