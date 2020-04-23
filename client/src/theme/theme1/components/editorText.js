import React, {Suspense} from 'react';
import '../css/Style.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'
import Translator from "../../../components/Translator/translator";
import serviceTranslator from "../../../services/Translator/translator.service";


class EditorText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(props.editorState)),
            sourceLang: '',
            targetLang: 'en',
        };

    }

    handleClickOutside() {
       this.props.editor(this.state.editorState.getCurrentContent().getPlainText())
    }

    handleTranslator = (type) => {
        const { editorState , sourceLang, targetLang } = this.state
        serviceTranslator.translate(editorState.getCurrentContent().getPlainText(), sourceLang, targetLang).then(res => {
            console.log(res[0][0][0])
        })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        }, () => this.handleTranslator('detected'));
    }

    render() {
        const editorState = this.state.editorState
        return (
           <div className="editor_text">
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
               <span onClick={ this.handleTranslator}>fvf</span>
               <Translator/>
           </div>
        );
    }
}

export default onClickOutside(EditorText);
