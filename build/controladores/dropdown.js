import {symbols, convert } from './api.js';

const dropdownClickButtonin = document.getElementById('dropdownClickButtonin');
const dropdownClickMenuin = document.getElementById('dropdownClickin');

const dropdownClickButtonout = document.getElementById('dropdownClickButtonout');
const dropdownClickMenuout = document.getElementById('dropdownClickout');

const ConvertButton = document.getElementById('botconvertir');

const Converciontext = document.getElementById("cantidad_out");

var monin, monout;

const options = [];

let taskStorage = JSON.parse(
    window.localStorage.getItem("taskStorage") || "[]"
);

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



addMenuOptionsin(options);
addMenuOptionsout(options);


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

        dropdownClickMenuout.appendChild(ul);
    });
}

async function con(){
    const val = document.getElementById("cantidad_input").value
    const result = await convert(monout, monin, val);
    Converciontext.setAttribute("value", result);
    console.log(result)
}


dropdownClickButtonin.addEventListener('click', () => {
    dropdownClickMenuin.classList.toggle('hidden');
});

dropdownClickButtonout.addEventListener('click', () => {
    dropdownClickMenuout.classList.toggle('hidden');
});

ConvertButton.addEventListener('click', () => con());



document.querySelectorAll('#dropdownClickin a').forEach(a => {
    a.addEventListener('click', event => {
        event.preventDefault();
        const value = event.target.getAttribute('data');
        dropdownClickButtonin.innerHTML =`${a.innerHTML}`
        dropdownClickMenuin.classList.toggle('hidden');
        monin = value;
        console.log(`El valor seleccionado es: ${monin}`);
    });
});

document.querySelectorAll('#dropdownClickout a').forEach(a => {
    a.addEventListener('click', event => {
        event.preventDefault();
        const value = event.target.getAttribute('data');
        dropdownClickButtonout.innerHTML =`${a.innerHTML}`
        dropdownClickMenuout.classList.toggle('hidden');
        monout = value;
        console.log(`El valor seleccionado es: ${monout}`);
    });
});



