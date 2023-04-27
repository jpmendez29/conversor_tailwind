import {symbols} from './api.js';

const dropdownClickButton = document.getElementById('dropdownClickButton');
const dropdownClickMenu = document.getElementById('dropdownClick');
var symbolsResult = null;
var i = 0;

let taskStorage = JSON.parse(
    window.localStorage.getItem("taskStorage") || "[]"
);

if (taskStorage.length === 0){
    symbolsResult = await symbols();
    window.localStorage.setItem("taskStorage",  JSON.stringify(symbolsResult));
    console.log(symbolsResult);

}


console.log("________________________________________-");
console.log(taskStorage);





const options = [
    { label: 'Opción 1', url: '#' },
    { label: 'Opción 2', url: '#' },
    { label: 'Opción 3', url: '#' },
    { label: 'Opción 3', url: '#' },
    { label: 'Opción 3', url: '#' },
    { label: 'Opción 3', url: '#' },
    { label: 'Opción 1', url: '#' },
    { label: 'Opción 2', url: '#' },
    { label: 'Opción 3', url: '#' },
    { label: 'Opción 3', url: '#' },
    { label: 'Opción 3', url: '#' }
];

addMenuOptions(options);

dropdownClickButton.addEventListener('click', () => {
    dropdownClickMenu.classList.toggle('hidden');
});

function addMenuOptions(options) {
    const dropdownClickMenu = document.getElementById('dropdownClick');
    const ul = document.createElement('ul');
    
    ul.classList.add('py-2', 'text-sm', 'text-gray-700', 'dark:text-gray-200','max-h-[200px]','overflow-auto');
    ul.setAttribute('aria-labelledby' , '"dropdownClickButton"');
    
    options.forEach(option => {
        const link = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = option.url;
        a.innerText = option.label;
        a.classList.add('block' ,'px-4' ,'py-2' ,'hover:bg-gray-100', 'dark:hover:bg-gray-600' ,'dark:hover:text-white');
        link.appendChild(a)
        ul.appendChild(link);
        dropdownClickMenu.appendChild(ul);
    });
}



