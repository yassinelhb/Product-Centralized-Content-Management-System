import React, {Suspense} from 'react';
import '../css/Style.css';
import { Link} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorText from "./editorText";
import {ContentState, EditorState} from "draft-js";



class Category extends React.Component {

    constructor() {
        super();
        this.state = {
            intro_text :  EditorState.createWithContent( ContentState.createFromText("fzefze")),
            edit_intro_text : false,
            bottom_block_text : EditorState.createWithContent( ContentState.createFromText("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.\n" +
                "\n" +
                "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.")),
            edit_bottom_block_text : false
        }
    }

    handleBottomBlockText = () => {
        this.setState({
            edit_bottom_block_text : true
        })
    }

    editorBottomBlockText = (bottom_block_text) => {
        this.setState({
            bottom_block_text : bottom_block_text,
            edit_bottom_block_text : false
        })
    }

    handleIntroText = () => {
        this.setState({
            edit_intro_text : true
        })
    }

    editorIntroText = (intro_text) => {
        this.setState({
            intro_text : intro_text,
            edit_intro_text : false
        })
    }


    render() {
        return (
           <>
               <div className="breadcrumb">
                   <Link to={'/'} className="navigation_page"> Home </Link>
                   <span className="navigation_pipe">/</span>
                   <span className="navigation_page">Category</span>
               </div>
               <div className="category_intro">
                   <h1 className="category_name">
                       Category
                   </h1>

                   {/*  { this.state.edit_intro_text ?
                       <EditorText editorState = { this.state.intro_text } editor = {this.editorIntroText} />
                       :
                       <p onClick={ this.handleIntroText }> { this.state.intro_text.getCurrentContent().getPlainText()}</p>
                   }*/}

                   { this.state.edit_bottom_block_text ?
                       <EditorText editorState = { this.state.bottom_block_text } editor = {this.editorBottomBlockText} />
                       :
                       <p onClick={ this.handleBottomBlockText }> { this.state.bottom_block_text.getCurrentContent().getPlainText()}</p>
                   }
               </div>
           </>
        );
    }
}

export default Category;
