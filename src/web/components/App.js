import React, {Component} from 'react';
import {Router, browserHistory} from 'react-router';

import Login from './Login';
import Search from './Search';
import Import from './Import';


export default class App extends Component {
    getRoutes () {
        return {
            path: '/',
            component: Search,
            childRoutes: [
                {
                    path: 'login',
                    component: Login
                },
                {
                    path: 'import',
                    component: Import
                }
            ]
        };
    };
    
    render() {
        let routes = this.getRoutes();
        
        return (
            <Router routes={routes} history={browserHistory} />
        );
    }
}