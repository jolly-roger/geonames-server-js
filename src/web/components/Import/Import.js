import React, {Component} from 'react';
import DownloadingProgress from '../DownloadingProgress';


export default class Import extends Component {
    componentDidMount() {
        this.refs.downloadBtn.addEventListener('click', (ev) => {
            fetch('/api/import/download');
        });
    }
    
    render() {
        return (
            <div>
                <div>Create DataBase</div>
                <div>
                    Download GeoNames
                    <br />
                    <button ref="downloadBtn" className="button">Download</button>
                    <DownloadingProgress />
                </div>
                <div>Import GeoNames</div>
                <div>Index GeoNames</div>
            </div>
        );
    }
}