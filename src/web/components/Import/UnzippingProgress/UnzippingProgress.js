import React, {Component} from 'react';
import io from 'socket.io-client';


export default class UnzippingProgress extends Component {
    constructor() {
        super();
        
        fetch('/api/import/get-unzip-status')
        .then((data) => data.json())
        .then((unzipStatus) => {
            this.setState(unzipStatus);
        });
        
        let socket = io.connect('http://localhost:3000');
        
        socket.on('unzip-progress', (msg) => {
            this.setState(msg);
        });
    }
    
    getUnzipStatusView() {
        if (this.state) {
            return Object.keys(this.state).map((fileId) => {
                return (
                    <div id={fileId} className="row">
                        <div className="medium-2 columns">
                            {this.state[fileId].fileName}:
                        </div>
                        <div className="medium-2 columns">
                            <progress max="100" value={this.state[fileId].progress}></progress>
                        </div>
                        <div className="columns">
                            {this.state[fileId].progress}%
                        </div>
                    </div>
                );
            });
        } else {
            return false;
        }
    }
    
    render() {
        return (
            <div ref="downloadingFiles">
                {this.getUnzipStatusView()}
            </div>
        );
    }
}