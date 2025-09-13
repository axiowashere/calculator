// elements
const outputText = document.querySelector(".output-container");
const numPad = document.querySelector(".numpad");
const operatorPad = document.querySelector(".operators");

// data
let rawNum = "";
let firstNum = null;
let secondNum = null;
let operator = null;

function updateDisplay(){
    console.log("I was here!")
    outputText.textContent = (rawNum == 0) ? 0 : rawNum;
}

function evaluate(a, b, operator){
    switch(operator){
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case '*':
            return a * b;
            break;
        case '/':
            return a / b;
            break;
    }
}

// functions
function inputNumber(number){
    console.log(number);
    if (rawNum.length < 10){
        rawNum += number;
        updateDisplay();
    }
}

function inputOperator(op){
    if (firstNum != null && operator != null && rawNum != ""){
        secondNum = parseInt(rawNum)
        rawNum = evaluate(firstNum, secondNum, operator);
        updateDisplay(rawNum);
    }
    operator = op;
    if (rawNum != ""){
        firstNum = parseInt(rawNum);
        rawNum = ""; 
    }
}


function clearInputs(){
    operator = null
    firstNum = null
    secondNum = null
    rawNum = ""
    updateDisplay();
}

// button listeners
numPad.addEventListener("click", function(hit){
    switch(hit.target.id){
        // this is very practical and definitely not stupid idea
        case 'one':
            inputNumber(1);
            break;
        case 'two':
            inputNumber(2);
            break;
        case 'three':
            inputNumber(3);
            break;
        case 'four':
            inputNumber(4);
            break;
        case 'five':
            inputNumber(5);
            break;
        case 'six':
            inputNumber(6);
            break;
        case 'seven':
            inputNumber(7);
            break;
        case 'eight':
            inputNumber(8);
            break;
        case 'nine':
            inputNumber(9);
            break;
        case 'zero':
            inputNumber(10);
            break;
    }
});

operatorPad.addEventListener("click", function(hit){
    switch(hit.target.id){
        case 'add':
            inputOperator('+');
            break; 
        case 'subtract': 
            inputOperator('-');
            break;
        case 'multiply':
            inputOperator('*');
            break;
        case 'divide':
            inputOperator('/');
            break;
        case 'clear':
            clearInputs();
            break;
        case 'equals':
            if (firstNum != null && rawNum != null && operator != null){
                secondNum = (Number.isInteger(parseInt(rawNum))) ? rawNum : firstNum;
                rawNum = evaluate(firstNum, parseInt(secondNum), operator);
                operator = null;
                updateDisplay(rawNum);
                firstNum = parseInt(rawNum);
                rawNum = "";
            }
            break;
    }
});
