import axios from 'axios';
const api = 'http://localhost:3001/';
const side_id = '5e7ce3309f0d3737e8980743'

class Page {

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

    getPage = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `page/`+ side_id)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    addPage = (page) => {
        page.website = side_id
        return new Promise((resolve, reject) => {
            axios.post(api + `page`, page)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    editPage = (page) => {
        return new Promise((resolve, reject) => {
            axios.patch(api + `page`, page)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    deletePage = (pageId) => {
        console.log(pageId)
        return new Promise((resolve, reject) => {
            axios.delete(api + `page/` + pageId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    }

const instance = new Page()

export default instance;
