const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector('[data-action="clear"]');
const equalButton = document.getElementById("equal");

let currentInput = "";
let firstNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;


numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const digit = button.textContent;

    // Prevent multiple dots
    if (digit === "." && currentInput.includes(".")) return;

    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
    }

    currentInput += digit;
    display.textContent = currentInput;
  });
});


operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (currentInput === "") return;

    if (firstNumber !== null && currentOperator !== null && !shouldResetDisplay) {
      // Chain calculation if already have a previous number
      const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(currentInput));
      firstNumber = result;
      display.textContent = result;
    } else {
      firstNumber = currentInput;
    }

    currentOperator = button.dataset.operator;
    shouldResetDisplay = true;
  });
});


equalButton.addEventListener("click", () => {
  if (firstNumber === null || currentOperator === null || currentInput === "") return;

  const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(currentInput));
  display.textContent = result;
  currentInput = result.toString();
  firstNumber = null;
  currentOperator = null;
  shouldResetDisplay = true;
});


clearButton.addEventListener("click", () => {
  currentInput = "";
  firstNumber = null;
  currentOperator = null;
  shouldResetDisplay = false;
  display.textContent = "0";
});


function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return roundResult(a + b);
    case "-":
      return roundResult(a - b);
    case "*":
      return roundResult(a * b);
    case "/":
      if (b === 0) return "Can't divide by 0!";
      return roundResult(a / b);
    default:
      return null;
  }
}


function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}
