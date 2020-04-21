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
    Input, Button
} from "reactstrap";

import routes from "routes.js";
import '../../assets/css/ads_front.css';
import propTypes from 'prop-types';
import Web_serv from "../../services/website.service";
import Ads_serv from "../../services/Ads_banner/Ads_banner.service";

class Ads extends React.Component {

    Styleimage= ()=>{
        return{
            padding: '5px',
            width: '180px',
            height: '250px',

        }
    };
    web = window.location.href.split(/(\\|\/)/g).pop() ;
    ads='loading.png'
    etat_add=''
    constructor() {
        super();
        this.state = {
            website: {},
            ads_banner:{}


        };
    }
    buttonstyle= (e)=>{
        return{
            "display":e
        }
    };

    etat ='none';

    componentDidMount() {

        Web_serv.getOneById(this.web)
            .then( res => {

                this.setState({
                    website : res
                }
                );
                 this.ads= this.state.website.ads_banners.Ads_img;
                this.etat_add= this.state.website.ads_banners.Valide_ads;

            })



    }

    deleteHandler(){

        alert(this.web)
        alert( "aa"+this.state.website.ads_banners._id)
        alert( "aa"+this.ads)

    }

    render() {
        if(this.etat_add !== false){this.etat=''}
        return (

            <div className="nav-tools">
                <div className="container">
            <div id="ads">
                <div className="threshold"  >
                    <div className="container">


                        <div className="banner-holder" >


                            <div className="banner bottom" style={this.Styleimage()} >


                                <img className="group list-group-image"
                                     src={require("assets/img/"+this.ads)}/>
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
