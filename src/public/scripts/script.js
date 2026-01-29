// Script for handling backward and forward cache

window.addEventListener("pageshow", (event) => {
  const isbackward_forward =
    performance.getEntriesByType("navigation")[0].type === "back_forward";

    console.log('cache type : ',performance.getEntriesByType("navigation")[0].type,"---- :",isbackward_forward);
    
  if (event.persisted || isbackward_forward) {
    console.log("event status : ",event.persisted);
    
    window.location.reload();
  }
});
// Script for handling backward and forward cache

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cnfPassword = document.getElementById("confirmPassword");
const form = document.getElementById("signUp-form");

const pShow = document.getElementById("pShow");
const pHide = document.getElementById("pHide");
const cpShow = document.getElementById("cpShow");
const cpHide = document.getElementById("cpHide");
const pIcon = document.getElementById("pIcon");
const cpIcon = document.getElementById("cpIcon");

//errors start
let errMsg = document.getElementById("errMsg");
//errors end

const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

pIcon.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }

  pShow.classList.toggle("show");
  pShow.classList.toggle("hide");

  pHide.classList.toggle("hide");
  pHide.classList.toggle("show");
});

cpIcon.addEventListener("click", () => {
  if (cnfPassword.type === "password") {
    cnfPassword.type = "text";
  } else {
    cnfPassword.type = "password";
  }
  cpShow.classList.toggle("show");
  cpShow.classList.toggle("hide");

  cpHide.classList.toggle("hide");
  cpHide.classList.toggle("show");
});

//name validation
function validateName() {
  name_text = username.value.trim();
  if (name_text === "") {
    errMsg.innerText = "Name is mandatory!";
    return false;
  }
  if (!nameRegex.test(name_text)) {
    errMsg.innerText = "Username is only allowded with  alphabets and spaces!";
    return false;
  }
  errMsg.innerText = "";
  return true;
}

//email validation
function validateEmail() {
  email_text = email.value.trim();

  if (email_text === "") {
    errMsg.innerText = "E-mail is mandatory !";
    return false;
  }
  if (!emailRegex.test(email_text)) {
    errMsg.innerText = "Please enter a valid email id !";
    return false;
  }
  errMsg.innerText = "";
  return true;
}

//password  validation
function validatePassword() {
  pass_text = password.value.trim();

  if (pass_text === "") {
    errMsg.innerText = "Password is mandatory !";
    return false;
  }
  if (!passRegex.test(pass_text)) {
    errMsg.innerText =
      "Password Criteria : Atleast 1 Capital and Small letter, 1 digit , 1 symbol , minimum 8 characters !";
    return false;
  }
  errMsg.innerText = "";
  return true;
}

// Confirm password

function confirmPassword() {
  let cnf_pass = cnfPassword.value.trim();
  pass_text = password.value.trim();
  if (cnf_pass === "") {
    errMsg.innerText = "Password is mandatory !";
    return false;
  }
  if (cnf_pass != pass_text) {
    errMsg.innerText = "Password doesn't match";
    return false;
  }
  errMsg.innerText = "";
  return true;
}

//Validating on blur input
username.addEventListener("blur", validateName);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
cnfPassword.addEventListener("blur", confirmPassword);

//preventing submission without proper data
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValid =
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    confirmPassword();

  if (!isValid) {
    return;
  }

  form.submit();
});
