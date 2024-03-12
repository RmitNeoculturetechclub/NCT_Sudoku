import "./number.css"
import Table from "../Table/table";
import Button from "../Button/button";
import React, { useState, useRef } from 'react';
function Numbers(){
    const[number,setNumber] = useState();
    const [note,setNote] = useState("OFF");
    const [arrNote,setArrayNote] = useState(()=>{
      const arr = [];
      for(let i=0; i <9; i++){
        const arr1 = [];
        for (let j = 0; j < 9; j++){
          const arr2 =[];
          for (let k = 0; k < 9; k++){
            arr2.push("");
          };
          arr1.push(arr2);
        };
        arr.push(arr1);
      };
      return {arr:arr};
    });

    const actionList = useRef([]);

    function pressNoteButton() {
      setNote(state=> state==="OFF"?"ON":"OFF")
    };

    function handlePress(e) {
      const fillBox = document.querySelector(".isSelect");
      // Fill the number in the emty box
      if (fillBox && fillBox.querySelector(".number").textContent ==="") {
        if(fillBox.querySelector(".noteNumber").style.display=="block"){
          const array = fillBox.querySelectorAll(".noteNumber");
          array.forEach(param=>{param.style.display="none"});
        };
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
    
    function handleNote(e){
         const fillBox = document.querySelector(".isSelect");
      // Fill the number in the emty box
      if (fillBox && fillBox.querySelector(".number").textContent ==="") {
      // Get the position of the fill number on the table
      const numberColum = fillBox.classList[1][4];
      const numberRow = fillBox.parentNode.id[4];
      setArrayNote(prevArr => {
        // Create a copy of the previous state array to avoid mutating it directly
        const newArr = [...prevArr.arr];
    
        // Update the specific property at the given indices
        const value =  newArr[numberRow][numberColum][e.target.textContent-1];
        newArr[numberRow][numberColum][e.target.textContent-1] = e.target.textContent==value?"":e.target.textContent;
        // Return the updated array
        return {arr:newArr,
          row: numberRow,
          colum:numberColum};
      });
    }
    }
    // Template
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <button key={i} 
        onClick={e=>{
          if(note =="OFF"){
          handlePress(e);
          }
          else {
            handleNote(e);
          }
        }}
        >{i}</button>
      );
    }
  
    return (
      <>
      <Button returnButton ={handleReturn} pressNoteButton ={pressNoteButton} note ={note}></Button>
      <Table pressNumber={number} note ={note} arrNote= {arrNote}/>
      <div id="numberContainer">
        {buttons}
      </div>
      </>
    );
  }
export default Numbers;