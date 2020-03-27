import React, {Suspense} from 'react';
import '../css/Style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class EditorList extends React.Component {

    constructor(props) {
        super(props);
    }

    addCategory = (page) => {
        this.props.add(page)
    }



    render() {
        const page_category = this.props.page_category.map(page =>
            <div className="item_category" key={page._id} onClick={ () => this.addCategory(page) }>
                { page.page_name }
                <span className="toggle_icon">
                    <i className="nc-icon nc-simple-add"></i>
                </span>
            </div>
        )
        return (
            <div className="list_category">
                <h1 className="title_list_category">
                    List category
                </h1>
                { page_category }
            </div>
        );
    }
}

export default EditorList;
