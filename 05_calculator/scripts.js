// State & DOM
let num1 = '';
let num2 = '';
let operator = '';
let isCalculated = false;

const pad = document.querySelector('.pad');
const display = document.querySelector('.display');

// Core math operations
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

//Updates the calculator display DOM node
function updateDisplay(value) {
  display.textContent = value;
}

// Resets all internal state flags and resets the display to initial '0'
function resetCalculator() {
  num1 = '';
  num2 = '';
  operator = '';
  isCalculated = false;
  updateDisplay('0');
}

function executeCalculation() {
  const result = operate(parseFloat(num1), operator, parseFloat(num2));

  // Catch divison by zero or invalid calculations
  if (!Number.isFinite(result)) {
    display.textContent = 'ERROR';
    num1 = '';
    num2 = '';
    operator = '';
    isCalculated = true; // Protects state: next keypress starts fresh
    return false;
  }

  // Store intermediate result into num1 for chaining and clear num2
  num1 = String(result);
  num2 = '';
  updateDisplay(result);
  return true;
}

const MAX_DIGITS = 26;

function handleNumber(digit) {
  // If '=' was just executed, the next number starts a completely new calculation
  if (isCalculated) {
    operator = '';
    num2 = '';
    num1 = digit === '.' ? '0.' : digit;
    isCalculated = false;
    updateDisplay(num1);
    return;
  }

  // Append digit to num1 if no operator has been chosen yet, otherwise append to num2
  if (!operator) {
    if (digit === '.' && num1.includes('.')) {
      return;
    }
    if (num1.length >= MAX_DIGITS) {
      return;
    }
    if (digit === '.' && num1 === '') {
      num1 = '0.';
    } else {
      num1 += digit;
    }
    updateDisplay(num1);
  } else {
    if (digit === '.' && num2.icludes('.')) {
      return;
    }
    if (num2.length >= MAX_DIGITS) {
      return;
    }
    if (digit === '.' && num2 === '') {
      num2 = '0.';
    } else {
      num2 += digit;
    }
    updateDisplay(num2);
  }
}

function handleOperator(nextOperator) {
  //If clicked after '=', continue calculating using previous result as num1
  if (isCalculated) {
    operator = nextOperator;
    num2 = '';
    isCalculated = false;
    return;
  }

  // Set initial operator or update it if the user changes their mind before entering num2
  if (!operator || !num2) {
    operator = nextOperator;
    return;
  }

  // If num1, operator, and num2 already exist, compute intermediate result before assigning new operator
  const success = executeCalculation();
  if (success) {
    operator = nextOperator;
  }
}

function handleEquals() {
  // Ignore '=' if the equation is incomplete
  if (!operator || !num2) {
    return;
  }
  const success = executeCalculation();
  if (success) {
    isCalculated = true; // Marks calculation as complete
  }
}

function handleBackspace() {
  if (isCalculated) {
    return;
  }
  if (operator || num2) {
    num2 = num2.slice(0, -1);
    updateDisplay(num2 || '0');
    return;
  }
  if (!operator || num1) {
    num1 = num1.slice(0, -1);
    updateDisplay(num1 || '0');
    return;
  }
}

function getNumbers(e) {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }
  const { number, function: op, equals, clear, delete: del } = e.target.dataset;

  if (number) {
    handleNumber(number);
  } else if (op) {
    handleOperator(op);
  } else if (equals) {
    handleEquals();
  } else if (clear) {
    resetCalculator();
  } else if (del) {
    handleBackspace();
  }
}

function keyboard(e) {
  let selector = `button[data-number="${e.key}"], button[data-function="${e.key}"]`;

  // Standardize non-character keys to their corresponding DOM dataset selectors
  if (e.key === 'Enter' || e.key === '=') {
    selector = 'button[data-equals]';
  } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
    selector = 'button[data-clear]';
  } else if (e.key === 'Backspace' || e.key === 'Delete') {
    selector = 'button[data-delete]';
  }
  const targetButton = document.querySelector(selector);

  if (targetButton) {
    targetButton.click();
  }
}

pad.addEventListener('click', getNumbers);
document.addEventListener('keydown', keyboard);
