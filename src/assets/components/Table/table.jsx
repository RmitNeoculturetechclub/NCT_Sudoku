import React, { useState, useEffect } from 'react';
import "./table.css"
function Table() {

  const [data, setData] = useState(null); // Initialize state for the fetched data

  useEffect(() => {
    fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty}}}')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data.newboard.grids[0].difficulty)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handleClick = (e) => {
    clearActiveClasses();
    hightlightColumTable(e);
    hightlightRowTable(e);
    highlightSmallTable(e);
  };
  
  const clearActiveClasses = () => {
    const listActive = document.getElementsByClassName("isActive");
    [...listActive].forEach((element) => {
      element.classList.remove("isActive");
    });
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

  // Template 
  if (!data) {
    return <div>Loading...</div>;
  }
  const tableContent = data.newboard.grids[0].value.map((row, rowIndex) =>
    <div key={rowIndex} className='tableRow'id={`row-${rowIndex}`}>
      {row.map((value, colIndex) =>
        <div key={colIndex} className={`tile col-${colIndex}`}  onClick={(e) => handleClick(e)}>
          {value!=0?value:""}
        </div>
      )}
    </div>
  );

  return <div id='table'>{tableContent}</div>;
}

export default Table;