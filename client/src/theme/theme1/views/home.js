import React, {Suspense} from 'react';
import '../css/Style.css';
import EditorText from "../components/editorText";
import Dragdrop from "../components/dragdrop";
import servicePage from '../../../services/page.service'

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: props.editor,
            alert : '',
            toggle_btn : false,
            page : props.page,
            category: '',
            best_category_list_edit : false,
            best_category_text_edit : false,
            best_category_desc_edit : false
        }

    }

    componentDidMount() {

        servicePage.category()
            .then(res => {

                res.forEach(obj =>
                    obj.type = 'todo'
                ),

                this.setState({
                    category : res
                })
            })
    }

    bestCategoryChange = (category) => {
        this.setState({
            page : {
                ...this.state.page,
                best_category: {
                    ...this.state.page.best_category,
                    best_category_list: category
                }
            }
        })
    }

    mouseEnterHandle() {
        this.setState({
            toggle_btn : true
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
            best_category_list_edit: !this.state.best_category_list_edit
        })
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

        }

    }

    componentDidUpdate = ( nextProps, nextState) => {
        if( ! this.state.editor){
            if (this.state.page !== nextState.page ) {
                this.props.handle(this.state.page)
            }
        }
    }

    render() {

        const { page, alert, category, best_category_list_edit, toggle_btn } = this.state

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



        const best_category_list =   best_category_list_edit ?
                            (
                                <div className="best_category_drag">
                                    <Dragdrop category={category} done={this.bestCategoryChange}/>
                                </div>
                            ) :
                            (
                                   <div className="list_best">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="best_category_item">
                                                                 <span className="category_item_icon">
                                                                     <i className="nc-icon nc-credit-card"></i>
                                                                 </span>
                                                    <h4 className="category_item_text">Card Credit</h4>
                                                    {/*<EditorText editorState = { this.state.bottom_block_text } editor = {this.editorBottomBlockText} />*/}
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="best_category_item">
                                                         <span className="category_item_icon">
                                                             <i className="nc-icon nc-credit-card"></i>
                                                         </span>
                                                    <h4 className="category_item_text">Card Credit</h4>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="best_category_item">
                                                         <span className="category_item_icon">
                                                             <i className="nc-icon nc-credit-card"></i>
                                                         </span>
                                                    <h4 className="category_item_text">Card Credit</h4>
                                                </div>
                                              </div>
                                            <div className="col-md-3">
                                                <div className="best_category_item">
                                                         <span className="category_item_icon">
                                                             <i className="nc-icon nc-credit-card"></i>
                                                         </span>
                                                    <h4 className="category_item_text">Card Credit</h4>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="best_category_item">
                                                         <span className="category_item_icon">
                                                             <i className="nc-icon nc-credit-card"></i>
                                                         </span>
                                                    <h4 className="category_item_text">Card Credit</h4>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="best_category_item">
                                                         <span className="category_item_icon">
                                                              <i className="nc-icon nc-credit-card"></i>
                                                         </span>
                                                    <h4 className="category_item_text">Card Credit</h4>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="best_category_item">
                                                     <span className="category_item_icon">
                                                         <i className="nc-icon nc-credit-card"></i>
                                                     </span>
                                                 <h4 className="category_item_text">Card Credit</h4>
                                            </div>
                                        </div>
                                       </div>
                                   </div>
                            )

        return (

            <>
                {
                    alert &&
                    <div className="alert alert-warning">
                        { alert }
                    </div>
                }
                <div className="section-best_category">
                    <div className="container">
                        { best_category_text }

                        { best_category_desc }

                        <div className="best_category_list" onMouseEnter={ () => this.mouseEnterHandle() }  onMouseLeave={ () => this.mouseLeaveHandle() }>
                            { best_category_list }
                            <div className="toggle_btn">
                                {
                                    best_category_list_edit ?
                                        <button className="btn btn-info" onClick={ this.saveButtonClick }>Save</button>
                                        :
                                        toggle_btn &&
                                        <button className="btn btn-info" onClick={ this.editButtonClick }>Edit</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
