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
    create = (type) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `productType`, type)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    update = (type,typeId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `productType/`+typeId, type)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getOneById = (typeId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productType/`+typeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    delete = (typeId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `productType/`+typeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };



}

const instance = new ProductType();

export default instance;
