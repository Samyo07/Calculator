const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1-num2;
const multiply = (num1, num2) => Number(Math.round(num1*num2+'e2')+'e-2');
const divide = (dividend, divisor) => divisor !== 0 ? Number(Math.round(dividend/divisor+'e2')+'e-2') : "You can't divide by 0";
const clearVars = ()=>{
    displayNum.textContent = 0;
    currentNumber = 0;
    previousStoredNum = 0;
    currentOperand = null;
    stringNum = "";
};
const displayNum = document.createElement("h2");
const display = document.getElementById("display")
displayNum.textContent = "";
display.appendChild(displayNum);
let lastNumberClicked;
let previousStoredNum;
let currentNumber;
let currentOperand;
let stringNum;
clearVars();
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(typeof buttonClicked(e.target.id) === "number"){
            if(buttonClicked(e.target.id) || currentNumber){ //Check if num is greater than 0
                if(currentOperand || !currentNumber){ //If an operator is selected, clear display
                    displayNum.textContent = "";
                }
            }
            stringNum += String(buttonClicked(e.target.id));
            currentNumber = Number(stringNum);
            displayNum.textContent = currentNumber;
        } else if(typeof buttonClicked(e.target.id) === "string"){
            if (isOperator(buttonClicked(e.target.id))){
                if(currentOperand){
                    operate(previousStoredNum, currentNumber, currentOperand);
                }
                previousStoredNum = currentNumber;
                currentNumber = 0;
                currentOperand = buttonClicked(e.target.id);
                stringNum = "";
            } else if(e.target.id === "btn-clear") {
                clearVars();
            } else if(e.target.id === "btn-decimal"){
                if(!stringNum.includes(".")){
                    stringNum += String(buttonClicked(e.target.id));
                    currentNumber = Number(stringNum);
                }
            } else{
                operate(previousStoredNum, currentNumber, currentOperand);
            } 
        }
        });
    });
const buttonClicked = btnID =>{
    let btnClicked = 0;
    switch(btnID){
        case "btn0":
            btnClicked = 0;
            break;
        case "btn1":
            btnClicked = 1;
            break;
        case "btn2":
            btnClicked = 2;
            break;
        case "btn3":
            btnClicked = 3;
            break;
        case "btn4":
            btnClicked = 4;
            break;
        case "btn5":
            btnClicked = 5;
            break;
        case "btn6":
            btnClicked = 6;
            break;
        case "btn7":
            btnClicked = 7;
            break;
        case "btn8":
            btnClicked = 8;
            break;
        case "btn9":
            btnClicked = 9;
            break;
        case "btn-decimal":
            btnClicked = ".";
            break;
        case "btn-add":
            btnClicked = "+";
            break;
        case "btn-subtract":
            btnClicked = "-";
            break;
        case "btn-multiply":
            btnClicked = "x";
            break;
        case "btn-divide":
            btnClicked = "/";
            break;
        case "btn-equals":
            btnClicked = "=";
            break;
        case "btn-clear":
            btnClicked = "CE";
            break;
    }
    return btnClicked;
};
const operate = (num1, num2, operand) =>{
    let result = 0;
    if(operand === "+"){
        result = add(num1, num2);
    } else if(operand === "-"){
        result = subtract(num1, num2);
    } else if(operand === "x"){
        result = multiply(num1, num2);
    } else if(operand === "/"){
        result = divide(num1, num2);
    } else{
        result = num2;
    }
    stringNum =  String(result);
    displayNum.textContent = stringNum;
    currentNumber = result;
    previousStoredNum = 0;
    currentOperand = null;
};
const isOperator = string =>{
    return (string === "+" || string === "-" || string === "x" || string === "/");
};
