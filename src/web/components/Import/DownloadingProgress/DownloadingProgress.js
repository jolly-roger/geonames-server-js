import React, {Component} from 'react';
import io from 'socket.io-client';
import {render} from 'react-dom';


export default class DownloadingProgress extends Component {
    constructor() {
        super();
        
        fetch('/api/import/get-data-status')
        .then((data) => data.json())
        .then((dataStatus) => {
            this.setState(dataStatus);
        });
        
        let socket = io.connect('http://localhost:3000');
        
        socket.on('download-progress', (msg) => {
            this.setState(msg);
        });
    }
    
    getDataStatusView() {
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
                {this.getDataStatusView()}
            </div>
        );
    }
}