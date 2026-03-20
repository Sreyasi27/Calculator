let display = document.getElementById("display");
let result = document.getElementById("result");
let historyContent = document.getElementById("history-content");
let history = [];

function appendToDisplay(value) {
  display.value += value;
  result.textContent = "";
  result.classList.remove("error");
}

function appendFunction(func) {
  display.value += func;
  result.textContent = "";
  result.classList.remove("error");
}

function clearAll() {
  display.value = "";
  result.textContent = "";
  result.classList.remove("error");
}

function clearEntry() {
  display.value = display.value.slice(0, -1);
  result.textContent = "";
  result.classList.remove("error");
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function log10(x) {
  return Math.log(x) / Math.log(10);
}
function log(x) {
  return Math.log(x);
}
function sin(x) {
  return Math.sin(x);
}
function cos(x) {
  return Math.cos(x);
}
function tan(x) {
  return Math.tan(x);
}
function asin(x) {
  return Math.asin(x);
}
function acos(x) {
  return Math.acos(x);
}
function atan(x) {
  return Math.atan(x);
}
function sqrt(x) {
  return Math.sqrt(x);
}

function calculate() {
  let expression = display.value;
  if (!expression) return;
  try {
    let jsExpression = expression.replace(/\^/g, "**");
    let calcResult = eval(jsExpression);
    if (isNaN(calcResult) || !isFinite(calcResult)) throw new Error("Invalid");
    result.textContent = Number.isInteger(calcResult)
      ? calcResult.toString()
      : parseFloat(calcResult.toFixed(10)).toString();
    result.classList.remove("error");
    addToHistory(expression, result.textContent);
  } catch (error) {
    result.textContent = "Error";
    result.classList.add("error");
  }
}

function addToHistory(expression, res) {
  history.unshift(`${expression} = ${res}`);
  if (history.length > 5) history = history.slice(0, 5);
  historyContent.innerHTML = history
    .map((item) => `<div class="history-item">${item}</div>`)
    .join("");
}

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if ("0123456789".includes(key)) appendToDisplay(key);
  else if ("+-*/".includes(key)) appendToDisplay(key);
  else if (key === ".") appendToDisplay(".");
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Escape") clearAll();
  else if (key === "Backspace") clearEntry();
  else if (key === "(" || key === ")") appendToDisplay(key);
});

window.addEventListener("load", function () {
  display.focus();
});
