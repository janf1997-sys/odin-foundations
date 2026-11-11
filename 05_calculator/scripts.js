const pad = document.querySelector('.pad');
const display = document.querySelector('.display');

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

let num1 = '';
let num2 = '';
let operator = '';
let isCalculated = false;

function operate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);

    case '-':
      return subtract(a, b);

    case '*':
      return multiply(a, b);

    case '/':
      return divide(a, b);
  }
}

function getNumbers(e) {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }
  if (e.target.dataset.number) {
    if (isCalculated === true) {
      operator = '';
      num2 = '';
      num1 = e.target.dataset.number;
      isCalculated = false;
      display.textContent = num1;
      return;
    }
    if (!operator) {
      num1 += e.target.dataset.number;
      display.textContent = num1;
    } else if (operator) {
      num2 += e.target.dataset.number;
      display.textContent = num2;
    }
  }
  if (e.target.dataset.function) {
    if (isCalculated === true) {
      operator = e.target.dataset.function;
      num2 = '';
      isCalculated = false;
      return;
    }
    if (!operator || !num2) {
      operator = e.target.dataset.function;
    } else if (operator) {
      result = operate(parseInt(num1), operator, parseInt(num2));
      if (!Number.isFinite(result)) {
        display.textContent = 'ERROR';
        num1 = '';
        num2 = '';
        operator = '';
        isCalculated = true;
        return;
      }
      display.textContent = result;
      operator = e.target.dataset.function;
      num1 = result;
      num2 = '';
      result = '';
    }
  }
  if (e.target.dataset.equals) {
    if (!num2) {
      return;
    }
    result = operate(parseInt(num1), operator, parseInt(num2));
    if (!Number.isFinite(result)) {
      display.textContent = 'ERROR';
      num1 = '';
      num2 = '';
      operator = '';
      isCalculated = true;
      return;
    }
    display.textContent = result;
    num1 = result;
    isCalculated = true;
  }
  if (e.target.dataset.clear) {
    num1 = '';
    num2 = '';
    isCalculated = false;
    operator = '';
    display.textContent = '0';
  }
}
pad.addEventListener('click', getNumbers);
