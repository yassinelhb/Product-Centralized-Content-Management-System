/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState , state } from 'react';
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Label} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import jwt_decode from "jwt-decode";
import loginn from "../../services/Login/Login";
import register from "../../services/User/register.js";
const Register2 = ({sites}) => {


    const [modal, setModal] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [password2, setpassword2] = useState("");
    const [role, setrole] = useState("");
    const [website, setwebsite] = useState("");
    const [functionn, setfunctionn] = useState("");
    const [error, seterror] = useState("");
    const [succes, setsucces] = useState("");

    const toggle = () => setModal(!modal);
    const changeHandler = (e) => {
        console.log(sites);
        e.target.name = e.target.value;
    };
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(password);
        console.log(password2);
        if(password===password2) {
            const token = localStorage.getItem("token");
            const data = {"email":email,"password":password, "role":role,"website":website,"function":functionn, "token":token};
            register.register(data).then(res => {
                if(res.data.error!=null){
                    seterror(res.data.error);
                }
                else{
                    console.log(res);
                    setsucces('User add succes');
                }
            })
        }
        else{
            seterror('password dont match');

            console.log(error);
        }

    };

    return (
        <div>
            <Button color="primary" onClick={toggle}>Add new Freelancer/Content Editor</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new user</ModalHeader>
                <form className="register-page" onSubmit={submitHandler}>
                    <ModalBody>
                        <FormGroup>
                            <label>Email</label>
                            <Input
                                placeholder="Type Email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={e => setemail(e.target.value)}

                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Password</label>
                            <Input
                                placeholder="Type Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setpassword(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Confirm Password</label>
                            <Input
                                placeholder="Type Password"
                                type="password"
                                name="password2"
                                value={password2}
                                onChange={e => setpassword2(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>role</Label>
                            <select name="role" value={role}  onChange={e => setrole(e.target.value)} className="form-control">
                                <option selected>Choose...</option>
                                <option>Freelancer</option>
                                <option>Content Editor</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label>site</Label>
                            <select name="website" value={website}  onChange={e => setwebsite(e.target.value)} className="form-control">
                                <option selected>Choose...</option>
                                {sites.map(site => <option value={site._id}>{site.a}</option>)}
                            </select>

                        </FormGroup>
                        <FormGroup>
                            <Label>function</Label>
                            <select name="functionn" value={functionn}  onChange={e => setfunctionn(e.target.value)} className="form-control">
                                <option selected>Choose...</option>
                                <option>Blog  Editor</option>
                                <option>Product Page Editor</option>
                            </select>
                        </FormGroup>
                        <div className="alert-danger">
                            {error}
                        </div>
                        <div className="alert-primary">
                            {succes}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >Add</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>

            </Modal>
        </div>
    );
};

export default Register2;
