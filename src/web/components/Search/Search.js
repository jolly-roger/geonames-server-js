import React, {Component} from 'react';
import {Link} from 'react-router'


export default class Search extends Component {
    render() {
        return (
            <div>
                <Link to="/login" >Login</Link>
                {this.props.children}
            </div>
        );
    }
}