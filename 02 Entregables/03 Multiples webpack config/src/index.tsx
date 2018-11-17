import * as React from 'react';
import {render} from 'react-dom';
import {GrettingsComponent} from './components/grettingsComponent';

const myName:string = 'José Antonio Cañizares';

render(
    <GrettingsComponent message={myName}/>,
    document.getElementById('root')
);
