import axios from 'axios';
const api = 'http://localhost:3001/';

class ProductType {


    getAll = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productType`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };





}

const instance = new ProductType()

export default instance;
