"use strict";

// Funciones de getItem
const getSearchData = () =>{
    let data = JSON.parse(localStorage.getItem('input-data'));
    return data
}
const getOutbound = () => {
    const storageFrom = getSearchData()["input-from"];
    const outbound = cities.find((city) => city.city == storageFrom);
    return outbound;
}
const getInbound = () => {
    const storageTo = getSearchData()["input-to"];
    const inbound = cities.find((city) => city.city == storageTo);
    return inbound;
}

const getDepart = () => {
    const tripDepart = getSearchData()["input-depart"];
    return tripDepart;
}

const getReturn = () => {
    const tripReturn = getSearchData()["input-return"];
    return tripReturn;
}

const getAdults = () => {
    const tripAdults = getSearchData()["input-adults"];
    return tripAdults;
}

// Funciones generales

const getDistance = () => {
    let x1, y1, x2, y2;
    x1 = getOutbound().coordX;
    y1 = getOutbound().coordY;
    x2 = getInbound().coordX;
    y2 = getInbound().coordY;
    const distance = Math.hypot(x2 - x1, y2 - y1);
    return distance;
}

const getDuration = () => {
    const duration = parseInt(getDistance() * 10 / 5) * 5;
    return duration;
}

const getStringCost = () => {
    let cost = getDistance() * 750;
    let stringCost = `$${(cost).toFixed(2)}`;
    return stringCost;
}

