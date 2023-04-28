var myHeaders = new Headers();
myHeaders.append("apikey", "kMREEBZNFVwiG7IozNxjpmn8ZIk53Pzw");

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};


export async function convert(to, from, amount) {
    try {
        const response = await fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions);
        const result = await response.json();
        return result.result;
    } catch (error) {
        console.log('error', error);
    }
}


export async function symbols() {
    try {
        const response = await fetch("https://api.apilayer.com/fixer/symbols", requestOptions);
        const result = await response.json();
        return result.symbols;
    } catch (error) {
        console.log('error', error);
    }
}

export function ratio(symbols,base){
    fetch("https://api.apilayer.com/fixer/latest?symbols=${symbols}&base=${base}", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
