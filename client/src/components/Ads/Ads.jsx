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
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input
} from "reactstrap";

import routes from "routes.js";
import '../../assets/css/ads_front.css';

class Ads extends React.Component {
    Styleimage= ()=>{
        return{
            padding: '5px',
            width: '180px',
            height: '250px',

        }
    };
    render() {
        return (
            <div className="nav-tools">
                <div className="container">
            <div id="ads">
                <div className="threshold">
                    <div className="container">


                        <div className="banner-holder">


                            <div className="banner bottom">

                                <img className="group list-group-image" style={this.Styleimage()}
                                     src={require("assets/img/pub30.png")}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>

        );
    }
}

export default Ads;
