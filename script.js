// Grab the HTML Elements in variables
const password = document.getElementById("password-display");
const copyBtn = document.getElementById("copy-btn");
const passwordLength = document.getElementById("length-slider");
const lengthDisplay = document.getElementById("length-val");
const generateBtn = document.getElementById("generate-btn");
//Grab the Checkboxes
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numberCheck = document.getElementById("numbers");
const symbolCheck = document.getElementById("symbols");
//Grab Progress ring
const progressRing = document.querySelector(".progress-ring");
const percentageValue = document.querySelector(".percentage-display");
// Character Pool Setup
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_-:<>?/.,';|=+`~";
// Live Slider Update function
passwordLength.addEventListener("input", (e) => {
  let sliderValue = e.target.value;
  lengthDisplay.innerHTML = `${sliderValue}`;
});
// The Generation Function
generateBtn.addEventListener("click", () => {
  let characterPool = "";
  if (uppercaseCheck.checked) {
    characterPool += uppercase;
  }
  if (lowercaseCheck.checked) {
    characterPool += lowercase;
  }
  if (numberCheck.checked) {
    characterPool += numbers;
  }
  if (symbolCheck.checked) {
    characterPool += symbols;
  }
  if (characterPool.length === 0) {
    alert("Please Select atleast One Character Type!");
    return;
  }
  let finalPassword = "";
  for (let i = 0; i < passwordLength.value; i++) {
    let randomIndex = Math.floor(Math.random() * characterPool.length);
    finalPassword += characterPool.charAt(randomIndex);
  }
  password.value = finalPassword;
  updateStrength(finalPassword);
});
//The DashBoard Upgrades
copyBtn.addEventListener("click", () => {
  if (password.value !== "") {
    navigator.clipboard.writeText(password.value).then(() => {
      copyBtn.innerHTML = "Copied!";
      copyBtn.style.background = "#00e676";
      copyBtn.style.fontWeight= 'bold';
      setTimeout(function () {
        copyBtn.innerHTML = "Copy";
        copyBtn.style.background =  "#3b465e";
      }, 2000);
    });
  }
});
// The Circular Strength Matric & Animation
function updateStrength(finalPassword) {
  let score = 20;
  if (finalPassword.length > 16) {
    score += 30;
  } else if (finalPassword.length > 12) {
    score += 20;
  }
  if (uppercaseCheck.checked) {
    score += 12.5;
  } else if (lowercaseCheck.checked) {
    score += 12.5;
  }
  if (numberCheck.checked) {
    score += 12.5;
  }
  if (symbolCheck.checked) {
    score += 12.5;
  }
  percentageValue.innerHTML = `${score}%`;
  let offset = 377 - (score / 100) * 377;
  progressRing.style.strokeDashoffset = offset;
  if (score < 40) {
    progressRing.style.stroke = "#ff4a4a";
  } else if (score >= 40 && score <= 75) {
    progressRing.style.stroke = "#ffb300";
  } else {
    progressRing.style.stroke = "#00e676";
  }
}
