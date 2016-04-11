export default {
    login(email, pass) {
        return fetch(`/api/login/${email}/${pass}`)
            .then(data => data.text())
            .then(resData => JSON.parse(resData));
    }
}