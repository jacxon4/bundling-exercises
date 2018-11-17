import * as React from 'react';
import {render} from 'react-dom';
import {GretingsComponent} from './components/grettingsComponent';

const myName:string = 'José Antonio Cañizares';

render(
    <GretingsComponent message={myName}/>,
    document.getElementById('root')
);
