import React from "react";
import Pages from "../Pages";
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
import axios from "axios";
import "../../assets/css/page.css";
import {Link, Redirect} from "react-router-dom";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import './Login.css'
class Login extends React.Component {
    state = {
        post: {}
    }
    componentDidMount() {

    }

    render() {
        return(
            <form className="login-form" onSubmit={(e) => login(e)}>
                <h1>
                    <span className="font-weight-bold">Netcapital B.V {this.state.post.error}</span>
                </h1>
                <h2 className="text-center">Welcome</h2>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email" id="Email"/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="Password" placeholder="Password" id="Password"/>
                </FormGroup>
                <button type="submit" className="btn-lg btn-dark btn-block">Log in</button>
            </form>
        );
    }
}
function login(e) {
    e.preventDefault();
    let request = {
        email: document.getElementById('Email').value,
        password: document.getElementById('Password').value,
    }
    axios.post('http://localhost:3001/users/',request).then(resp =>{
        console.log("1///////");

        console.log(resp);
if(resp.data.error!=null)
{
    alert(resp.data.error);


}
else{
    window.location.href = "http://localhost:3000/admin/dashboard";


}


    })
        .catch(error => {
            console.log("2///////");

            console.log(error);
        })
}
export default Login;
