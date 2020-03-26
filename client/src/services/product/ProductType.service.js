import axios from 'axios';
const api = 'http://localhost:3001/';
const websiteId = '5e70c6b0a2ad2d38a47e8ccd';
const layout='5e76426f402b071f78fcc05d';
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
    assignTypeToWebsite = (type) => {
        return new Promise((resolve, reject) => {
            const t ={"page_name":type.name, "type":"category", "productType":type._id, "website":websiteId, "layout":layout};
            axios.post(api + `productType/assignTypeToWebsite`, t)
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

    getByWebsite = (websiteid) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productType/getByWebsite/`+websiteid)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    typesPagesByWebsite = (websiteid) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productType/typesPagesByWebsite/`+websiteid)
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