const getStringDuration = () => {
    const hours = Math.floor(getDuration() / 60);
    const minutes = (Math.round(getDuration() % 60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const stringDuration = `${hours}:${minutes}h`;
    return stringDuration;
}

// FORMATEANDO FECHAS CON MOMENT JS
const getStringDepart = () => {
    const stringDepart = moment(getDepart()).format("DD MMM, YYYY"); 
    return stringDepart
};

const getStringReturn = () => {
    const stringReturn = moment(getReturn()).format("DD MMM, YYYY"); 
    return stringReturn
};

/* METODO ANTERIOR SIN USAR MOMENT JS

const getStringDepart = () => {
    const departArray = getDepart().split("-");
    const departDay = departArray[2];
    const departMonth = departArray[1];
    const departYear = departArray[0];
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const stringDepart = `${departDay} ${months[Number(departMonth) - 1]}, ${departYear}`;
    return stringDepart
}

const getStringReturn = () => {
    const returnArray = getReturn().split("-");
    const returnDay = returnArray[2];
    const returnMonth = returnArray[1];
    const returnYear = returnArray[0];
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const stringReturn = `${returnDay} ${months[Number(returnMonth) - 1]}, ${returnYear}`;
    return stringReturn
};
*/
const getTimeOutbound = () => {
    // Experimental (sin completar)
    const outboundTimes = ['8:00']; 
    const timeOutbound = outboundTimes[(Math.random() * outboundTimes.length) | 0]
    return timeOutbound;
}

const getTimeInbound = () => {
    const durationHours = Math.floor(getDuration() / 60);
    const durationMinutes = (Math.round(getDuration() % 60));
    const outboundTime = getTimeOutbound().split(":");
    const outboundHour = parseInt(outboundTime[0]);
    const outboundMinutes = parseInt(outboundTime[1]);
    const inboundHour = +outboundHour + +durationHours;
    const inboundMinutes = (+outboundMinutes + +durationMinutes).toLocaleString('es-US', {minimumIntegerDigits: 2, useGrouping: false});
    const timeInbound = `${inboundHour}:${inboundMinutes}`;
    return timeInbound;
}

// Display de Resultados

const displayDepart = () => {
    let departCard = "";
    departCard.innerHTML = `<div class="result-wrapper">
    <div class="result-main">
        <div class="result-top">
            <div class="top-outbound top-bound">
                <span>DESDE</span>
                <span class="material-symbols-outlined">
                    flight_takeoff
                    </span>
            </div>
            <div class="top-center">
                <hr>
                <span id="span-duration">
                </span>
                <hr>
            </div>
            <div class="top-inbound top-bound">
                <span class="material-symbols-outlined">
                    flight_land
                    </span>
                <span>HASTA</span>
            </div>
        </div>
        <div class="result-body">
            <div class="result-bound">
                <div class="result-city">
                    <span id="span-citycode-outbound" class="span-citycode"></span>
                    <span id="span-city-outbound" class="span-city"></span>
                    <span id="span-airport-outbound" class="span-airport"></span>
                </div>
                <div class="result-time">
                    <span id="date-time-outbound" class="span-time"></span>
                    <span id="date-full-outbound" class="span-date"></span>
                </div>
            </div>
            <div class="result-center"></div>
            <div class="result-bound">
                <div class="result-city result-city-inbound">
                    <span id="span-citycode-inbound" class="span-citycode"></span>
                    <span id="span-city-inbound" class="span-city"></span>
                    <span id="span-airport-inbound" class="span-airport"></span>
                </div>
                <div class="result-time result-time-inbound">
                    <span id="date-time-inbound" class="span-time"></span>
                    <span id="date-full-inbound" class="span-date"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="result-side">
        <div class="side-flight">
            <div class="flight-logo">
                <span class="material-symbols-outlined">
                    flight
                    </span>
            </div>
            <div class="flight-info">
                <span class="flight-title">FLIGHT NUMBER</span>
                <span id="span-flight" class="flight-number">AR5227</span>
            </div>
        </div>
        <div class="side-price">
            <span class="price-title">Precio por pasajero</span>
            <span id="span-price" class="price-value"></span>
        </div>
    </div>
</div>` 
};

const displayReturn = () => {
    
};

document.getElementById('span-citycode-outbound').innerHTML = getOutbound().codeIATA;
document.getElementById('span-city-outbound').innerHTML = getOutbound().city;
document.getElementById('span-airport-outbound').innerHTML = getOutbound().aeroName;
document.getElementById('span-citycode-inbound').innerHTML = getInbound().codeIATA;
document.getElementById('span-city-inbound').innerHTML = getInbound().city;
document.getElementById('span-airport-inbound').innerHTML = getInbound().aeroName;
document.getElementById('date-time-outbound').innerHTML = getTimeOutbound();
document.getElementById('date-time-inbound').innerHTML = getTimeInbound();
document.getElementById('date-full-outbound').innerHTML = getStringDepart();
document.getElementById('date-full-inbound').innerHTML = getStringDepart();
document.getElementById('span-duration').innerHTML = getStringDuration();
document.getElementById('span-price').innerHTML = getStringCost();

let duplicate = () => {
    for (let i = 1; i < getAdults(); i++){
        const parent = document.getElementById('pas-info-1');
        const cloned = parent.cloneNode(true);
        const newPas = document.createElement('div');
        Array.from(cloned.children).forEach(node => {
            if (node.tagName == "DIV"){
                node.querySelector(".pas-head-title").innerHTML = `Pasajero ${i+1}`
            }
            let clone = node.cloneNode(true);
            clone.id = `${clone.id.slice(0, -1)}${i+1}`;
            newPas.appendChild(clone);
            newPas.id = `pas-info-${i+1}`
            newPas.classList.add('pas-info');
            document.getElementById('comp_pasInfo').appendChild(newPas)
        })
        
    }
}

duplicate();

let pasForms = () => {
    for (let i = 1; i <= getAdults(); i++){
        let form = document.getElementById(`pas-form-${i}`);
        form.onsubmit = (form) => {
            form.preventDefault();
            const formData = new FormData(form.target).entries();
            const data = Object.fromEntries(formData);
            localStorage.setItem(`pas-${i}`, JSON.stringify(data));
            document.getElementById(`pas-head-${i}`).querySelector(".pas-head-name").innerHTML = `${data["pas-nam"]} ${data["pas-sur"]}`
        }
    }
}
pasForms();

document.getElementById('submit-pas').addEventListener("click", () => {
    window.location.href = "seats.html";
})


