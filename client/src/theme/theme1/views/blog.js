import React from 'react';
import {Link} from "react-router-dom";
import Add from "../components/description/add";
import servicePage from "../../../services/page.service";
import EditorText from "../components/editorText";
import serviceProducts from "../../../services/product/Product.service";
import serviceProductProperty from "../../../services/product/ProductProperty.service";
import jwt_decode from "jwt-decode";
import EditorInputText from "../components/editorInputText";


class Blog extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <h1>Blog</h1>
        );
    }
}

export default Blog;
