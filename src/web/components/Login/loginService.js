import md5 from 'md5';


export default {
    login(email, pass) {
        let passMd5 = md5(pass);
        
        return fetch(`/api/login/${email}/${passMd5}`)
            .then(data => data.text())
            .then(resData => JSON.parse(resData));
    }
}