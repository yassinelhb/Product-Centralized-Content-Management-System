import axios from 'axios';
const api = 'http://localhost:3001/';
const websiteId = '5e70c6b0a2ad2d38a47e8ccd';
const layout='5e76426f402b071f78fcc05d';
class ProductType {


    getAll = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productSubType`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    create = (subType) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `productSubType`, subType)
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
            axios.post(api + `productSubType/assignTypeToWebsite`, t)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    update = (subType,subTypeId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `productSubType/`+subTypeId, subType)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getOneById = (subTypeId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productSubType/`+subTypeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getByType = (typeId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productSubType/byType/`+typeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    delete = (subTypeId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `productSubType/`+subTypeId)
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
            axios.get(api + `productSubType/getByWebsite/`+websiteid)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    PagesByWebsite = (websiteid) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productSubType/pagesByWebsite/`+websiteid)
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
