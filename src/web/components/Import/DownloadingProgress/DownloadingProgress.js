import React, {Component} from 'react';
import io from 'socket.io-client';
import {render} from 'react-dom';


export default class DownloadingProgress extends Component {
    constructor() {
        super();
        
        let socket = io.connect('http://localhost:3000');
        
        socket.on('download-progress', (msg) => {
            for (let fileId in msg) {
                let fileStatus = msg[fileId];
                let fileProgress = this.refs.downloadingFiles.querySelector(`#${fileId}`);
    
                if (fileProgress) {
                    fileProgress.innerHTML = `${fileStatus.fileName}: ${fileStatus.progress}%`;
                } else {
                    fileProgress = document.createElement('div');
                    fileProgress.id = fileId;
                    fileProgress.innerHTML = `${fileStatus.fileName}: ${fileStatus.progress}%`;
                    
                    this.refs.downloadingFiles.appendChild(fileProgress);
                }
            }
        });
    }
    
    render() {
        return (
            <div ref="downloadingFiles"></div>
        );
    }
}