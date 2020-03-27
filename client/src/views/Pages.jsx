/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col, DropdownToggle, DropdownMenu, DropdownItem, Dropdown
} from "reactstrap";
import "../assets/css/page.css";
import { Link} from "react-router-dom";
import ModalConfirm from "../components/Modal/ModalConfirm";
import servicePage from "../services/page.service";


class Pages extends React.Component {

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
          <div className="page-list_item" key={page._id}>
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
          <ModalConfirm show = { show } hide = { this.handleClose } page = { page } />
>>>>>>> 7f8ff62b88be3e53c912b43021754a760cdc7d19
        </div>
      </>
    );
  }
}

export default Pages;
