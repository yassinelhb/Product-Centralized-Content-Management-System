import React from "react";
import {
    UncontrolledAlert,
    Alert,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col, DropdownToggle, DropdownMenu, DropdownItem, Dropdown
} from "reactstrap";
import EditorJs from 'react-editor-js';
import CheckList from '@editorjs/checklist';
import Header from '@editorjs/editorjs';
import list from '@editorjs/editorjs';
import embed from '@editorjs/editorjs';
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import CKEditor from 'ckeditor4-react';
import jwt_decode from "jwt-decode";

import Blogservice from '../../services/Blog/Blog.js';
class Blog extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            test:"",
            data2:{},
            Title:'',
            data: '<p>React is really <em>nice</em>!</p>',
            Image: null,
            website:"5e975a214ed93f17e0581ff5",
            users:"5e93bd22ae5dd9223453d4f4",
            imagePreviewUrl: null,
        };

        this.handleChange = this.handleChange.bind( this );
        this.onEditorChange = this.onEditorChange.bind( this );
    }


    componentDidMount() {


    }
    handleChangee(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
    ajoutblog = event => {

        const token = localStorage.getItem("token");
        let web =sessionStorage.getItem('webselect');
        this.state.test=JSON.parse(web);
        this.setState({users: jwt_decode(token).users._id});
        this.setState({website: this.state.test._id});

        this.state.data2 = {"Title": this.state.Title,
            "Description":this.state.data,
            "Image":this.state.imagePreviewUrl,
            "website":this.state.website
            ,"users":this.state.users};
        const fd = new FormData();
        fd.set('Title' , this.state.Title   );
        fd.set('Description' , this.state.data  );
        fd.append('file' , this.state.imagePreviewUrl );
        fd.set('website' , this.state.website );
        fd.set('users' , this.state.users );
console.log(this.state.data2);
        Blogservice.register(fd).then(res => {

                alert("User added Successfully");


        })
    }
    upadateBlog(Description){
        this.setState({Description});


    }
    handleonchangeblog = (e, editor) => {
    }
    onEditorChange( evt ) {
        this.setState( {
            data: evt.editor.getData()
        } );
        console.log(this.state.data);
    }

    handleChange( changeEvent ) {
        this.setState( {
            data: changeEvent.target.value
        } );
    }
    handleImageChange = event => {
        this.setState( {imagePreviewUrl: event.target.files[0]});



    }
    render() {
        return(
            <div className="content">

                <form className="register-page" onSubmit={this.ajoutblog} >
                    <h1  >Your content </h1>
                    <FormGroup>
                        <label>Title  </label>
                        <Input
                            placeholder="Blog Title"
                            type="text"
                            name="Title"
                            required
                            onChange={this.handleChangee.bind(this)}


                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Image</label>
                        <div className="form_theme row">
                            <div className="col-md-5 ">
                                <div className=" input_file">
                                    <input  required type="file" className="form-control" accept=".png, .jpg, .jpeg" onChange={ this.handleImageChange } />


                                    <div className="file_preview">
                                        {

                                                <p className="input_text">Drag your files here or click in this area</p>

                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </FormGroup>
                    <FormGroup>
                        <div className="App">
                            <h2>Using CKEditor 5 build in React</h2>
                            <CKEditor
                                data="<p>Hello froom CKEditor 4!</p>"
                                onChange={this.onEditorChange}
                            />
                        </div>

                    </FormGroup>
                    <button type="submit" className="btn-lg btn-dark btn-block"> save Blog </button>
                </form>
            </div>

        );
    }
}

export default Blog;
