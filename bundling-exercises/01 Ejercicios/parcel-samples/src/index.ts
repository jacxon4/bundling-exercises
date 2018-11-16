import './mystyles.scss';
const logoImg = require('./content/logo_1.png'); // Al importar imagen, directamente se puede usar

const variable = "Ouu yeah";
console.log(`Parcel usando ES6 --> ${variable}`);


let sampleNumber: number = null;
sampleNumber = 1;
console.log(`Usando typado para pintar un ${sampleNumber}`);

const img = document.createElement('img');
img.src = logoImg;
document.getElementById('imgContainer').appendChild(img);