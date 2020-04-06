/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Detail Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import servicePage from "../../services/page.service";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import RemovePage from "./removePage";


class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page : '',
            show : false,
            pages : ''
        }
    }

    componentDidMount() {
        servicePage.getPage()
            .then(res =>
                this.setState({
                    pages : res
                })
            )
    }

    handleClose = (pageId) => {
        this.setState({
            show : false,
            pages: this.state.pages.filter((page) => page._id !== pageId)
        })
    }

    removeClick = (page) => {
        this.setState({
            show : true,
            page : page
        })
    }

    render() {

        const { show, page} = this.state
        const pages = this.state.pages &&
            this.state.pages.map((page) =>
                page.layout.layout_name !== 'subcategory' &&
                <Fragment key={ page._id}>
                    <div className="page-list_item">
                        <p className="list-item_title">{ page.page_name }</p>
                        <div className="dropdown item-dropdown">
                               <span className="item-btn_setting" data-toggle="dropdown" data-toggle-second="tooltip" title="Setting">
                                 <i className="nc-icon nc-settings-gear-65"></i>
                               </span>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link className="dropdown-item" to={'/block-editor/' + page._id } >
                                    <i className="nc-icon nc-ruler-pencil"></i>
                                    Edit
                                </Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={ () => this.removeClick(page) }>
                                    <i className="nc-icon nc-simple-remove"></i>
                                    Remove
                                </a>
                            </div>
                        </div>
                    </div>
                    {
                        page.layout.layout_name === 'category' &&
                        this.state.pages.map((subcategory) =>
                            subcategory.layout.layout_name === 'subcategory' && subcategory.productTypePage._id === page._id &&
                            <div className="page-list_item pl-5" key={subcategory._id}>
                                <p className="list-item_title">{ subcategory.page_name }</p>
                                <div className="dropdown item-dropdown">
                                   <span className="item-btn_setting" data-toggle="dropdown" data-toggle-second="tooltip" title="Setting">
                                     <i className="nc-icon nc-settings-gear-65"></i>
                                   </span>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to={'/block-editor/' + subcategory._id } >
                                            <i className="nc-icon nc-ruler-pencil"></i>
                                            Edit
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" onClick={ () => this.removeClick(subcategory) }>
                                            <i className="nc-icon nc-simple-remove"></i>
                                            Remove
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Fragment>
            )


        return (
            <>
                <div className="content">


                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <div className="col-auto mr-auto">
                                            <Link className="btn btn-info" to={'/block-editor'}>
                                                Add page
                                            </Link>
                                        </div>
                                        <div className="col-auto toolbar">
                                            <div className="no-border input-group input-search">
                                                <input placeholder="Search..." type="text" className="form-control"/>
                                                <div className="input-group-append">
                                                      <span className="input-group-text">
                                                        <i className="nc-icon nc-zoom-split"></i>
                                                      </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                    <div className="pages-page_list">
                                        { pages }
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <RemovePage show = { show } hide = { this.handleClose } page = { page } />
                </div>
            </>
        );
    }
}


export default Page;
