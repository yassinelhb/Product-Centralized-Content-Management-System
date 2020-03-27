import React, {Suspense} from 'react';
import '../css/Style.css';
import Header from "../components/header";
import { Link} from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'


class EditorText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(props.editorState)),
        };

    }

    handleClickOutside() {
       this.props.editor(this.state.editorState.getCurrentContent().getPlainText())
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }

    render() {
        const editorState = this.state.editorState
        return (
           <>
               <Editor
               wrapperClassName="wrapper-class"
               editorClassName="editor-class"
               toolbarClassName="toolbar-class"
               toolbar={{
                   inline: {inDropdown: true},
                   list: {inDropdown: true},
                   textAlign: {inDropdown: true},
                   link: {inDropdown: true},
                   history: {inDropdown: true},
               }}
               editorState={editorState}
               onEditorStateChange={this.onEditorStateChange}/>
           </>
        );
    }
}

export default onClickOutside(EditorText);
