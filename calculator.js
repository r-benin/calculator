const displayNumber = document.getElementById('displayNumber');
const display = document.getElementById('display');
var operatorMode = null;
var previousOperatorMode = "none";
var resetScreen = false;
var numSign = "+";
var isDecimal = false;
var num1 = null;
var num2 = 0;
var displayNum = 0;

function inputNumber(digit) {
    if (displayNumber.textContent.length >= 12 && !resetScreen) return;
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
    if (numSign == "+") {
        displayNum = -Math.abs(getDisplayNumber());
        numSign = "-";
        displayNumber.innerHTML = displayNum;
    } else {
        displayNum = Math.abs(getDisplayNumber());
        numSign = "+";
        displayNumber.innerHTML = displayNum;
    }
}

function toPercent() {
    if (displayNumber.innerHTML != '0') {
        percentNum = getDisplayNumber();
        percentNum /= 100;
        displayNum = percentNum;
        isDecimal = true;
        displayNumber.innerHTML = displayNum;
    }
}

function inputDecimal() {
    if (!isDecimal && !resetScreen) {
        displayNumber.innerHTML += '.';
        isDecimal = true;
        resetScreen = false;
    }
    if (!isDecimal && resetScreen) {
        displayNumber.innerHTML = '0.';
        isDecimal = true;
        resetScreen = false;
    }
    
}

function setOperator(operator) {
    if (operatorMode == null) {
        num1 = getDisplayNumber();
    }
    if (operatorMode != null && !resetScreen) {
        num2 = getDisplayNumber();
        addend = num1;
        num1 = evaluate(num1, num2);
        console.log(addend + " " + operatorMode + " " + num2);
    }
    // switchSelected(operator);
    isDecimal = false;
    numSign = "+";
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
            if (num2 == 0) {
                return "¯\\_(ツ)_/¯";
            } else {
                return divide(num1, num2);
            }
            
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
    isDecimal = false;
    // clearSelected();
    numSign = "+";
}

function clearScreen() {
    displayNumber.innerHTML = 0;
    numSign = "+";
    isDecimal = false;
    num1 = null;
    num2 = 0;
    // clearSelected();
    resetScreen = true;
}

function getDisplayNumber() {
    return parseFloat(displayNumber.innerHTML);
}

function updateDisplay() {
    if (displayNum.toString().length > 14) {
        display.style.fontSize = "10px";
    } else {
        display.style.fontSize = "50px";
    }
    displayNumber.innerHTML = displayNum;
    resetScreen = true;
}

// function switchSelected(button) {
//     switch (button) {
//         case "+":
//             clearSelected();
//             document.querySelector('#add-button > div').classList.toggle('selected');
//             previousOperatorMode = button;
//             break;
//         case "-":
//             clearSelected();
//             document.querySelector('#subtract-button > div').classList.toggle('selected');
//             previousOperatorMode = button;
//             break;
//         case "*":
//             clearSelected();
//             document.querySelector('#multiply-button > div').classList.toggle('selected');
//             previousOperatorMode = button;
//             break;
//         case "/":
//             clearSelected();
//             document.querySelector('#divide-button > div').classList.toggle('selected');
//             previousOperatorMode = button;
//             break;
//     }
// }

// function clearSelected() {
//     switch(previousOperatorMode) {
//         case "+":
//             document.querySelector('#add-button > div').classList.toggle('unelected');
//             break;
//         case "-":
//             document.querySelector('#subtract-button > div').classList.toggle('unselected');
//             break;
//         case "*":
//             document.querySelector('#multiply-button > div').classList.toggle('unselected');
//             break;
//         case "/":
//             document.querySelector('#divide-button > div').classList.toggle('unselected');
//             break;
//     }
//     previousOperatorMode = "none";
// }