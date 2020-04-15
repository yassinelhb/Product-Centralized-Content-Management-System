import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page : props.page,
            imagePreviewUrl: '',
        }
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            page : props.page,
        })
    }

    handleImageChange = (e) => {

        e.preventDefault()

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {

            if ( file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' ) {
                reader.onloadend = () => {
                    this.setState({
                        page: {
                            ...this.state.page,
                            page_img: file
                        },
                        imagePreviewUrl: reader.result,
                        errors: {
                            ...this.state.errors,
                            page_img: ''
                        },
                    }, ()=> this.props.handle(this.state.page, this.state.imagePreviewUrl));
                }

                reader.readAsDataURL(file)



            }
            else {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        page_img: 'Image (Files allowed: png jpg jpeg)'
                    }
                })
            }
        }


    }


    handleChange = (event) => {

        this.setState({
            errors: {
                ...this.state.errors,
                [event.target.name] : ''
            },
            page: {
                ...this.state.page,
                [event.target.name] : event.target.value
            }
        }, () => {
            this.props.handle(this.state.page)
        })
    }



    render() {
        const { page, imagePreviewUrl } = this.state
        return (
            <div className="sidebar-editor">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#page">Page </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#ads">Ads banner </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="page" className="tab-pane active">
                        <div id="sidebar-config" className="sidebar_config">
                            <div className="config_item">
                                <div className="item_title" data-toggle="collapse" href="#collapse1">
                                    <p className="item-title_text">
                                        Page info
                                    </p>
                                    <span className="item-title_toggle">
                                        <i className="nc-icon nc-minimal-down"></i>
                                    </span>
                                </div>
                                <div id="collapse1" className="collapse show" data-parent="#sidebar-config">
                                    <div className="item-body">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input type="text" className='form-control' name='page_name' onChange={ this.handleChange } defaultValue={ page.page_name } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="config_item">
                                <div className="item_title" data-toggle="collapse" href="#collapse2">
                                    <p className="item-title_text">
                                        Content Variable
                                    </p>
                                    <span className="item-title_toggle">
                                        <i className="nc-icon nc-minimal-down"></i>
                                    </span>
                                </div>
                                <div id="collapse2" className="collapse show" data-parent="#sidebar-config">
                                    <div className="item-body">
                                        <div className="form-group">
                                            <label>Image</label>
                                            <div className="input_file">
                                                <input type="file" className="form-control"  accept=".png, .jpg, .jpeg" onChange={ this.handleImageChange } />
                                                <div className="file_preview">
                                                    {
                                                        imagePreviewUrl ?
                                                            <img src={imagePreviewUrl} />
                                                            :
                                                            page.page_img ?
                                                                <img src={ require('../../../assets/img/page/'+ page.page_img)} />
                                                                :
                                                                page.layout.layout_name === 'detail' ?
                                                                    <img src={ require('../../../../../assets/product/'+ page.product.picture)} />
                                                                    :
                                                                    <p className="input_text">Drag your files here or click in this area</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="ads" className="container tab-pane fade"><br/>
                        <h3>Menu 1</h3>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Sidebar;
