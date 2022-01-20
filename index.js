// const numberBtns = document.querySelectorAll('.number-values')

// const equalsBtn = document.getElementById('equals-btn')
// const operationalBtns = document.querySelectorAll('.operation-values')



// numberBtns.forEach(button => {
//     button.addEventListener('click', (e)=> {
//         displayValue.textContent += Number(e.target.textContent);
//     })
// })

// operationalBtns.forEach(button => {
//     if (button.textContent === "+"){
//        button.addEventListener('click',addition)
//     }
// })

// equalsBtn.addEventListener('click',operate)
/*
const querySelectorAll = (selector) => document.querySelectorAll(selector);
const id = (id) => document.getElementById(id)


const equalsBtn = id('equals-btn')
const displayValue = id('display')
const numBtns = querySelectorAll('.number-values')
const funcBtns = querySelectorAll('.functional-values')
const operationBtns = querySelectorAll('.operation-values')  // equal button is here too

let value1 = '';
let value2 = '';
let previousValue;
let nextValue;
let operator;
let result;



numBtns.forEach(button => {

     button.addEventListener('click', (e) => {
         let dataSet = e.target.dataset.value
         
         switch(dataSet) {
             case "0":
             case "1":
             case "2":
             case "3":
             case "4":
             case "5":
             case "6":
             case "7":
             case "8":
             case "9":
                displayValue.textContent = ''

                if (result && previousValue) {
                    value2 += dataSet;
                    displayValue.textContent += value2;
                }
                    
                if (previousValue === undefined) {
                        value1 += dataSet;
                        displayValue.textContent += value1;
                 } else if (previousValue && nextValue === undefined) {
                     value2 += dataSet
                     displayValue.textContent += value2;
                 }
         }
     })
})

operationBtns.forEach(button => {

    button.addEventListener('click', (e) => {
        let dataSet = e.target.dataset.value;

        switch(dataSet) {
            case "÷": 
                operator = "/";

                if (result) {
                    previousValue = result
                    return new Promise(req)
                } 
                if (previousValue && nextValue) {
                    result = division(previousValue,nextValue)
                    displayValue.textContent = result
                }
                if (previousValue === undefined) {
                    previousValue = Number(value1)
                    
                } 
                
                break;
            case "*":
                operator = "*"

                if (result) {
                    previousValue = result
                }
                if (previousValue === undefined) {
                    previousValue = Number(value1)
                    
                }
                
                break;
            case "+":
                operator = "+"

                if (result) {
                    previousValue = result
                }
                if (previousValue === undefined) {
                    previousValue = Number(value1)
                    
                }
        
                break;
            case "-":
                operator = "-"
                 
                if (result) {
                    previousValue = result
                }

                if (previousValue === undefined) {
                    previousValue = Number(value1)
                    
                }
                
                break;
            case "=":
                if (previousValue) {
                    nextValue = Number(value2)
                    operate(previousValue,nextValue,operator)
                }
                break
        }
    })
})


function operate(previousValue, nextValue, operator) {
    
    switch (operator) {
        case "/": 
            if (previousValue && nextValue) {
                result = division(previousValue, nextValue)
                displayValue.textContent = result;
            }
            break;
        case "*": 
            if (previousValue && nextValue) {
                result = multiplication(previousValue,nextValue)
                displayValue.textContent = result;
            }
            break;
        case "+":
            if (previousValue && nextValue) {
                result = addition(previousValue,nextValue)
                displayValue.textContent = result;
            }
            break;
        case "-": 
            if (previousValue && nextValue) {
                result = subtraction(previousValue,nextValue)
                displayValue.textContent = result;
            }
            break;
    }

}

const division = (a,b) => a / b;

const addition = (a,b) => a + b;

const multiplication = (a,b) => a * b

const subtraction = (a,b) => a - b;

*/

const calculator = document.querySelector('.container');
const display = calculator.querySelector('.display-values');
const keys = calculator.querySelector('.oporands-section');


keys.addEventListener('click', (e) => {
    if (e.target.matches('button')) {

        const key = e.target;
        const dataTag = key.dataset.value;
        const keyText = key.textContent;
        const displayNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;


        if (!dataTag) {
            if (displayNum === "0" || previousKeyType === "operator" || previousKeyType === "equals") {
                display.textContent = keyText;
            } else {
                display.textContent = displayNum + keyText;
            }

            calculator.dataset.previousKeyType = "number"
        }

        if (dataTag === "multiply" || dataTag === "add" || dataTag === "divide" || dataTag === "subtract") {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNum;

            if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "equals") {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;

            } else if (firstValue && operator && previousKeyType === "operator" && previousKeyType !== "equals") {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayNum;
            }

            
            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.firstValue = displayNum;
            calculator.dataset.operator = dataTag;

        }

        if (dataTag === 'decimal') {
            if (!displayNum.includes('.')) {
                display.textContent = displayNum + ".";
            } else if (previousKeyType === "operator" || previousKeyType === "equals") {
                display.textContent = "0.";
            } 

            calculator.dataset.previousKeyType = "decimal";
        }

        if (dataTag === 'percent') {
            if (previousKeyType === 'number' || previousKeyType === 'equals') {
                display.textContent = percent(displayNum);
            }

            calculator.dataset.previousKeyType = "percent";
        }

        if (dataTag === "plusMinus") {
            if (previousKeyType === 'number' || previousKeyType === 'equals') {
                display.textContent = plusMinus(displayNum);
            }

            calculator.dataset.previousKeyType = "plusMinus";
        }

        if (dataTag !== 'clear') {
            const clearBtn = calculator.querySelector('[data-value=clear]')
            clearBtn.textContent = 'CE'
        }

        if (dataTag === 'clear') {
            if (key.textContent === "CE") {
                display.textContent = "0";
                key.textContent = "AC"
            } else {
                key.textContent = "AC";
                display.textContent = "0";
                calculator.dataset.firstValue = '';
                calculator.dataset.secondValue = '';
                calculator.dataset.previousKeyType = '';
                calculator.dataset.operator = '';
            }
        }

        if (dataTag === "equals") {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayNum;

            if (firstValue) {
                if (previousKeyType === 'equals') {
                    firstValue = displayNum;
                    secondValue = calculator.dataset.secondValue;
                }
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            calculator.dataset.secondValue = secondValue;
            calculator.dataset.previousKeyType = "equals";
        }


    }
})

const calculate = (n1, operator, n2) => {
    const firstValue = parseFloat(n1);
    const secondValue = parseFloat(n2);
    
    if (operator === "add") {
        return firstValue + secondValue;
    }

    if (operator === "subtract") {
        return firstValue - secondValue;
    }

    if (operator === "multiply") {
        return firstValue * secondValue;
    }

    if (operator === "divide") {
        return firstValue / secondValue;
    }
}

const percent = (n1) => {
    const num = parseFloat(n1);
    return num * .01;
}

const plusMinus = (n1) => {
    const num = parseFloat(n1);
    if (num < 0) {
        return num * -1;
    } else {
        return -num 
    }
}