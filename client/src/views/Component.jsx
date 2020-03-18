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

  addLinkClick = () => {

  }

  editLinkClick = (link_id,index) => {

  }

  deleteLinkClick = (link, index) => {

  }

  render() {

    const pages = this.props.website.pages ? (
        this.props.website.pages.map(link =>
           <option key={link._id} value={link._id}> { link.page_name} </option>
        )
    ) : ''

    const links = this.props.website.header ?
        this.props.website.header.links.map((link,index) =>
            <div className="menu-link_item" key={link._id}>
              <p className="link-item_title" data-toggle="collapse" data-parent="#menu_link" href={'#collapse'+index}>
                <span className="item-title_text">{ link.link_text }</span>
                <span className="item-title_toggle">
                  { link.page.page_name}
                  <i className="nc-icon nc-minimal-down"></i>
                </span>
              </p>
              <div id={'collapse'+index} className="panel-collapse collapse">
                <div className="link-item_body">
                  <form>
                    <div className="form-group">
                      <input type="text" ref={ 'link_text' + index} className='form-control' placeholder="Link text"
                             defaultValue={ link.link_text }  />
                    </div>
                    <div className="form-group">
                      <select ref={ 'page' + index} defaultValue={link.page._id} className='form-control'>
                        { pages }
                      </select>
                    </div>
                    <button className="btn btn-primary col-12" onClick={ () => this.editLinkClick(link._id,index) }>Save</button>
                    <button className="btn btn-danger col-12"  onClick={ () => this.deleteLinkClick(link,index) }>Delete</button>
                  </form>
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
                <CardBody>
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#header">Header</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#footer">Footer</a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div id="header" className="container tab-pane active">
                       <Row>
                         <div className="col-auto nav_link">
                           <div className="container">
                             <h5 className="nav-link_title">
                               Links
                             </h5>
                             <div className="menu_link" id="menu_link">
                               { links }
                             </div>
                           </div>
                         </div>
                       </Row>
                      </div>
                      <div id="footer" className="container tab-pane fade">
                        zef
                      </div>
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
