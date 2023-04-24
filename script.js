const tipBtns = document.querySelectorAll(".tip__btn");
const resetBtn = document.querySelector(".reset__btn");
const customPercent = document.getElementById("custom-percent");
const inputBill = document.querySelector(".bill__input");
const inputPeople = document.querySelector(".people__input input");
const onePersonTipDipslay = document.querySelector(".tip__onePerson h2 span");
const totalTipDisplay = document.querySelector(".tip__total h2 span");
const errorText = document.querySelector(".error");

let tipPercent;

// getting the tip buttons values.
const getBtnValue = function (btnValue) {
  console.log(btnValue);
  tipPercent = btnValue;
};

// Calculat both the tip amount and total tip per person.
const calcTip = function () {
  const onePersonTip =
    (inputBill.value / inputPeople.value) * (tipPercent / 100);
  const totalTip = inputBill.value / inputPeople.value + onePersonTip;
  totalTipDisplay.textContent = totalTip.toFixed(2);
  onePersonTipDipslay.textContent = onePersonTip.toFixed(2);
};

// If the number of people is smaller or euqal to 0, display error.
const error = function () {
  if (inputPeople.value > 0) {
    resetBtn.style.opacity = "1";
    errorText.style.display = "none";
    inputPeople.style.outline = "none";
    calcTip();
  } else {
    errorText.style.display = "block";
    inputPeople.style.outline = "2px solid rgba(255, 0, 0, 0.855)";
    totalTipDisplay.textContent = onePersonTipDipslay.textContent = "0.00";
  }
};

// Resets the inputs and the display
const resetTip = function () {
  inputBill.value = inputPeople.value = "";
  resetBtn.style.opacity = "0.4";
  errorText.style.display = "none";
  inputPeople.style.outline = "none";
  tipBtns.forEach((btn) => btn.classList.remove("active"));
  customPercent.value = "";
};

// Adding Event Listeners to the tip buttons
tipBtns.forEach((tipBtn) => {
  tipBtn.addEventListener("click", function () {
    getBtnValue(tipBtn.value);
    error();
    tipBtns.forEach((btn) => btn.classList.remove("active"));
    tipBtn.classList.add("active");
  });
});

// Adding Event listener to the Custom tip input
customPercent.addEventListener("input", function () {
  getBtnValue(this.value);
  error();
  tipBtns.forEach((btn) => btn.classList.remove("active"));
});

// Adding Event listner for the reset button
resetBtn.addEventListener("click", resetTip);
