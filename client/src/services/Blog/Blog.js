import axios from 'axios';
const api = 'http://localhost:3001/';

class Blog {

    register = (e) => {
        return new Promise((resolve, reject) => {

            axios.post(api + `Blog/AddBlog` , e , { headers: { "Content-Type": "multipart/form-data" } })
                .then(res => {
                    console.log("1");
                    resolve(res.data);
                })
                .catch(error => {
                    console.log("2");

                    console.log(error);
                })
        })

    };
    yourblog = (typeId) => {
        return new Promise((resolve, reject) => {
            console.log(api + `Blog/test`+typeId);
            axios.get(api + `Blog/test`+typeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    blog = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `Blog`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    EditBlog = (type,typeId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `Blog/`+typeId, type )
                .then(res => {
                    console.log("1");

                    resolve(res.data);
                    console.log(res.data);

                })
                .catch(error => {
                    console.log("2");

                    reject(error)
                })
        })

    };

    EditBlogValidation = (type,typeId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `Blog/validation/`+typeId, type )
                .then(res => {
                    resolve(res.data);
                    console.log(res.data);

                })
                .catch(error => {
                    console.log("2");

                    reject(error)
                })
        })

    };


}
const instance = new Blog();

export default instance;
