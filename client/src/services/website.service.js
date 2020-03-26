import axios from 'axios';
const api = 'http://localhost:3001/';
const side_id = '5e7a2899fcec973c4457e1d0'

class website {


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
