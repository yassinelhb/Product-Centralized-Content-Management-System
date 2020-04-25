import React, {Suspense} from 'react';
import '../css/Style.css';
import { Link} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorText from "../components/editorText";
import servicePage from '../../../services/page.service'
import EditorInputText from "../components/editorInputText";
import Sidebar_compare from "../components/compare/sidebar_compare";
import serviceProductProperty from "../../../services/product/ProductProperty.service";
import serviceProducts from "../../../services/product/Product.service";



class Subcategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            website: props.website,
            editor: props.editor,
            page: props.page,
            page_products: '',
            product_property: '',
            editor_text : '',
            alert: '',
            compares : '',
            show: 2
        }

    }

    componentDidMount() {

        servicePage.getPagesBySubTypes(this.state.page._id)
            .then( res => {
                const page_products = res.map((page) => {
                    return this.getProduct(page.product._id).then((product) => {
                        page.product = product
                        return page
                    })
                })
                return Promise.all(page_products)
            })
            .then( page_products => {
                this.setState({
                    page_products: page_products
                })
            })

        serviceProductProperty.getBySubType(this.state.page.productSubType._id)
            .then( res => {
                this.setState({
                    product_property : res,
                });
            })
    }


    getProduct = (product_id) => {
        return  serviceProducts.productDetails(product_id, this.state.website._id).then(res => {
            return res
        })
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
            editor_text: '',
        },() => event && this.savePage())

    }

    showMore = () => {
        this.setState({
            show : this.state.show + 2
        })
    }

    handleCompare = ( page_product ) => {
        let compares = [...this.state.compares]
        const exist = compares.find( page_prod => page_prod._id === page_product._id )

        if ( ! exist ) {
            compares.push(page_product)
        } else {
            compares = compares.filter( page_prod => page_prod._id !== page_product._id )
        }

        this.setState({
            compares : compares
        })
    }

    savePage() {

        const { page } =  this.state

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

        const { page, editor_text, alert, page_products, show, editor, compares, product_property } = this.state

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


        const list_property = (product) => product_property && product_property.map(prop =>
            <div className="product_prop" key={ prop._id }>
                <span className="prop_title">
                    { product[prop.name].label ?  product[prop.name].label?.label : prop.name }
                </span>
                <span className="prop_info">
                    { product[prop.name].value ?  product[prop.name].value : 'Na'}
                </span>
            </div>
        )

        const list_products = page_products && page_products.map( (product_page, index ) =>
            show > index &&
            <div className="product_list_item" key={ product_page._id }>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="product_item_img">
                            <img src={ product_page.page_img ? require('../../../assets/img/page/' + product_page.page_img) : require('../../../../../assets/product/' + product_page.product.picture) }/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h2 className="product_item_title">
                            { product_page.page_name }
                        </h2>
                    </div>
                    <div className="col-sm-5">
                        <div className="product_item_prop">
                            { list_property(product_page.product)}
                        </div>
                        <div className="product_item_btn">
                            <Link className="btn btn-secondary"
                                  to={'/website/' + product_page.SubTypePage.productTypePage.page_name + '/' + product_page.SubTypePage.page_name + '/' + product_page.page_name}>
                                         <span className="icon_btn">
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                             <i className="nc-icon nc-minimal-right"></i>
                                         </span>
                                More info
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="product_item_check">
                    <label className="custom-checkbox">
                        <input type="checkbox" onChange={ () => this.handleCompare(product_page) } checked={ compares && compares.find( page_prod => page_prod._id === product_page._id )}/>
                        <span className="check_icon"></span>
                    </label>
                </div>
            </div>
        )


        const more_product = editor_text === 'more_product' ?
            <span className="btn btn-secondary">
                <EditorInputText editorState = { page.more_product ? page.more_product :  'More product' } editor = { this.handleTextChange } />
            </span>
            :
            <>
                <span className="btn btn-secondary" onClick={ this.showMore }>{ page.more_product ? page.more_product + '...' :  'More product ...'  }</span>
                <div className="toggle_btn">
                    <span className="icon_btn" onClick={ () => this.handleTextClick('more_product') } >
                        <i className="nc-icon nc-ruler-pencil"></i>
                    </span>
                </div>
            </>

        return (
            <>
                <div className="container">
                    <div className="breadcrumb">
                        <Link to={'/website/home'} className="navigation_page"> Home </Link>
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
                    <div className="subcategory_pub">
                    <img className="img_pub" src={ require('../../../assets/img/pub/damir-bosnjak.jpg') }/>
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
                       { list_products }
                   </div>
                   {
                       page_products.length > show &&
                       <div className="toolbar_bottom">
                           <div className="more_product">
                               { more_product }
                           </div>
                       </div>
                   }

               </div>
                    {
                        alert &&
                        <div className="alert_saved">
                            <span> { alert } </span>
                        </div>
                    }
                </div>
                {
                    editor && compares.length &&
                    <Sidebar_compare compares = { compares } property = { product_property }  handleCompare = { this.handleCompare } />
                }
            </>
        );
    }
}

export default Subcategory;
