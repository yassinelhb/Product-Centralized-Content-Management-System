import axios from 'axios';
const api = 'http://localhost:3001/';
const side_id = '5e766d4f18dead0e6c2612b6'

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

    importXlsx = (formData,config) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `website/page`,formData,config)
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

    getProduct = () => {
        const data = [
            {
                id: 'php',
                label: 'php',
                value: 372,
                color: 'hsl(233, 70%, 50%)'
            },
            {
                id: 'scala',
                label: 'scala',
                value: 363,
                color: 'hsl(15, 70%, 50%)'
            },
            {
                id: 'go',
                label: 'go',
                value: 597,
                color: 'hsl(79, 70%, 50%)'
            },
            {
                id: 'css',
                label: 'css',
                value: 524,
                color: 'hsl(142, 70%, 50%)'
            },
            {
                id: 'hack',
                label: 'hack',
                value: 514,
                color: 'hsl(198, 70%, 50%)'
            }
        ];
        return data
    }

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

}

const instance = new website()

export default instance;
