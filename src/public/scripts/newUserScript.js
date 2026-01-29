// Script for handling backward and forward cache

window.addEventListener("pageshow", (event) => {
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type === 2)
  ) {
    window.location.reload();
  }
});
// Script for handling backward and forward cache

const errMsg = document.getElementById("addUserErr");
const err = document.getElementById("err");
const pShow = document.getElementById("pShow");
const pHide = document.getElementById("pHide");
const pIcon = document.getElementById("pIcon");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("new_user_form");

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

// errMsg.innerText = "ERORR"

//name validation
function validateName() {
  if (err) {
    err.innerText = "";
  }

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
  if (err) {
    err.innerText = "";
  }
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
  if (err) {
    err.innerText = "";
  }
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

//Validating on blur input
username.addEventListener("blur", validateName);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);

//preventing submission without proper data
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValid = validateName() && validateEmail() && validatePassword();

  if (!isValid) {
    return;
  }

  form.submit();
});
