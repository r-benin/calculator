const displayNumber = document.getElementById('displayNumber');
var operatorMode = null;
var previousOperatorMode = "none";
var resetScreen = false;
var num1 = null;
var num2 = 0;
var displayNum = 0;


const number1 = document.querySelector("num1-preview");
const number2 = document.querySelector("num2-preview");


function inputNumber(digit) {
    if (displayNumber.textContent.length >= 9) return;
    if (resetScreen == true) {
        displayNumber.innerHTML = digit;
        resetScreen = false;
    } else {
        if (displayNumber.innerHTML == '0') {
            displayNumber.innerHTML = digit;
        } else {
            displayNumber.innerHTML += digit;
        }
    }    
}

function changeSign() {
    displayNum = -Math.abs(getDisplayNumber());
    updateDisplay();
}


function setOperator(operator) {
    if (operatorMode == null) {
        num1 = getDisplayNumber();
    }
    if (operatorMode != null && !resetScreen) {
        num2 = getDisplayNumber();
        num1 = evaluate(num1, num2);
        console.log("Evaluated " + num1 + " and " + num2);
    }
    
    operatorMode = operator;
    resetScreen = true;

}

function evaluate(num1, num2) {
    switch(operatorMode) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function equals() {
    setOperator(operatorMode);
    displayNum = num1;
    updateDisplay();
    operatorMode = null;
}

function clearScreen() {
    displayNumber.innerHTML = 0;
    num1 = null;
    num2 = 0;
    resetScreen = true;
}

function getDisplayNumber() {
    return parseInt(displayNumber.innerHTML);
}

function updateDisplay() {
    displayNumber.innerHTML = displayNum;
    resetScreen = true;
}