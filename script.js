// elements
const outputText = document.querySelector(".output-container");
const numPad = document.querySelector(".numpad");
const operatorPad = document.querySelector(".operators");

// data
let rawNum = "";
let firstNum = null;
let secondNum = null;
let operator = null;
let badEval = false;

function updateDisplay(){
    console.log("I was here!")
    let textOut = (rawNum==0) ? 0 : rawNum;
    if (textOut > (10**34)){
        badEval = true;
        outputText.textContent = "ERROR";
        return;
    }
    textOut = (Math.round(textOut * 100000000)/100000000).toString(); 
    if (textOut.length > 10){
        textOut = textOut.substring(0, 2)/10 + `+e${textOut.length-1}`
    }
    outputText.textContent = textOut;
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
    if (badEval) return;
    console.log(number);
    if (rawNum.length < 10){
        rawNum += number;
        updateDisplay();
    }
}

function inputOperator(op){
    if (badEval) return;
    if (firstNum != null && operator != null && rawNum != ""){
        secondNum = parseInt(rawNum)
        if (secondNum === 0 && operator == '/'){
            rawNum = 'ERROR';
            updateDisplay();
            badEval = true;
            return;
        }
        rawNum = evaluate(firstNum, secondNum, operator);
        updateDisplay();
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
    badEval = false;
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
            inputNumber(0);
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
            if (firstNum != null && rawNum != null && operator != null && (!badEval)){
                secondNum = (Number.isInteger(parseInt(rawNum))) ? rawNum : firstNum;
                if (parseInt(secondNum)=== 0 && operator == '/'){
                    console.log("hit!");
                    rawNum = 'ERROR';
                    updateDisplay();
                    badEval = true;
                    break;
                }
                rawNum = evaluate(firstNum, parseInt(secondNum), operator);
                operator = null;
                updateDisplay();
                firstNum = parseInt(rawNum);
                rawNum = "";
            }
            break;
    }
});
