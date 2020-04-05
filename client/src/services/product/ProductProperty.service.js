import axios from 'axios';
const api = 'http://localhost:3001/';
//const websiteId = '5e7ce3309f0d3737e8980743';
//const layout='5e7ce3309f0d3737e8980744';
let layout;
let websiteId ='';
let datas =sessionStorage.getItem('webselect');
let web = JSON.parse(datas);
if (web!=null){
     websiteId = web._id;
}


class ProductProperty {


    getAll = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productProperty`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getBySubType = (subTypeId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productProperty/bySubType/`+subTypeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    create = (property) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `productProperty`, property)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    createMany = (labels) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `propertyLabel/createMany`, labels)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    assignTypeToWebsite = (type) => {


        axios.get(`layout/findby/`+websiteId).then(resp => {

            console.log(resp.data);
            layout =resp.data._id;
        });


        return new Promise((resolve, reject) => {
            const t ={"page_name":type.name, "type":"category", "productType":type._id, "website":websiteId, "layout":layout};
            axios.post(api + `productProperty/assignTypeToWebsite`, t)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    update = (property,propertyId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `productProperty/`+propertyId, property)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getOneById = (propertyId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productProperty/`+propertyId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    delete = (propertyId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `productProperty/`+propertyId)
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
            axios.get(api + `productProperty/getByWebsite/`+websiteid)
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
            axios.get(api + `productProperty/typesPagesByWebsite/`+websiteid)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

}

const instance = new ProductProperty();

export default instance;
