import {symbols, convert, latest } from './api.js';

const dropdownClickButtonin = document.getElementById('dropdownClickButtonin');
const dropdownClickMenuin = document.getElementById('dropdownClickin');

const dropdownClickButtonout = document.getElementById('dropdownClickButtonout');
const dropdownClickMenuout = document.getElementById('dropdownClickout');

const ConvertButton = document.getElementById('botconvertir');

const Converciontext = document.getElementById("cantidad_out");

const thead = document.getElementById("thead");
const tb = document.getElementById("tbody");

var monin, monout;
const options = [];


let taskStorage = JSON.parse(
    window.localStorage.getItem("taskStorage") || "[]"
);

// se revisa el locale storage para saber obtener los datos de las monedas y si no hay se genera un nuevo llamado a la api

if (taskStorage.length === 0){
    var symbolsResult = await symbols();
    window.localStorage.setItem("taskStorage",  JSON.stringify(symbolsResult));

    for (var key in symbolsResult) {
        if (symbolsResult.hasOwnProperty(key)) {
            var value = symbolsResult[key];
            options.push({label:  key.toString()+ " - "+value.toString(), url: '#', value: key })
        }
    }
}else{
    for (var key in taskStorage) {
        if (taskStorage.hasOwnProperty(key)) {
            var value = taskStorage[key];
            options.push({label:  key.toString()+ " - "+value.toString(), url: '#', value: key })
        }
    }
}


// se llaman las funciones para añadir los menus a los botones 
addMenuOptionsin(options);
addMenuOptionsout(options);

// se genera el menu de los botones

function addMenuOptionsin(options) {
    const ul = document.createElement('ul');
    
    ul.classList.add('py-2', 'text-sm', 'text-gray-700', 'dark:text-gray-200');
    ul.setAttribute('aria-labelledby' , '"dropdownClickButton"');
    
    options.forEach(option => {
        const link = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = option.url;
        a.innerText = option.label;
        
        a.classList.add('block' ,'px-4' ,'py-2' ,'hover:bg-gray-100', 'dark:hover:bg-gray-600' ,'dark:hover:text-white','text-white' );
        a.setAttribute("data", option.value)

        link.appendChild(a)
        ul.appendChild(link);

        dropdownClickMenuin.appendChild(ul);
    });
}


function addMenuOptionsout(options) {
    const ul = document.createElement('ul');
    
    ul.classList.add('py-2', 'text-sm', 'text-gray-700', 'text-gray-200');
    ul.setAttribute('aria-labelledby' , '"dropdownClickButton"');
    
    options.forEach(option => {
        const link = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = option.url;
        a.innerText = option.label;
        
        a.classList.add('block' ,'px-4' ,'py-2' ,'hover:bg-gray-100', 'hover:bg-gray-600' ,'hover:text-white','text-white' );
        a.setAttribute("data", option.value)

        link.appendChild(a)
        ul.appendChild(link);

        dropdownClickMenuout.appendChild(ul);
    });
}

// funcion para hacer el llamado de conversion a la api

async function con(){
    const val = document.getElementById("cantidad_input").value
    const result = await convert(monout, monin, val);
    Converciontext.setAttribute("value", result);
    console.log(result)
}


// se añaden eventos a los botones

dropdownClickButtonin.addEventListener('click', () => {
    dropdownClickMenuin.classList.toggle('hidden');
});

dropdownClickButtonout.addEventListener('click', () => {
    dropdownClickMenuout.classList.toggle('hidden');
});

ConvertButton.addEventListener('click', () => con());


// se da un valor a la moneda seleccionada en la lista
document.querySelectorAll('#dropdownClickin a').forEach(a => {
    a.addEventListener('click', event => {
        event.preventDefault();
        const value = event.target.getAttribute('data');
        dropdownClickButtonin.innerHTML =`${a.innerHTML}`
        dropdownClickMenuin.classList.toggle('hidden');
        monin = value;
    });
});

document.querySelectorAll('#dropdownClickout a').forEach(a => {
    a.addEventListener('click', event => {
        event.preventDefault();
        const value = event.target.getAttribute('data');
        dropdownClickButtonout.innerHTML =`${a.innerHTML}`
        dropdownClickMenuout.classList.toggle('hidden');
        monout = value;
    });
});


// se hace llamado a la funcion que genera la tabla de cconversion
await Tablaconver();

async function Tablaconver() {
    const randomElements = [];

    // se eligen 4 monedas aleatorios para comparar y se añaden a las columnas
    while (randomElements.length < 4) {
        var ind = Math.floor(Math.random() * options.length);
        var randsym = options[ind].value;
        if (randomElements.indexOf(randsym) === -1) {

            randomElements.push(randsym);
            
            const th = document.createElement("th");

            th.classList.add("px-6", "py-3");
            th.setAttribute("scope", "col");

            th.innerHTML = randsym;
            thead.appendChild(th);
            
        }
    }

    // se añaden los mismos elementos como filas y se alterna el color de la tabla 
    for (let index = 0; index < randomElements.length; index++) {
        const tr  = document.createElement("tr");
        const th = document.createElement("th");
        const element = randomElements[index];

        if(index % 2 == 0){
            tr.classList.add("border-b", "bg-[#7C4DFF]", "border-gray-700")
        }else{
            tr.classList.add("border-b", "bg-[#512DA8]", "border-gray-700")
        }

        th.classList.add("px-6", "py-4", "font-medium", "text-gray-900", "whitespace-nowrap", "text-white");
        th.setAttribute("scope", "row");
        th.innerHTML = element;
            
        
        tr.appendChild(th);

        var s =  randomElements.join(",")
        var rat  = await latest(s, randomElements[index]);
        for (let key in rat){
            const td = document.createElement("td");
            td.classList.add("px-6", "py-3", "text-white");
            td.innerHTML = rat[key];
            tr.appendChild(td);
            tb.appendChild(tr);
        }        
    }
    
}

