import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page : props.page,
        }
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            page : props.page,
        })
    }

    titleChange = (event) => {

        this.setState({
            errors: {
                ...this.state.errors,
                page_name: ''
            },
            page: {
                ...this.state.page,
                page_name : event.target.value
            }
        }, () => {
            this.props.handle(this.state.page)
        })
    }



    render() {
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
                                            <input type="text" className='form-control' onChange={ this.titleChange } defaultValue={ this.state.page.page_name } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="config_item">
                                <div className="item_title" data-toggle="collapse" href="#collapse2">
                                    <p className="item-title_text">
                                        Setting Variable
                                    </p>
                                    <span className="item-title_toggle">
                                        <i className="nc-icon nc-minimal-down"></i>
                                    </span>
                                </div>
                                <div id="collapse2" className="collapse show" data-parent="#sidebar-config">
                                    <div className="item-body">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
