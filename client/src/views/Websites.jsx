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
import React from "react";
import axios from "axios";
import propTypes from 'prop-types';
import '../assets/css/WebsiteListe.css';
import '../assets/scss/websiteListe.js';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

class Websites extends React.Component {

  state = {websites: []}


 componentDidMount() {

    fetch('http://localhost:3001/website') // this route doesn't work with Express!
      .then(res => res.json())
      .then(websites => this.setState({ websites }));
  }



  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="demo-icons">
                <CardHeader>
                  <CardTitle tag="h5">Websites</CardTitle>

                </CardHeader>
                <CardBody className="all-icons">
                  <div id="icons-wrapper">




  <section>
                                <div className="App">

                                <div class="container">
                                    <div class="well well-sm">
                                            <strong>Display</strong>
                                            <div class="btn-group">
                                                <a href="#" id="list" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-th-list">
                                                </span>List</a> <a href="#" id="grid" class="btn btn-default btn-sm"><span
                                                    class="glyphicon glyphicon-th"></span>Grid</a>
                                            </div>
                                        </div>


                                     <h1>Sitewebs</h1>
                                                                      {this.state.websites.map(Website =>
                                                                        <div key={Website.id} >
                                                                         <div id="products" class="row list-group">
                                                                                                                <div class="item  col-xs-4 col-lg-4">
                                                                                                                    <div class="thumbnail">
                                                                                                                        <img class="group list-group-image"  src={require("assets/img/logo1.jpg")} />
                                                                                                                        <div class="caption">
                                                                                                                            <h5 class="group inner list-group-item-heading">
                                                                                                                                website name : {Website.site_name} </h5>
                                                                                                                            <p class="group inner list-group-item-text">
                                                                                                                                Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                                                                                                                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                                                                                                                            <div class="row">
                                                                                                                                <div class="col-xs-12 col-md-6">
                                                                                                                                    <p class="lead">
                                                                                                                                     Country   {Website.Contry}</p>
                                                                                                                                </div>

                                                                                                                                 <a class="btn btn-success" href="http://www.jquery2dotnet.com">delete</a>
                                                                                                                                    <a class="btn btn-success" href="http://www.jquery2dotnet.com">Update</a>

                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                         </div>

                                                                      )}
                                                                      </div>






                                </div>







                    </section>
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

export default Websites;
