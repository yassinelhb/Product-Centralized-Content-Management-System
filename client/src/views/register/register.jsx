import React, { useState } from "react";
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
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import loginn from "../../services/Login/Login.js";
import jwt_decode from "jwt-decode";
import TypeService from "../../services/product/ProductType.service";
import UpdateProductType from "../productType/UpdateProductType";
import AddProductType from "../productType/AddProductType";
import Register1 from "./register-admin-content-director"
import Register2 from "./register-freelancer-contentEditor";
import Register3 from "./register-content-coordinator-sales-manages";
class register extends React.Component {
    state = {
        error:"",
        sites:[],
        log:"",
    }
    componentDidMount() {
        const token = localStorage.getItem("token");
        console.log(token);
        if(token != "") {
            console.log(jwt_decode(token).users.role);

            this.setState({log: jwt_decode(token).users.role})
            loginn.getAll()
                .then(res => {

                    this.setState({
                        sites: res
                    });
                    console.log(this.state.sites);
                })

        }
        else{
            this.setState({error: "you need to sign in"})

        }
    }



    render() {
        const {sites} = this.state;
        if (this.state.error != null) {
      return(
                <div className="content">
                    <div className="alert-danger">
                        <h1>You need to sign in</h1>
                    </div>
                </div>)
            }
        else {
            if (this.state.log === "admin") {
                return (

                    <div className="content">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">

                                    <Register1/>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">
                                    <Register2 sites={this.state.sites}/>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">
                                    <Register3 sites={this.state.sites}/>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                )
            } else {
                return (
                    <div className="content">
                    <div className="alert-danger">
                        <h1>You need to be Administrator</h1>
                    </div>
                </div>
                )
            }
        }
        }


}
export default register;
