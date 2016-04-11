import React, {Component} from 'react';

import loginService from './loginService';


export default class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            pass: '',
            err: ''
        };
        
        this.userLoggedin = new Event('user.loggedin');
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const email = this.state.email.trim();
        const pass = this.state.pass.trim();
        
        if (!email || !pass) {
            this.setState({
                err: 'Email or password is empty'
            });
            
            return;
        }
        
        loginService.login(email, pass)
        .then((isLogedin) => {
            if (isLogedin) {
                this.setState({
                    email: '',
                    pass: '',
                    err: ''
                });
                
                const {location} = this.props;
                
                document.dispatchEvent(this.userLoggedin);
                
                if (location.state && location.state.nextPathname) {
                    this.context.router.replace(location.state.nextPathname);
                } else {
                    this.context.router.replace('/import');
                }
            } else {
                this.setState({
                    err: 'Email or password is incorrect'
                });
            }
        });
    }
    
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    
    handlePassChange(e) {
        this.setState({
            pass: e.target.value
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                User:<input type="text" value={this.state.email}
                    onChange={this.handleEmailChange} />
                <br />
                Password:<input type="password" value={this.state.pass}
                    onChange={this.handlePassChange} />
                <br />
                <input type="submit" className="button" />
                <div>{this.state.err}</div>
            </form>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.func.isRequired
};