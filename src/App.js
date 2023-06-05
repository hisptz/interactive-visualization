import React from 'react'
import classes from './App.module.css';
import {Routing} from "./pages/Routing";
import 'intro.js/introjs.css';
import { useDataQuery } from '@dhis2/app-runtime';


const MyApp = () => (
    <div className={classes.container}>
        
        <Routing/>
     </div>
)


export default MyApp
