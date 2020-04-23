import axios from 'axios';
const api = 'http://localhost:3001/';
//const websiteId = '5e7ce3309f0d3737e8980743';
//const layout='5e7ce3309f0d3737e8980748';
let layout;
let websiteId ='';
let datas =sessionStorage.getItem('webselect');
let web = JSON.parse(datas);
if (web!=null){
    websiteId = web._id;
}

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

    assignTypeToWebsite = (type,website,subTypes) => {


        return new Promise((resolve, reject) => {
            const t ={"page_name":type.name, "type":"category", "productType":type._id,subTypes:subTypes, "website":website, "layout":layout};
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
