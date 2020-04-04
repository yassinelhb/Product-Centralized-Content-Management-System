import axios from 'axios';
const api = 'http://localhost:3001/';
class user{

    getAll = (e) => {
        return new Promise((resolve, reject) => {
            console.log("////////////////////////");
            axios.get(api + `users`,{
                headers: {
                'authorization': 'Bearer '+e
            }
            }
                )
                .then(res => {
                    console.log("////////////////////////");
                    console.log(res.data);
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
}

const instance = new user();

export default instance;
