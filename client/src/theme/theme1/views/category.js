import React, {Suspense} from 'react';
import '../css/Style.css';
import { Link} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorText from "../components/editorText";
import servicePage from '../../../services/page.service'



class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editor: props.editor,
            page : props.page,
            edit_intro_category_text: false
        }
    }

    handleIntroCategoryText = () => {
        this.setState({
            edit_intro_category_text : true
        })
    }

    editorIntroCategoryText = (intro_category_text) => {
        this.setState({
            page: {
                ...this.state.page,
                intro_category_text: intro_category_text
            },
            edit_intro_category_text: false
        })

        this.savePage()
    }

    savePage() {
        if ( this.state.editor ) {
            servicePage.editPage(this.state.page)
                .then(res =>
                    this.setState({
                        page : res
                    })
                )

        } else {
            this.props.handle(this.state.page)
        }

    }

    render() {

        const { page, edit_intro_category_text } = this.state

        const intro_category_text = edit_intro_category_text ?
            <EditorText editorState = { page.intro_category_text ? page.intro_category_text : page.productType.description } editor = {this.editorIntroCategoryText} />
            :
            <p className="category_text" onClick={ this.handleIntroCategoryText }>
                { page.intro_category_text ? page.intro_category_text : page.productType.description }
            </p>

        return (
           <div className="container">
               <div className="breadcrumb">
                   <Link to={'/'} className="navigation_page"> Home </Link>
                   <span className="navigation_pipe">/</span>
                   <span className="navigation_page"> { page.page_name } </span>
               </div>
               <div className="category_intro">
                   <h1 className="category_name">
                       { page.page_name }
                   </h1>

                   { intro_category_text }

               </div>
               <div className="row">
                   <div className="left-column col-xs-12 col-sm-3">
                       <div className="sub_category_left">
                           <div className="category_title">
                               <span className="category_title_text">
                                   { page.page_name }
                               </span>
                               <div className="toggle_btn">
                                   <span className="icon_btn" onClick={this.saveButtonClick}>
                                        <i className="nc-icon nc-check-2"></i>
                                   </span>
                                   <span className="icon_btn" onClick={this.editButtonClick}>
                                        <i className="nc-icon nc-ruler-pencil"></i>
                                   </span>
                               </div>
                           </div>
                           <div className="sub_category_list">
                               <div className="sub_category_item">
                                   <label className="custom-checkbox">
                                       <input type="checkbox"/>
                                       <span className="check_icon"></span>
                                   </label>
                                   <span className="sub_category_item_text">Sub category 1</span>
                               </div>
                               <div className="sub_category_item">
                                   <label className="custom-checkbox">
                                       <input type="checkbox"/>
                                       <span className="check_icon"></span>
                                   </label>
                                   <span className="sub_category_item_text">Sub category 1</span>
                               </div>
                               <div className="sub_category_item">
                                   <label className="custom-checkbox">
                                       <input type="checkbox"/>
                                       <span className="check_icon"></span>
                                   </label>
                                   <span className="sub_category_item_text">Sub category 1</span>
                               </div>
                               <div className="sub_category_item">
                                   <label className="custom-checkbox">
                                       <input type="checkbox"/>
                                       <span className="check_icon"></span>
                                   </label>
                                   <span className="sub_category_item_text">Sub category 1</span>
                               </div>
                               <div className="sub_category_item">
                                   <label className="custom-checkbox">
                                       <input type="checkbox"/>
                                       <span className="check_icon"></span>
                                   </label>
                                   <span className="sub_category_item_text">Sub category 1</span>
                               </div>
                               <div className="sub_category_item">
                                   <label className="custom-checkbox">
                                       <input type="checkbox"/>
                                       <span className="check_icon"></span>
                                   </label>
                                   <span className="sub_category_item_text">Sub category 1</span>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="center-column col-xs-12 col-sm-9">
                       <div className="toolbar_filter row">
                            <div className=" mr-auto">
                                <span className="product_count">There are 4 products</span>
                            </div>
                            <div className="filter_sort">
                                <span className="sort_text">Sort by</span>
                                <select>
                                    <option>------- ---</option>
                                </select>
                            </div>
                       </div>
                       <div className="product_list">
                           <div className="product_list_item">
                               <div className="col-sm-3 product_item_img">
                                   <img src={ require('../../../assets/img/logo.png') }/>
                               </div>
                               <div className="col-sm-9 product_item_info">
                                   <div className="product_item_header">
                                       <h2 className="product_item_title">
                                           Product 1
                                       </h2>
                                       <a className="btn_more bg-primary">More info</a>
                                   </div>
                                   <p className="product_item_desc">
                                       Le Lorem Ipsum est simplemefvfdvnt du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500,
                                   </p>
                                   <div className="product_item_prop">
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 1
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 2
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 3
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div className="product_list_item">
                               <div className="col-sm-3 product_item_img">
                                   <img src={ require('../../../assets/img/logo.png') }/>
                               </div>
                               <div className="col-sm-9 product_item_info">
                                   <div className="product_item_header">
                                       <h2 className="product_item_title">
                                           Product 1
                                       </h2>
                                       <a className="btn_more bg-primary">More info</a>
                                   </div>
                                   <p className="product_item_desc">
                                       Le Lorem Ipsum est simplemefvfdvnt du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500,
                                   </p>
                                   <div className="product_item_prop">
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 1
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 2
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 3
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div className="product_list_item">
                               <div className="col-sm-3 product_item_img">
                                   <img src={ require('../../../assets/img/logo.png') }/>
                               </div>
                               <div className="col-sm-9 product_item_info">
                                   <div className="product_item_header">
                                       <h2 className="product_item_title">
                                           Product 1
                                       </h2>
                                       <a className="btn_more bg-secondary">More info</a>
                                   </div>
                                   <p className="product_item_desc">
                                       Le Lorem Ipsum est simplemefvfdvnt du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500,
                                   </p>
                                   <div className="product_item_prop">
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 1
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 2
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                       <div className="product_prop">
                                           <span className="prop_title">
                                               Property 3
                                           </span>
                                           <span className="prop_info">
                                               Property
                                           </span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="more_product">
                           <span className="btn_more">More product</span>
                       </div>
                   </div>
               </div>
           </div>
        );
    }
}

export default Category;
