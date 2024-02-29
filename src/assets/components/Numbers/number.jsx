import "./number.css"
function Numbers(){
    const buttons = [];

    // Use a for loop to generate buttons labeled from 1 to 9
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <button key={i}>{i}</button>
      );
    }
  
    return (
      <div id="numberContainer">
        {buttons}
      </div>
    );
  }
export default Numbers;