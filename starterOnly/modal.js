//Change the navigation bar when the screen is too small
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
  const form = document.querySelector("form");
  //Reset the form if it has been submitted
  if (form.getAttribute("data-submitted") == "true") {
    form.reset();
    form.setAttribute("data-submitted", "false");
    //Hide success modal
    const successModal = document.querySelector(".modal-success");
    successModal.style.display = "none";
  }
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
  event.preventDefault();
  if (validate(event)) {
    openSuccessModal();
  }
});


//Display the success modal
function openSuccessModal() {
  const successModal = document.querySelector(".modal-success");
  successModal.style.display = "block";
  //Set submitted attribute of form to true
  const form = document.querySelector("form");
  form.setAttribute("data-submitted", "true");
}
  

//Validate the form
function validate(e) {

  e.preventDefault();

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
  const nameRegex = /^[a-zA-Zéèàùç'-]{2,}$/;
  if (!nameRegex.test(firstNameInput.value.trim())) {
    errors.push({input: firstNameInput});
  } else {
    hideError(firstNameInput);
  }
  if (!nameRegex.test(lastNameInput.value.trim())) {
    errors.push({input: lastNameInput});
  } else {
    hideError(lastNameInput);
  }

  // Check email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    errors.push({input: emailInput});
  } else {
    hideError(emailInput);
  }

  //Check birthdate (not older than 125 years old)
  const age = new Date().getFullYear() - new Date(birthdateInput.value).getFullYear();
  if (age > 125 || age < 18 || isNaN(age)) {
    errors.push({input: birthdateInput});
  } else {
    hideError(birthdateInput);
  }

  // Check number of tournaments
  const quantityRegex = /^[1-9]\d*$/;  
  if (!quantityRegex.test(quantityInput.value.trim())) {
    errors.push({input: quantityInput});
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
    errors.push({input: locationInputs[0]});
  } else {
    hideError(locationInputs[0]);
  }

  // Check conditions are accepted
  if (!conditionsInput.checked) {
    errors.push({input: conditionsInput});
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
  // If there are no errors, submit the form via AJAX to a mock server.
  else {

  //Display the success modal
  openSuccessModal();

  //Send data in JSON format to a fake API via fetch, for testing.
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      birthdate: birthdateInput.value,
      quantity: quantityInput.value,
      location: document.querySelector('input[name="location"]:checked').value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de l'envoi des données du formulaire.");
      }
    })
    .then(function(data) {
      console.log("Données reçues:", data);
    })
    .catch(function(error) {
      console.log("Erreur:", error);
    });
  }
}

//Hide or show the error message.
function showError(input) {
  const formControl = input.parentElement;
  formControl.setAttribute("data-error-visible", "true");
}
function hideError(input) {
  const formControl = input.parentElement;
  formControl.setAttribute("data-error-visible", "false");
}