import React from 'react';
import {Link} from "react-router-dom";
import Add from "../components/description/add";
import servicePage from "../../../services/page.service";
import EditorText from "../../theme2/components/editorText";
import serviceProducts from "../../../services/product/Product.service";
import serviceProductProperty from "../../../services/product/ProductProperty.service";


class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editor: props.editor,
            website: props.website,
            page: props.page,
            product_property: '',
            editor_text : '',
            alert: '',
            show: false
        }
    }

    componentDidMount() {

        serviceProducts.productDetails(this.state.page.product._id, this.state.website._id)
            .then( res => {
                this.setState({
                    page : {
                        ...this.state.page,
                        product: res
                    }
                });
            })

        serviceProductProperty.getBySubType(this.state.page.productSubType._id)
            .then( res => {
                this.setState({
                    product_property : res,
                });
            })

    }


    addClick = () => {
        this.setState({
            show: true
        })
    }

    addDescription = (description) => {

        let list_description = [description]

        if ( this.state.page.list_description ) {
            list_description = [...this.state.page.list_description , description]
        }
        this.setState({
            page: {
                ...this.state.page,
                list_description : list_description
            }
        }, () => this.savePage())

        this.handleClose()

    }

    removeDescription = (index) => {
        this.setState({
            page: {
                ...this.state.page,
                list_description:  this.state.page.list_description.filter((description, i) => i !== index),
            }
        }, () => this.savePage() )
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

    handleItemDescriptionClick = (type, index) => {
        this.setState({
            editor_text: {
                index: index,
                type: type
            }
        })
    }

    handleItemDescriptionChange = (text) => {

        const { editor_text } = this.state

        const list_description = [...this.state.page.list_description]

        const event = list_description[editor_text.index][editor_text.type] !== text

        list_description[editor_text.index][editor_text.type] = text

        this.setState({
            page: {
                ...this.state.page,
                list_description: list_description
            },
            editor_text: ''
        })

        event && this.savePage()
    }


    handleClose = () => {
        this.setState({
            show: false
        })
    }

    savePage() {

        const { page } = this.state
        const { imagePreviewUrl } = this.props

        if ( this.state.editor ) {

            let formData = new FormData();

            formData.append('page',JSON.stringify(page))

            servicePage.editPage(formData)
                .then(res => {
                    if (! res.message)
                        this.setState({
                            page : res,
                            alert : 'Page saved ...'
                        })
                })

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

        const { imagePreviewUrl } = this.props

        const { page, editor_text, alert, show, product_property } = this.state

        const intro_product_text = editor_text === 'intro_product_text' ?
            <EditorText editorState = { page.intro_product_text ? page.intro_product_text : '' } editor = { this.handleTextChange } />
            :
            <p  className="product_desc_text" onClick={ () => this.handleTextClick('intro_product_text') }>
                { page.intro_product_text ? page.intro_product_text : 'Description of product' }
            </p>


        const list_description = page.list_description && page.list_description.map((description, index) =>
            <div className="product_desc" key={ index }>
                <div className="toggle_btn">
                   <span className="icon_btn" onClick={ () => this.removeDescription(index) }>
                      <i className="nc-icon nc-simple-remove"></i>
                   </span>
                </div>

                {
                    editor_text.index === index  && editor_text.type === 'title' ?
                        <EditorText editorState = { description.title } editor = {this.handleItemDescriptionChange} />
                        :
                        <h4 className="product_desc_title" onClick={ () => this.handleItemDescriptionClick('title', index) }>
                                { description.title }
                        </h4>

                }

                {
                    editor_text.index === index  && editor_text.type === 'text' ?
                        <EditorText editorState = { description.text } editor = {this.handleItemDescriptionChange} />
                        :
                        <p className="product_desc_text" onClick={ () => this.handleItemDescriptionClick('text', index) }>
                            { description.text }
                        </p>
                }

            </div>
        )

        const list_property = product_property && product_property.map( prop =>
            <tr key={ prop._id }>
                <th> { page.product[prop.name].label ?  page.product[prop.name].label?.label : prop.name }</th>
                <td> { page.product[prop.name].value ? page.product[prop.name].value : 'Na' } </td>
            </tr>

        )

        return (

            <div className="container">
                <div className="breadcrumb">
                    <Link to={'/website/home'} className="navigation_page"> Home </Link>
                    <span className="navigation_pipe">/</span>
                    <Link to={'/website/' + page.SubTypePage.productTypePage.page_name } className="navigation_page"> { page.SubTypePage.productTypePage.page_name } </Link>
                    <span className="navigation_pipe">/</span>
                    <Link to={'/website/'  + page.SubTypePage.productTypePage.page_name + '/' + page.SubTypePage.page_name } className="navigation_page"> { page.SubTypePage.page_name } </Link>
                    <span className="navigation_pipe">/</span>
                    <span className="navigation_page"> { page.page_name } </span>
                </div>

                <div className="content_product">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="product_header">
                                {
                                    imagePreviewUrl ?
                                        <img src={ imagePreviewUrl }  className="product_img" />
                                        :
                                        <img src={ page.page_img ? require('../../../assets/img/page/'+page.page_img) : require('../../../../../assets/product/' + page.product.picture)} className="product_img" />
                                }
                                <h1 className="product_title"> { page.page_name } </h1>
                            </div>
                            <div className="list_product_desc">

                                { intro_product_text }

                                { list_description }

                                <button className="btn btn-secondary" onClick={ this.addClick }>
                                    Add description
                                </button>
                                <Add show = { show }  add={ this.addDescription } hide={ this.handleClose }/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="product_prop">

                                <table className="table table_prop">
                                    <tbody>
                                    { list_property }
                                    </tbody>
                                </table>
                            </div>
                            <a className="btn btn-primary" href={ page.product.bankLink }> Go to web site </a>
                        </div>
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

export default Detail;
