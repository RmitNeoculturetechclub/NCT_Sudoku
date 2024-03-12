import './button.css';
import React, { useState } from 'react';

function Button({returnButton, pressNoteButton, note, handleHint, hint, newGame}) {
  

function openTab(e){
  let modal = document.getElementById("myModal");

  modal.style.display = "block";
};

function closeTab(){
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
};

  return (
    <div>
      <div className="btnDiff">
        <div className="btnDiff__i1">LEVEL:</div>
        <div className="btnDiff__i2">Easy</div>
        <div className="btnDiff__i2">Medium</div>
        <div className="btnDiff__i2">Hard</div>
      </div>

      <div className="btnFunc__wrap mt-4 mb-2 flex w-[400px] cursor-pointer select-none items-center justify-around gap-6">
        {/* Btn item 1  */}
        <div className="btn__item group truncate flex items-center gap-1 rounded-full bg-[#DBDBDA] py-[10px] pl-[10px] pr-[6px] hover:bg-[#d4d4d8]">
          <button className="onClick={returnButton} btn__icon btnFunc__img btnFunc__reverse w-fit rounded-full">
            <div className="h-7 w-7 text-[#7F7F7F]">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
              </svg>
            </div>
          </button>
          <div className="duration-[250ms] w-0 text-[#7F7F7F] opacity-0 transition-all group-hover:ml-1 group-hover:w-16 group-hover:opacity-100">
            Reverse
          </div>
        </div>

        {/* Btn item 2  */}
        <div className="btn__item group relative flex items-center gap-0 rounded-full bg-[#DBDBDA] p-[10px] hover:bg-[#d4d4d8]">
          <button className="onClick={handleHint} btn__icon btnFunc__img btnFunc__hint w-fit rounded-full">
            <div className="h-7 w-7 text-[#7F7F7F]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-65 0 512 512"
                fill="currentColor"
              >
                <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z" />
              </svg>
            </div>
          </button>
          <div className="hint__badge btn__text duration-[250ms] w-0 text-[#7F7F7F] opacity-0 transition-all group-hover:ml-1 group-hover:w-8 group-hover:opacity-100">
            {hint}
          </div>

          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7F7F7F] align-middle text-[9px] text-white">
            5
          </span>
        </div>

        {/* Btn item 3  */}
        <div className="btn__item btn__item3 group relative flex items-center gap-1 text-nowrap rounded-full bg-[#DBDBDA] py-[10px] pl-[10px] pr-[6px] hover:bg-[#d4d4d8]">
          <button className="onClick={pressNoteButton} btn__icon btnFunc__img btnFunc__note w-fit rounded-full">
            <div className="h-[24px] w-[24px] text-[#7F7F7F]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
              </svg>
            </div>
          </button>
          <div className="note__badge btn__text duration-[250ms] w-0 text-[#7F7F7F] opacity-0 transition-all group-hover:ml-1 group-hover:w-10 group-hover:opacity-100">
            {note}
          </div>

          <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7F7F7F] text-[7.5px] text-white">
            ON
          </div>
        </div>

        {/* Btn item 4  */}
          <div className="btnFunc__newGame"  id="openModalBtn" onClick={()=>openTab()}>NEW GAME</div>
          <div id="myModal" className="modal">
        <div className="modal-content">
          <span id="closeModalBtn" className="close" onClick={()=>closeTab()}>&times;</span>
          <div className='modal-text'>
          <h1>Level</h1>
          <div className='diff-btn' onClick={e=>
           {newGame(e);
            closeTab()}}>Easy</div>
          <div className='diff-btn'onClick={e=> 
          {newGame(e);
            closeTab()}}>Medium</div>
          <div className='diff-btn'onClick={e=> 
          {newGame(e);
            closeTab()}}>Hard</div>
          </div>
        </div>
    </div>
        </div>
      </div>
    </div>
  );
}

export default Button;
