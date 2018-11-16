import {getAvg} from './averageService';
const logoImg = require('./content/logo_1.png'); // Al user TS las imagenes se cargan con require
// Let's use some ES6 features

$('body').css('background-color','lighSkyBlue');

const scores= [90, 75, 60, 99, 94, 30]; 
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;
document.write(messageToDisplay);


const img = document.createElement('img');
img.src = logoImg;

document.getElementById('imgContainer').appendChild(img);