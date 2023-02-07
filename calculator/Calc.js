const container = document.querySelector('.calcBox')
const input = document.querySelector('.input')
const buttons = document.querySelectorAll('.btn')
let firstEl = ''
let secondEl = ''
let operation = ''

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',]
const operandsObject = {
    "+": "+",
    "-":"-",
    "*":"*",
    "/":"/"
}
const operand = ['+', '-', '*', '/']

buttons.forEach(btn => {

    btn.addEventListener('click', (e) => calcFunc(e))

})
document.addEventListener('keydown', (e) => calcFunc(e))


document.addEventListener('keyup', (e) => {
    buttons.forEach(item => {
        if (item.textContent === e.key) {
            item.setAttribute('class', 'unClicked')
        }
    })
})
document.addEventListener('keydown', (e) => {
    buttons.forEach(item => {
        if (item.textContent === e.key) {
            item.setAttribute('class', 'clicked')
        }
    })
})


const calcFunc = (e) => {

    e.preventDefault()

    const isKeyboard = !!e.key

    const btnValue = !isKeyboard ? e.target.value : e.key

    if (numbers.includes(btnValue)) {
        input.textContent += btnValue
    }

    if (operand.includes(btnValue)) {
        const hasOperand = operand.reduce((acc,item)=>{
            if(input.textContent.includes(item)){
                acc = true;
            }
            return acc
        },false);
        if (hasOperand) {
            secondEl = input.textContent.slice(input.textContent.lastIndexOf(operation) + 1)
            operationFunc(Number(firstEl), operation, Number(secondEl))
        }
        firstEl = input.textContent
        operation = btnValue
        input.textContent += operation
    }

    if (btnValue === '.' && (!input.textContent.includes('.') || !input.textContent.slice(input.textContent.indexOf(operation)).includes(btnValue))) {
        input.textContent = input.textContent + btnValue
    }


    if (btnValue === '=' || btnValue === "Enter") {
        secondEl = input.textContent.slice(input.textContent.lastIndexOf(operation) + 1)
        operationFunc(Number(firstEl), operation, Number(secondEl))
    }
    if (btnValue === 'clear' || btnValue === "Delete") {
        input.textContent = ''
        firstEl = ''
        secondEl = ''
        operation = ''
    }
    if (e.key === 'Backspace') {
        input.textContent = input.textContent.slice(firstEl, -1)
    }
}
const operationFunc = (firstValue, operation, secondValue) => {
    console.log(firstValue, operation, secondValue)
    switch (operation) {
        case '+':
            input.textContent = firstValue + secondValue
            break;
        case '-':
            input.textContent = firstValue - secondValue
            break;
        case '*':
            input.textContent = firstValue * secondValue
            break;
        case '/':
            input.textContent = firstValue / secondValue
            break;
    }
}