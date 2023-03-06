function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//close modal form when clicking on the "x" button. Class "close" is used for the "x" button
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

//close modal form when clicking outside of the form
window.addEventListener("click", function (event) {
  if (event.target == modalbg) {
    closeModal();
  }
});

//Send form if conditions are met. Class "btn-submit" is used for the submit button
const submitBtn = document.querySelector(".btn-submit");
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();//
  if (validate()) {
    //Submit the form after success message is sent
    openSuccessModal();
  }
});


//Open the success modal, and submit the form after 2 seconds
function openSuccessModal() {
  const successModal = document.querySelector(".success-message");
  successModal.style.display = "block";
  setTimeout(submitForm, 2000);
}

//Submit the form
function submitForm() {
  document.forms["reserve"].submit();
}

//Validate the form
function validate() {
  // Get input values
  const firstNameInput = document.getElementById("first");
  const lastNameInput = document.getElementById("last");
  const emailInput = document.getElementById("email");
  const birthdateInput = document.getElementById("birthdate");
  const quantityInput = document.getElementById("quantity");
  const locationInputs = document.querySelectorAll('input[name="location"]');
  const conditionsInput = document.getElementById("checkbox1");

  // Create an array to store errors
  const errors = [];

  // Check first and last name
  const nameRegex = /^[a-zA-Z]{2,}$/;
  if (!nameRegex.test(firstNameInput.value.trim())) {
    errors.push({input: firstNameInput, message: "Veuillez entrer un prénom valide (au moins 2 lettres)."});
  } else {
    hideError(firstNameInput);
  }
  if (!nameRegex.test(lastNameInput.value.trim())) {
    errors.push({input: lastNameInput, message: "Veuillez entrer un nom valide (au moins 2 lettres)."});
  } else {
    hideError(lastNameInput);
  }

  // Check email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    errors.push({input: emailInput, message: "Veuillez entrer une adresse email valide."});
  } else {
    hideError(emailInput);
  }

  // Check birthdate
  const birthdate = new Date(birthdateInput.value);
  if (isNaN(birthdate.getTime()) || birthdate >= new Date()) {
    errors.push({input: birthdateInput, message: "Veuillez entrer une date de naissance valide."});
  } else {
    hideError(birthdateInput);
  }

  // Check number of tournaments
  const quantityRegex = /^[1-9]\d*$/;
  if (!quantityRegex.test(quantityInput.value.trim())) {
    errors.push({input: quantityInput, message: "Veuillez entrer un nombre de tournois valide."});
  } else {
    hideError(quantityInput);
  }

  // Check at least one location is selected
  let locationChecked = false;
  locationInputs.forEach((locationInput) => {
    if (locationInput.checked) {
      locationChecked = true;
    }
  });
  if (!locationChecked) {
    errors.push({input: locationInputs[0], message: "Veuillez sélectionner au moins une ville."});
  } else {
    hideError(locationInputs[0]);
  }

  // Check conditions are accepted
  if (!conditionsInput.checked) {
    errors.push({input: conditionsInput, message: "Veuillez accepter les conditions d'utilisation."});
  } else {
    hideError(conditionsInput);
  }

  // If there are errors, display them and prevent form submission
  if (errors.length > 0) {
    errors.forEach((error) => {
      showError(error.input, error.message);
    });
    return false;
  }

  return true;
}

//Hide or show the error message.
function showError(input, message) {
  const formControl = input.parentElement;
  const errorText = formControl.querySelector(".error-text");
  errorText.innerText = message;
  formControl.classList.add("error");
}
function hideError(input) {
  const formControl = input.parentElement;
  formControl.querySelector(".error-text").innerText = "";
  formControl.classList.remove("error");
}