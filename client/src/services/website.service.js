import axios from 'axios';
const api = 'http://localhost:3001/';
const side_id = '5e7ce3309f0d3737e8980743'

class website {

    update = (property,propertyId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `website/`+propertyId, property)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getAll = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `website`)
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
            axios.get(api + `website/`+propertyId)
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
            axios.delete(api + `website/`+propertyId)
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
            axios.post(api + `website`, property)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };



        webSite = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `website/`+side_id)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

    category = () => {
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

    linkSite = (link,type) => {
        link.site_id = side_id
        return new Promise((resolve, reject) => {
            axios.post(api + `website/header/link/`+type, link)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

    getThemes = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `theme`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

    addPage = (page) => {
        page.site_id = side_id
        return new Promise((resolve, reject) => {
            axios.post(api + `website/page`, page)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    savePage = (page) => {
        page.site_id = side_id
        return new Promise((resolve, reject) => {
            axios.patch(api + `website/page`, page)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    deletePage = (pageId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `website/page/` + pageId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    }

const instance = new website()

export default instance;
