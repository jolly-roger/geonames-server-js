import React, {Component} from 'react';
import DownloadingProgress from './DownloadingProgress';


export default class Import extends Component {
    componentDidMount() {
        this.refs.downloadBtn.addEventListener('click', (ev) => {
            fetch('/api/import/download');
        });
    }
    
    render() {
        return (
            <div>
                <div className="callout">
                    <h5>Download GeoNames</h5>
                    <DownloadingProgress />
                    <button ref="downloadBtn" className="button">Download</button>
                </div>
                <div className="callout">
                    <h5>Create DataBase</h5>
                </div>
                <div className="callout">
                    <h5>Import GeoNames</h5>
                </div>
                <div className="callout">
                    <h5>Index GeoNames</h5>
                </div>
            </div>
        );
    }
}