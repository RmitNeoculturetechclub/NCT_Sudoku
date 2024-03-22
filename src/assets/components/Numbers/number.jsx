import "./number.css"
import Table from "../Table/table";
import Button from "../Button/button";
import React, { useState, useRef, useEffect } from 'react';
function Numbers(){
    const[number,setNumber] = useState();
    const [note,setNote] = useState("OFF");
    const [data, setData] = useState();
    const [hint, setHint] = useState(5);
    const [returnBack, setReturnBack] = useState(5);
    const[level,setLevel] = useState('easy');
    const [triggerFetch, setTriggerFetch] = useState(true);
    const [arrNote, setArrayNote] = useState(() => {
      return { arr: generateInitialArray() };
    });
    useEffect(() => {
      const handleKeyDown = (event) => {
          const keyCode = event.keyCode;
          if (keyCode >= 49 && keyCode <= 57) {
              const number = keyCode - 48; // Convert keyCode to actual number
              if(note =="OFF"){
                handlePress(number);
                }
                else {
                  handleNote(number);
                }
          }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, [note]);
    const actionList = useRef([]);
    function generateInitialArray() {
      const arr = [];
      for (let i = 0; i < 9; i++) {
        const arr1 = [];
        for (let j = 0; j < 9; j++) {
          const arr2 = [];
          for (let k = 0; k < 9; k++) {
            arr2.push("");
          }
          arr1.push(arr2);
        }
        arr.push(arr1);
      }
      return arr;
    }
    function pressNoteButton() {
      setNote(state=> state==="OFF"?"ON":"OFF")
    };
    
    function handlePress(numberChoose) {
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
        value: numberChoose,
        row: numberRow,
        colum: numberColum,
      };
      actionList.current.push(action);
      setNumber(action);
      }
    }

    function handleReturn(){
      if(returnBack>0 && actionList.current!="") {
      const prevAction = actionList.current.pop();
      
      if(prevAction && prevAction.value){
        removeHightlightWrongAnswer(prevAction.value);
        setNumber({
          ...prevAction,
          value:"",
        })
      }
      setReturnBack(prev=>prev-1);
      }
    };
    
    function handleNote(numberChoose){
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
        const value =  newArr[numberRow][numberColum][numberChoose-1];
        newArr[numberRow][numberColum][numberChoose-1] = numberChoose==value?"":numberChoose;
        // Return the updated array
        return {arr:newArr,
          row: numberRow,
          colum:numberColum};
      });
    }
    }
    function blockRightAnswer(){
      actionList.current.pop();
    };
    function removeHightlightWrongAnswer(action) {
      const lisTtile =  document.querySelectorAll(".number");
      lisTtile.forEach(title=>{
        if(title.textContent == action){
          title.parentNode.classList.remove("wrongBackground");
        }
      })
    }
    const handleReceivedData = (data) => {
      setData(data);
    };
    function handleHint(){
      const classIsSelect = document.querySelector(".isSelect") || "";
      if (classIsSelect){
             if(!classIsSelect.querySelector(".number").textContent && hint>0){
        const numberColum = classIsSelect.classList[1][4];
        const numberRow = classIsSelect.parentNode.id[4];
        const answer = data.solution[numberRow][numberColum];
        classIsSelect.querySelector(".number").textContent = answer;
        if(classIsSelect.querySelector(".noteNumber").style.display=="block"){
          const array = classIsSelect.querySelectorAll(".noteNumber");
          array.forEach(param=>{param.style.display="none"});
        };
        setHint(prev=>prev-1);
      }
      }
    };

    function newGame(level) {
      actionList.current = [];
      setNumber(() => {
      const listWrongClass = document.querySelectorAll(".wrongBackground")
      if (listWrongClass) {
      listWrongClass.forEach(
      element => {
      element.classList.remove('wrongBackground')
      }
      );
      };
      const listWrongAnser = document.querySelectorAll(".falseAnswer");
      if (listWrongAnser) {
      listWrongAnser.forEach(
      element => {
      element.classList.remove('falseAnswer')
      }
      );
      };
      const listNumber = document.querySelectorAll(".number");
      listNumber.forEach(
      element => {
      element.textContent = "";
      }
      );
      return "";
      });
      setLevel(level);
      setTriggerFetch(prev => !prev);
      setNote("OFF");
      switch (level) {
      case "easy":
      setHint(5);
      setReturnBack(5);
      break;
      case "medium":
      setHint(5);
      setReturnBack(3);
      break;
      case "hard":
      setHint(3);
      setReturnBack(3);
      break;
      default:
      console.log("error");
      }
      setArrayNote(() => {
      const listNote = document.querySelectorAll(".noteNumber");
      listNote.forEach(element => {
      if (element.style.display == "block") {
      element.style.display = "none";
      }
      })
      return { arr: generateInitialArray() };
      });
      }
      
    // Template
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <button key={i} 
        onClick={e=>{
          if(note =="OFF"){
          handlePress(e.target.textContent);
          }
          else {
            handleNote(e.target.textContent);
          }
        }}
        >{i}</button>
      );
    }
  
    return (
      <>
      <Button returnButton ={handleReturn} pressNoteButton ={pressNoteButton} note ={note} hint={hint} handleHint= {handleHint}
        newGame= {newGame} returnBack= {returnBack} data= {data}></Button>
      <Table pressNumber={number} note ={note} arrNote= {arrNote} actionList ={actionList} sendBackParentdata = {handleReceivedData}
        levelChose= {level} triggerFetch = {triggerFetch}/>
      <div id="numberContainer">
        {buttons}
      </div>
      <div className="copyright">© 2024 RMIT Neo Culture Tech Club. All rights reserved. <a href="https://github.com/RmitNeoculturetechclub/NCT_Sudoku">GitHub</a></div>
      </>
    );
  }
export default Numbers;