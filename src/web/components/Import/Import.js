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
        
        this.refs.dbForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
    
            let dbInputs = this.refs.dbForm.querySelectorAll('input');
            let isDBFormValid = true;
            
            for (let i=0; i < dbInputs.length; i++) {
                if(!dbInputs[i].checkValidity()) {
                    
                }
            }
            
            if (isDBFormValid) {
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
                })
                .then((res) => {
                    if (res.status == 500) {
                        res.json()
                        .then((resData) => {
                            this.refs.dbError.innerHTML = resData.error;
                        });
                    } else {
                        this.refs.dbError.innerHTML = '';
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
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
                    <form ref="dbForm">
                        <label htmlFor="dbhost">Host</label>
                        <input ref="dbhost" type="text" id="dbhost" required />
                        <label htmlFor="dbname">Database</label>
                        <input ref="dbname" type="text" id="dbname" required />
                        <label htmlFor="dbuser">User</label>
                        <input ref="dbuser" type="text" id="dbuser" required />
                        <label htmlFor="dbpassword">Password</label>
                        <input ref="dbpassword" type="text" id="dbpassword" required />
                        <button type="submit" ref="createTables" className="button">Create Tables</button>
                    </form>
                    <div ref="dbError"></div>
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