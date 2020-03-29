import React, {Suspense} from 'react';
import '../css/Style.css';
import EditorText from "../components/editorText";
import servicePage from '../../../services/page.service'
import EditorList from "../components/editorList";
import { Link } from "react-router-dom";


class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: props.editor,
            toggle_btn : false,
            page : props.page,
            page_category: '',
            best_category_list_edit : false,
            best_category_text_edit : false,
            best_category_desc_edit : false
        }

    }

    componentDidMount() {
        const page_category = []
        servicePage.getPage()
            .then( res => {
                res.forEach(page => {
                    if ( page.layout.layout_name === 'category' ) {
                        if (this.state.page.best_category?.best_category_list) {
                            const exist = this.state.page.best_category.best_category_list.find((item) => item._id == page._id);
                            if( ! exist ) {
                                page_category.push(page)
                            }
                        } else {
                            page_category.push(page)
                        }
                    }
                })
                this.setState({
                    page_category: page_category
                })
            })
    }

    addCategory = (page) => {
        let category_list = [page]
        if ( this.state.page.best_category?.best_category_list ) {
            category_list = [...this.state.page.best_category.best_category_list , page]
        }
        this.setState({

            page : {
                ...this.state.page,
                best_category: {
                    ...this.state.page.best_category,
                    best_category_list: category_list
                }
            },

            page_category : this.state.page_category.filter((item) => item._id !== page._id)
        })
    }

    removeCategory = (page) => {
        this.setState({
            page_category : [...this.state.page_category, page],
            page : {
                ...this.state.page,
                best_category: {
                    ...this.state.page.best_category,
                    best_category_list: this.state.page.best_category.best_category_list.filter((item) => item._id !== page._id)
                }
            },
        })
    }

    mouseEnterHandle() {
        this.setState({
            toggle_btn : true,
        })
    }

    mouseLeaveHandle() {
        this.setState({
            toggle_btn : false
        })
    }

    editButtonClick = () => {
        this.setState({
            best_category_list_edit: !this.state.best_category_list_edit
        })
    }

    saveButtonClick = () => {
        this.setState({
            best_category_list_edit: false
        })
        this.savePage()
    }

    editorBestCategoryText = (best_category_text) => {
        this.setState({
            page : {
                ...this.state.page,
                best_category: {
                    ...this.state.page.best_category,
                    best_category_text: best_category_text
                }

            },
            best_category_text_edit : false

        })

        this.savePage()

    }

    handleBestCategoryText = () => {

        this.setState({
            best_category_text_edit : true
        })

    }

    editorBestCategoryDesc = (best_category_desc) => {
        this.setState({
            page : {
                ...this.state.page,
                best_category: {
                    ...this.state.page.best_category,
                    best_category_desc: best_category_desc
                }
            },
            best_category_desc_edit : false
        })

        this.savePage()

    }

    handleBestCategoryDesc = () => {
        this.setState({
            best_category_desc_edit : true
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

        const { page, page_category , best_category_list_edit, toggle_btn } = this.state

        const best_category_text = this.state.best_category_text_edit ?
            <EditorText editorState = { page.best_category?.best_category_text ? page.best_category.best_category_text : '' } editor = {this.editorBestCategoryText} />
            :
            <h1 className="best_category_text" onClick={ this.handleBestCategoryText }>
                { page.best_category?.best_category_text  ? page.best_category.best_category_text : 'Title of best category'  }
            </h1>


        const best_category_desc = this.state.best_category_desc_edit ?
            <EditorText editorState = { page.best_category?.best_category_desc ? page.best_category.best_category_desc : '' } editor = {this.editorBestCategoryDesc} />
            :
            <p className="best_category_desc" onClick={ this.handleBestCategoryDesc }>
                { page.best_category?.best_category_desc ? page.best_category.best_category_desc : 'Description of best category' }
            </p>

        const toggle = <div className="toggle_btn">
            {
                best_category_list_edit &&
                <span className="icon_btn" onClick={this.editButtonClick}>
                             <i className="nc-icon nc-check-2" onClick={this.saveButtonClick}></i>
                        </span>
            }
            {
                best_category_list_edit === false && toggle_btn &&
                <span className="icon_btn" onClick={this.editButtonClick}>
                            <i className="nc-icon nc-ruler-pencil"></i>
                        </span>
            }
        </div>

        const best_category_list =  page.best_category?.best_category_list &&
            page.best_category.best_category_list.map(page =>
                <div className="col-md-3" key={ page._id}>
                    {
                        best_category_list_edit ?
                            <p className="best_category_item">
                                { page.page_name}
                                <span className="toggle_icon" onClick={ () => this.removeCategory(page) }>
                                                                    <i className="nc-icon nc-simple-remove"></i>
                                                                </span>
                            </p>
                            :
                            <Link className="best_category_item" to={ '/website/' +page.page_name}>
                                { page.page_name }
                            </Link>
                    }
                </div>
            )

        return (
            <>
                <div className="section-best_category" onMouseEnter={ () => this.mouseEnterHandle() } onMouseLeave={ () => this.mouseLeaveHandle() }>
                    <div className="container">
                        { best_category_text }
                        { best_category_desc }
                        <div className="best_category_list">
                            <div className="row">
                                <div className="col-md-9">
                                    { toggle }
                                    <div className={ best_category_list?.length && best_category_list_edit === false ? '' : 'best_category_border'}>
                                        <div className="row">
                                            { best_category_list }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    { best_category_list_edit && <EditorList page_category = { page_category } add={ this.addCategory } /> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
