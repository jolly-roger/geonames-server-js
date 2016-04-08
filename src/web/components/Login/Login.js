import React, {Component} from 'react';


export default class Login extends Component {
    render() {
        return (
            <div>
                User:<input type="text" />
                <br />
                Password:<input type="password" />
                <br />
                <input type="submit" />
            </div>
        );
    }
}