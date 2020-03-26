import axios from 'axios';
const api = 'http://localhost:3001/';
const side_id = '5e7a2899fcec973c4457e1d0'

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


    addPage = (page) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `page/`+ side_id , page)
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
