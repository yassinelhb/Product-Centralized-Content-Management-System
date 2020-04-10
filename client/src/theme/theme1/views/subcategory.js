import React, {Suspense} from 'react';
import '../css/Style.css';
import { Link} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorText from "../components/editorText";
import servicePage from '../../../services/page.service'
import serviceSubType from "../../../services/product/ProductSubType.service";
import EditorInputText from "../components/editorInputText";



class Subcategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editor: props.editor,
            page: props.page,
            editor_text : '',
            alert: ''
        }
    }

    handleTextClick = (editor_text) => {
        this.setState({
            editor_text: editor_text
        })
    }

    handleTextChange = (text) => {
        const event = this.state.page[this.state.editor_text] !== text

        this.setState({
            page: {
                ...this.state.page,
                [this.state.editor_text] : text
            },
            editor_text: ''
        })

        event && this.savePage()

    }

    savePage() {
        const { page } = this.state

        if ( this.state.editor ) {

            let formData = new FormData();

            formData.append('page',JSON.stringify(page))

            servicePage.editPage(formData)
                .then(res =>
                    this.setState({
                        page : res,
                        alert : 'Page saved ...'
                    })
                )

            setTimeout(() =>{
                this.setState({
                    alert: ''
                })
            },2000)

        } else {
            this.props.handle(this.state.page)
        }

    }

    render() {

        const { page, editor_text, alert } = this.state

        const intro_subcategory_text = editor_text === 'intro_subcategory_text' ?
            <EditorText editorState = { page.intro_subcategory_text ? page.intro_subcategory_text : page.productSubType.description } editor = { this.handleTextChange } />
            :
            <p className="category_text" onClick={ () => this.handleTextClick('intro_subcategory_text') }>
                { page.intro_subcategory_text ? page.intro_subcategory_text : page.productSubType.description }
            </p>


        const sort_word = editor_text === 'sort_word' ?
            <EditorInputText editorState = { page.sort_word ? page.sort_word :  'Sort by' } editor = { this.handleTextChange } />
            :
            <span className="sort_text" onClick={ () => this.handleTextClick('sort_word') } > { page.sort_word ? page.sort_word : 'Sort by' }</span>


        return (
           <div className="container">
               <div className="breadcrumb">
                   <Link to={'/'} className="navigation_page"> Home </Link>
                   <span className="navigation_pipe">/</span>
                   <Link to={'/website/' + page.productTypePage.page_name } className="navigation_page"> { page.productTypePage.page_name } </Link>
                   <span className="navigation_pipe">/</span>
                   <span className="navigation_page"> { page.page_name } </span>
               </div>
               <div className="category_intro">
                   <h1 className="category_name">
                       { page.page_name }
                   </h1>

                   { intro_subcategory_text }

               </div>
               <div className="subcategory_product">
                   <div className="toolbar_filter">
                        <div className="filter_sort">
                            {
                                sort_word
                            }
                            <select className="form-control">
                                <option>------- ---</option>
                                <option>rrrrrrrrrrrrrrrrrrrrrrrrrrrr</option>
                            </select>
                        </div>
                   </div>
                   <div className="list_product">
                       <div className="product_list_item">
                           <div className="row">
                               <div className="col-sm-3">
                                   <div className="product_item_img">
                                       <img src={ require('../../../assets/img/logo.png') }/>
                                   </div>
                               </div>
                               <div className="col-sm-4">
                                   <h2 className="product_item_title">
                                       Visa World Card Business
                                   </h2>
                               </div>
                               <div className="col-sm-5">
                                 <div className="product_item_prop">
                                   <div className="product_prop">
                                       <span className="prop_title">
                                           Cotisation annuelle
                                       </span>
                                       <span className="prop_info">
                                           	0,00 €
                                       </span>
                                   </div>
                                   <div className="product_prop">
                                       <span className="prop_title">
                                           Compte supplémentaire
                                       </span>
                                       <span className="prop_info">
                                           	-
                                       </span>
                                   </div>
                                   <div className="product_prop">
                                       <span className="prop_title">
                                          Carte de crédit incluse
                                       </span>
                                       <span className="prop_info">
                                           Oui
                                       </span>
                                   </div>
                                   <div className="product_prop">
                                       <span className="prop_title">
                                          Type de carte de crédit
                                       </span>
                                       <span className="prop_info">
                                           MasterCard
                                       </span>
                                   </div>
                               </div>
                                   <div className="product_item_btn">
                                       <a className="btn">
                                         <span className="icon_btn">
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                         </span>
                                           More info
                                       </a>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="product_list_item">
                           <div className="row">
                               <div className="col-sm-3">
                                   <img className="product_item_img" src={ require('../../../assets/img/logo.png') }/>
                               </div>
                               <div className="col-sm-4">
                                   <h2 className="product_item_title">
                                       Mastercard Business
                                   </h2>
                               </div>
                               <div className="col-sm-5">
                                   <div className="product_item_prop">
                                       <div className="product_prop">
                                       <span className="prop_title">
                                           Cotisation annuelle
                                       </span>
                                           <span className="prop_info">
                                           	0,00 €
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                           Compte supplémentaire
                                       </span>
                                           <span className="prop_info">
                                           	-
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                          Carte de crédit incluse
                                       </span>
                                           <span className="prop_info">
                                           Oui
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                          Type de carte de crédit
                                       </span>
                                           <span className="prop_info">
                                           MasterCard
                                       </span>
                                       </div>
                                   </div>
                                   <div className="product_item_btn">
                                       <a className="btn">
                                         <span className="icon_btn">
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                         </span>
                                           More info
                                       </a>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="product_list_item">
                           <div className="row">
                               <div className="col-sm-3">
                                   <img className="product_item_img" src={ require('../../../assets/img/logo.png') }/>
                               </div>
                               <div className="col-sm-4">
                                   <h2 className="product_item_title">
                                       Visa World Card Business
                                   </h2>
                               </div>
                               <div className="col-sm-5">
                                   <div className="product_item_prop">
                                       <div className="product_prop">
                                       <span className="prop_title">
                                           Cotisation annuelle
                                       </span>
                                           <span className="prop_info">
                                           	0,00 €
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                           Compte supplémentaire
                                       </span>
                                           <span className="prop_info">
                                           	-
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                          Carte de crédit incluse
                                       </span>
                                           <span className="prop_info">
                                           Oui
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                          Type de carte de crédit
                                       </span>
                                           <span className="prop_info">
                                           MasterCard
                                       </span>
                                       </div>
                                   </div>
                                   <div className="product_item_btn">
                                       <a className="btn">
                                         <span className="icon_btn">
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                         </span>
                                           More info
                                       </a>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="product_list_item">
                           <div className="row">
                               <div className="col-sm-3">
                                   <img className="product_item_img" src={ require('../../../assets/img/logo.png') }/>
                               </div>
                               <div className="col-sm-4">
                                   <h2 className="product_item_title">
                                       Visa World Card Business
                                   </h2>
                               </div>
                               <div className="col-sm-5">
                                   <div className="product_item_prop">
                                       <div className="product_prop">
                                       <span className="prop_title">
                                           Cotisation annuelle
                                       </span>
                                           <span className="prop_info">
                                           	0,00 €
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                           Compte supplémentaire
                                       </span>
                                           <span className="prop_info">
                                           	-
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                          Carte de crédit incluse
                                       </span>
                                           <span className="prop_info">
                                           Oui
                                       </span>
                                       </div>
                                       <div className="product_prop">
                                       <span className="prop_title">
                                          Type de carte de crédit
                                       </span>
                                           <span className="prop_info">
                                           MasterCard
                                       </span>
                                       </div>
                                   </div>
                                   <div className="product_item_btn">
                                       <a className="btn">
                                         <span className="icon_btn">
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                         </span>
                                           More info
                                       </a>
                                   </div>
                               </div>
                           </div>
                       </div>

                   </div>
                   <div className="more_product">
                       <span className="btn_more">More product</span>
                   </div>
               </div>
               {
                   alert &&
                   <div className="alert_saved">
                       <span> { alert } </span>
                   </div>
               }
           </div>
        );
    }
}

export default Subcategory;
