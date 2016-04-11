import React, {Component} from 'react';
import {Link} from 'react-router'


export default class Search extends Component {
    constructor() {
        super();
        
        this.state = {
            isLogedin: false
        };
        
        this.onLoggedin = this.onLoggedin.bind(this);
        this.onLoggedout = this.onLoggedout.bind(this);
        
        this.onLoggedinListener = document.addEventListener('user.loggedin', this.onLoggedin);
    }
    
    onLoggedin() {
        this.setState({isLogedin: true});
    }
    
    onLoggedout() {
        this.setState({isLogedin: false});
    }
    
    getTopBarButtons() {
        if (this.props.location.pathname.toLowerCase().indexOf('login') > -1) {
            return false;
        } else {
            if (this.state.isLogedin) {
                return (<a href="#" onClick={this.onLoggedout}>Logout</a>);
            } else {
                return (<Link to="/login" >Login</Link>);
            }
        }
    }
    
    componentWillUnmount() {
        document.removeEventListener(this.onLoggedin);
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="top-bar medium-12 columns">
                        <div className="top-bar-title"><Link to="/">GeoNames Server JS</Link></div>
                        <div>
                            <div className="top-bar-left"></div>
                            <div className="top-bar-right">
                                {this.getTopBarButtons()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-12 columns">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}