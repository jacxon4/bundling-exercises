import * as React from 'react';

const image = require('../content/careto.jpeg');


interface GrettingsComponent {
    message: string;
}

export const GrettingsComponent = ({message}: GrettingsComponent) => (
    <div>
        <img src={image}/>
        <h2>Welcome to the assessment demo page of {message} student</h2>
    </div>
);