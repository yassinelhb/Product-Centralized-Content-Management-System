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
            subcategory_page: '',
            edit_intro_subcategory_text: false,
            edit_title_subcategory: '',
            edit_subcategory: false,
            save_subcategory: false,
            setting_variable: '',
        }
    }

    componentDidMount() {
        serviceSubType.getSubTypePageByType(this.state.page.productTypePage._id)
            .then( res =>
                this.setState({
                    subcategory_page : res
                })
            )
    }

    mouseEnterHandle = () => {
        this.setState({
            edit_subcategory: true
        })
    }

    mouseLeaveHandle = () => {
        this.setState({
            edit_subcategory: false
        })
    }

    handleIntroSubcategoryText = () => {
        this.setState({
            edit_intro_subcategory_text : true
        })
    }

    editorIntroSubcategoryText = (intro_subcategory_text) => {
        this.setState({
            page: {
                ...this.state.page,
                intro_subcategory_text: intro_subcategory_text
            },
            edit_intro_subcategory_text: false
        })

        this.savePage()
    }

    handleTitleSubcategory = (subcategory) => {
        this.setState({
            edit_title_subcategory: subcategory
        })
    }

    editorTitleSubcategory = (title_subcategory) => {

        this.setState({
            edit_title_subcategory: {
                ...this.state.edit_title_subcategory,
                page_name: title_subcategory
            }
        })

        this.saveChangeTitle(this.state.edit_title_subcategory)

    }

    saveChangeTitle(subcategory) {

        servicePage.editPage(subcategory)
            .then(() => {
                const subcategory_page = [...this.state.subcategory_page]
                const index = subcategory_page.findIndex(page => page._id === subcategory._id)
                subcategory_page[index] = subcategory

                this.setState({
                    subcategory_page: subcategory_page,
                    page: {
                        ...this.state.page,
                        page_name: this.state.page._id === subcategory._id ? subcategory.page_name : this.state.page.page_name
                    },
                    edit_title_subcategory: ''
                })

            })
    }

    handleSettingVariable = (variable_edit) => {
        this.setState({
            setting_variable: variable_edit
        })
    }

    editorResultTotalNumber = (results_total_number) => {

        this.setState({
            page: {
                ...this.state.page,
                results_total_number: results_total_number
            },
            setting_variable: ''
        })

        this.savePage()
    }

    editorSortWord = (sort_word) => {

        this.setState({
            page: {
                ...this.state.page,
                sort_word: sort_word
            },
            setting_variable: ''
        })

        this.savePage()

    }




    editSubcategoryClick = () => {
        this.setState({
            edit_subcategory: false,
            save_subcategory: true
        })
    }

    saveSubcategoryClick = () => {
        this.setState({
            save_subcategory: false
        })
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

        const { page, subcategory_page, edit_intro_subcategory_text, edit_subcategory, save_subcategory, edit_title_subcategory, setting_variable } = this.state

        const toggle_subcategory =

                     edit_subcategory && save_subcategory === false ?

                         <div className="toggle_btn">
                            <span className="icon_btn" onClick={this.editSubcategoryClick}>
                                <i className="nc-icon nc-ruler-pencil"></i>
                            </span>
                        </div>
                        :
                        save_subcategory &&
                         <div className="toggle_btn">
                             <span className="icon_btn" onClick={this.saveSubcategoryClick}>
                                 <i className="nc-icon nc-check-2"></i>
                             </span>
                         </div>



        const intro_subcategory_text = edit_intro_subcategory_text ?
            <EditorText editorState = { page.intro_subcategory_text ? page.intro_subcategory_text : page.productSubType.description } editor = {this.editorIntroSubcategoryText} />
            :
            <p className="category_text" onClick={ this.handleIntroSubcategoryText }>
                { page.intro_subcategory_text ? page.intro_subcategory_text : page.productSubType.description }
            </p>

        const subcategory = subcategory_page &&

            subcategory_page.map( subcategory =>
                save_subcategory === false ?
                    <Link className="sub_category_item" to={`/website/` + page.productTypePage.page_name + `/`+ subcategory.page_name } key={subcategory._id}>
                        <label className="custom-checkbox">
                            <input type="checkbox" defaultChecked={ subcategory._id === page._id }/>
                            <span className="check_icon"></span>
                        </label>
                        <span className="sub_category_item_text">{ subcategory.page_name }</span>
                    </Link>
                    :
                    <div className="sub_category_item_editor" key={subcategory._id}>
                        {
                            edit_title_subcategory._id === subcategory._id ?
                                <EditorInputText editorState = { subcategory.page_name } editor = { this.editorTitleSubcategory } />
                                :
                                <span className="sub_category_item_text" onClick={ () => this.handleTitleSubcategory(subcategory) }> { subcategory.page_name }</span>
                        }

                    </div>
            )

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
               <div className="row">
                   <div className="left-column col-xs-12 col-sm-3">
                       <div className="sub_category_left" onMouseLeave={ () => this.mouseLeaveHandle() } onMouseEnter={ () => this.mouseEnterHandle() }>
                           <div className="category_title">
                               <span className="category_title_text">
                                   { page.productTypePage.page_name }
                               </span>
                               { toggle_subcategory }
                           </div>
                           <div className="sub_category_list">
                               { subcategory }
                           </div>
                       </div>
                   </div>
                   <div className="center-column col-xs-12 col-sm-9">
                       <div className="toolbar_filter row">
                            <div className=" mr-auto">
                                {
                                    setting_variable === 'results_total_number' ?
                                        <EditorInputText editorState = { page.results_total_number ? page.results_total_number : '' } editor = { this.editorResultTotalNumber } />
                                        :
                                        <span className="product_count" onClick={ () => this.handleSettingVariable('results_total_number') } >4 { page.results_total_number ? page.results_total_number : 'products' }</span>
                                }
                            </div>
                            <div className="filter_sort">
                                {
                                    setting_variable === 'sort_word'  ?
                                        <EditorInputText editorState = { page.sort_word ? page.sort_word : '' } editor = { this.editorSortWord } />
                                        :
                                        <span className="sort_text" onClick={ () => this.handleSettingVariable('sort_word') } > { page.sort_word ? page.sort_word : 'Sort by' }</span>
                                }
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

export default Subcategory;
