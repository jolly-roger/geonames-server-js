import React, {Component} from 'react';
import {Router, browserHistory} from 'react-router';

import Login from './Login';
import Search from './Search';
import Import from './Import';


export default class App extends Component {
    constructor() {
        super();
        
        this.state = {
            isLogedin: false
        };
        
        this.onLoggedin = this.onLoggedin.bind(this);
        
        this.onLoggedinListener = document.addEventListener('user.loggedin', this.onLoggedin);
    }
    
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
    
    onLoggedin() {
        this.setState({isLogedin: true});
    }
    
    componentWillUnmount() {
        document.removeEventListener(this.onLoggedin);
    }
    
    render() {
        let routes = this.getRoutes();
        
        return (
            <Router routes={routes} history={browserHistory} />
        );
    }
}