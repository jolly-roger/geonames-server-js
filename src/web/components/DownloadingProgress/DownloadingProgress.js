import React, {Component} from 'react';
import io from 'socket.io-client';


export default class DownloadingProgress extends Component {
    constructor() {
        super();
        
        let socket = io.connect('http://localhost:3000');
        
        socket.on('download-progress', (msg) => {
            let fileProgress = this.refs.downloadingFiles.querySelector(`#${msg.fileId}`);

            if (fileProgress) {
                fileProgress.innerHTML = `${msg.fileName}: ${msg.progress}%`;
            } else {
                fileProgress = document.createElement('div');
                fileProgress.id = msg.fileId;
                fileProgress.innerHTML = `${msg.fileName}: ${msg.progress}%`;
                
                this.refs.downloadingFiles.appendChild(fileProgress);
            }
        });
    }
    
    render() {
        return (
            <div ref="downloadingFiles"></div>
        );
    }
}