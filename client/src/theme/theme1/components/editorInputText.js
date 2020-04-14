import React, {Suspense} from 'react';
import '../css/Style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'


class EditorInputText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: props.editorState,
        };

    }

    handleClickOutside = () => {
       this.props.editor(this.state.editorState)
    }

    handleTextChange = (event) => {
        this.setState({
            editorState: event.target.value,
        });
    }

    render() {
        const editorState = this.state.editorState
        return (
           <input type="text" className="form-control editor_input" onChange={ this.handleTextChange } defaultValue={ editorState }   style={{width: `${10*(editorState.length)}px`}}/>
        );
    }
}

export default onClickOutside(EditorInputText);
