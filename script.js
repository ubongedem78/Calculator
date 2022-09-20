
let display = '0';
let newTotal = 0;
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value){
  if(isNaN(parseInt(value))){
    handleSymbol(value);
  } else{
    handleNumber(value);
  }
  clear();
}


function handleNumber(value){
  if (display === '0'){
    display = value;
  } else {
    display += value;
  }
}

function handleSymbol(value){
  switch(value){
    case 'C':
      display = '0';
      break;
    case '←':
      if(display.length === 1){
        display = '0'
      } else {
        display = display.substring(0, display.length-1);
      }
      break;
      case '=':
        if(previousOperator === null){
          //we need two numbers to perform an operation on
          return;
        }
          flushOperation(parseInt(display));
          previousOperator = null;
          display = +newTotal;
          newTotal = 0; 
          break;
      case '+':
      case '-': 
      case 'x':
      case '÷':
        handleMath(value);
        break;
  
  }
}

function handleMath(value){
  if(display === '0'){
    //do nothing
    return;
  } 
  const intDisplay = parseInt(display);
  if(newTotal === 0){
    newTotal = intDisplay
  } else {
    flushOperation(intDisplay)
  }

  previousOperator = value;
  display = '0'
}

function flushOperation(intDisplay){
  if (previousOperator === "+") {
    newTotal += intDisplay;
  } else if (previousOperator === "-") {
    newTotal -= intDisplay;
  } else if (previousOperator === "x") {
    newTotal *= intDisplay;
  } else {
    newTotal /= intDisplay;
  }
}



function clear(){
  screen.innerText = display;
}

function init(){
  document
    .querySelector('.button-container')
    .addEventListener('click', function(event){
      buttonClick(event.target.innerText)
  });
}

init();