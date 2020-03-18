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
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
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


class Pages extends React.Component {

  state = {
    visible: true,
    isOpen: false,
    dropdownOpen: false,
    color: "transparent"
  };

  render() {

    const pages = this.props.website.pages ?
        this.props.website.pages.map((page) =>
          <div className="page-list_item">
            <p className="list-item_title">{ page.page_name }</p>
            <div className="dropdown item-dropdown">
                           <span className="item-btn_setting" data-toggle="dropdown" data-toggle-second="tooltip" title="Setting">
                             <i className="nc-icon nc-settings-gear-65"></i>
                           </span>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  <i className="nc-icon nc-ruler-pencil"></i>
                  Edit
                </a>
                <a className="dropdown-item" href="#">
                  <i className="nc-icon nc-caps-small"></i>
                  Rename
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <i className="nc-icon nc-simple-remove"></i>
                  Remove
                </a>
              </div>
            </div>
          </div>
        ) : ''


    return (
      <>

        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <div className="col-auto mr-auto">
                      <button className="btn btn-primary">
                        Add page
                      </button>
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
        </div>
      </>
    );
  }
}

export default Pages;
