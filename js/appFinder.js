"use strict";

/* ----- VARIABLES SYNC Y ASYNC----- */
// Fetch de archivo JSON
const cityJson = async () => {
    const resp = await fetch('js/cities.json');
    const data = await resp.json();
    return data;
};
// Array nombre de ciudades
const cityList = async () => {
    const data = await cityJson();
    const listCities = [];
    data.forEach((destination) => {
      listCities.push(destination.city)
    });
    return listCities;
};
// Variables input del usuario
let inputFrom = document.getElementById("input-from");
let inputTo = document.getElementById("input-to");
let inputDepart = document.getElementById("input-depart");
let inputReturn = document.getElementById("input-return");
let inputAdults = document.getElementById("input-adults");
let inputChildren = document.getElementById("input-children");

/* ----- SETEO DE FORMULARIO ----- */

// Seteo de parametros del buscador

const setList = async () => {
  const data = await cityList();
  data.forEach((city) => {
    const listFrom = document.getElementById("list-from");
    const listTo = document.getElementById("list-to");
    let option = document.createElement("option");
    option.value = city;
    listFrom.appendChild(option);
    listTo.appendChild(option.cloneNode());
  });
};

const setCalendarDates = () => {
  const today = new Date().toISOString().split("T")[0];
  inputDepart.value = today;
  inputDepart.setAttribute("min", today);
  inputReturn.setAttribute("min", today);
  document.getElementById("input-depart").addEventListener("change", () => {
    inputReturn.setAttribute("min", inputDepart.value);
    if (
      inputDepart.value > inputReturn.value &&
      document.getElementById("radio-return").checked == true
    ) {
      inputReturn.value = inputDepart.value;
    }
  });
};

const setCalendarError = () => {
  inputDepart.oninvalid = (input) => {
    inputDepart.setCustomValidity(
      "La fecha de partida debe ser igual o mayor a hoy"
    );
  };
  inputReturn.oninvalid = (input) => {
    inputReturn.setCustomValidity(
      "La fecha de regreso debe ser igual o mayor a la partida"
    );
  };
};

const defaultForm = () => {
  setList();
  setCalendarDates();
  setCalendarError();
};

/* ----- ERRORES ----- */

// Funciones error para el DOM
const errorFrom = () => {
  document.getElementById("error-from").classList.add("error-label-active");
  document
    .getElementById("input-area-from")
    .classList.add("error-input-active");
};
const errorTo = () => {
  document.getElementById("error-to").classList.add("error-label-active");
  document.getElementById("input-area-to").classList.add("error-input-active");
};
const errorDepart = () => {
  document.getElementById("error-depart").classList.add("error-label-active");
  document
    .getElementById("input-area-depart")
    .classList.add("error-input-active");
};
const errorReturn = () => {
  document.getElementById("error-return").classList.add("error-label-active");
  document
    .getElementById("input-area-return")
    .classList.add("error-input-active");
};

// Función reset de errores
const resetErrors = () => {
  document
    .querySelectorAll(".error-label")
    .forEach((element) => element.classList.remove("error-label-active"));
  document
    .querySelectorAll(".input-area")
    .forEach((element) => element.classList.remove("error-input-active"));
};

/* ----- VALIDACIÓN ----- */

// Funciones de validación
const validateInputFrom = async () => {
  const listCities = await cityList()
  let indexFrom = listCities.indexOf(inputFrom.value);
  if (inputFrom.value == "" || indexFrom === -1) {
    errorFrom();
    return true;
  }
};
const validateInputTo = async () => {
  const listCities = await cityList()
  let indexTo = listCities.indexOf(inputTo.value);
  if (inputTo.value == "" || indexTo === -1) {
    errorTo();
    return true;
  }
};
const validateInputDepart = () => {
  if (inputDepart.value == "") {
    errorDepart();
    return true;
  }
};
const validateInputReturn = () => {
  if (
    document.getElementById("radio-return").checked == true &&
    inputReturn.value == ""
  ) {
    errorReturn();
    return true;
  }
};

/* ----- GUARDADO DE INPUT EN localStorage ----- */

const displayResults = () => {
  localStorage.clear();
  const form = Object.fromEntries(
    new FormData(document.getElementById("form-searchFlight"))
  );
  localStorage.setItem("input-data", JSON.stringify(form));
  window.location.href = "search/flights.html";
};

const validateForm = async () => {
  // Variables con funciones de validación
  const validateFrom = await validateInputFrom();
  const validateTo = await validateInputTo();
  const validateDepart = validateInputDepart();
  const validateReturn = validateInputReturn();
  /*** OPERADOR AND ***/
  // Operador AND Para Validar
  !validateFrom && !validateTo && !validateDepart && !validateReturn == true && displayResults();
};

/* ----- RESET ----- */

// Reseteo de formulario
const resetForm = () => {
  document.getElementById("form-searchFlight").reset();
  defaultForm();
};

// Reset de errores mediante eventos

inputDepart.onchange = () => {
  inputDepart.setCustomValidity("");
};

inputReturn.onchange = () => {
  inputReturn.setCustomValidity("");
};

document.getElementById("input-from").addEventListener("input", () => {
  document.getElementById("error-from").classList.remove("error-label-active");
  document
    .getElementById("input-area-from")
    .classList.remove("error-input-active");
});

document.getElementById("input-to").addEventListener("input", () => {
  document.getElementById("error-to").classList.remove("error-label-active");
  document
    .getElementById("input-area-to")
    .classList.remove("error-input-active");
});

document.getElementById("input-depart").addEventListener("focus", () => {
  document
    .getElementById("error-depart")
    .classList.remove("error-label-active");
  document
    .getElementById("input-area-depart")
    .classList.remove("error-input-active");
});

document.getElementById("input-return").addEventListener("focus", () => {
  document
    .getElementById("error-return")
    .classList.remove("error-label-active");
  document
    .getElementById("input-area-return")
    .classList.remove("error-input-active");
});

/* ----- EVENTOS ----- */

// Eventos de onclick
document.getElementById("radio-oneway").addEventListener("click", () => {
  document.getElementById("input-return").disabled = true;
  document.getElementById("input-return").value = "";
  document
    .getElementById("error-return")
    .classList.remove("error-label-active");
});

document.getElementById("radio-return").addEventListener("click", () => {
  document.getElementById("input-return").disabled = false;
});

// Evento de Submit
document
  .getElementById("form-searchFlight")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    resetErrors();
    validateForm();
  });

/* ----- CALLS DE INICIO ----- */

localStorage.clear();
defaultForm();
