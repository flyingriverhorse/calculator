const calculatorDisplay = document.querySelector('h1'); //just h1
const inputBtns = document.querySelectorAll('button'); // all buttons
const clearBtn = document.getElementById('clear-btn');

// calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue (number){
    //replace current dislay value if first value is enetered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // if current display value i 0, replace it if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // if operator pressed dont add decimal
    if (awaitingNextValue) return;
    // if no decimal add one 
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    //assign firstvalue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        // console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        // console.log('calculation', calculation);
        firstValue = calculation;
    }
    // ready for the next value store operator
    awaitingNextValue = true;
    operatorValue = operator;
    
}

// reset all values, fisplay
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

//add event listeners for numbers operator and decimal button
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value)); //actually calling the function () =>
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

//event listener
clearBtn.addEventListener('click', resetAll);