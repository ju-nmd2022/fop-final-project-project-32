
let rowCounter = 0;
let columnCounter = 0;

let rowDisplay = document.querySelector('.rowCounterDisplay');
let columnDisplay = document.querySelector('.columnCounterDisplay');

let rowMinus = document.querySelector('.rowCounterMinus');
let rowPlus = document.querySelector('.rowCounterPlus');

let columnMinus = document.querySelector('.columnCounterMinus');
let columnPlus = document.querySelector('.columnCounterPlus');

updateRowDisplay();
updateColumnDisplay();

rowPlus.addEventListener("click", () => {
  rowCounter++;
  updateRowDisplay();
});

rowMinus.addEventListener("click", () => {
  rowCounter--;
  updateRowDisplay();
});

columnPlus.addEventListener("click", () => {
  columnCounter++;
  updateColumnDisplay();
});

columnMinus.addEventListener("click", () => {
  columnCounter--;
  updateColumnDisplay();
});

function updateRowDisplay() {
  rowDisplay.innerHTML = rowCounter;
}

function updateColumnDisplay() {
  columnDisplay.innerHTML = columnCounter;
}