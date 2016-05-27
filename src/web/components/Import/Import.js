import React, {Component} from 'react';
import DownloadingProgress from './DownloadingProgress';
import UnzippingProgress from './UnzippingProgress';


export default class Import extends Component {
    componentDidMount() {
        this.refs.downloadBtn.addEventListener('click', (ev) => {
            fetch('/api/import/download-data');
        });
        
        this.refs.unzipBtn.addEventListener('click', (ev) => {
            fetch('/api/import/unzip-data');
        });
        
        this.refs.createTables.addEventListener('click', (ev) => {
            let credentials = {
                host: this.refs.dbhost.value,
                database: this.refs.dbname.value,
                user: this.refs.dbuser.value,
                password: this.refs.dbpassword.value
            };
            
            fetch('/api/import/create-tables', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
        });
    }
    
    render() {
        return (
            <div>
                <div className="callout">
                    <h5>Download GeoNames</h5>
                    <DownloadingProgress />
                    <button ref="downloadBtn" className="button">Download</button>
                    <UnzippingProgress />
                    <button ref="unzipBtn" className="button">Unzip</button>
                </div>
                <div className="callout">
                    <h5>Create DataBase</h5>
                    <label htmlFor="dbhost">Host</label>
                    <input ref="dbhost" type="text" id="dbhost" />
                    <label htmlFor="dbname">Database</label>
                    <input ref="dbname" type="text" id="dbname" />
                    <label htmlFor="dbuser">User</label>
                    <input ref="dbuser" type="text" id="dbuser" />
                    <label htmlFor="dbpassword">Password</label>
                    <input ref="dbpassword" type="text" id="dbpassword" />
                    <button ref="createTables" className="button">Create Tables</button>
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