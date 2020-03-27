/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState , state } from 'react';
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Label} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import jwt_decode from "jwt-decode";
import loginn from "../../services/Login/Login";

const Register2 = ({sites}) => {


    const [modal, setModal] = useState(false);
    const [Email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setrole] = useState("");

    const toggle = () => setModal(!modal);
    const changeHandler = (e) => {
        console.log(sites);
        e.target.name = e.target.value;
    };

    const submitHandler = (e) => {

    };


    return (
        <div>
            <Button color="primary" onClick={toggle}>Add new Freelancer/Content Editor</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new user</ModalHeader>
                <form className="register-page" onSubmit={submitHandler}>
                    <ModalBody>
                        <FormGroup>
                            <Label>First Name                  </Label>
                            <Input type="email" class="form-control"  placeholder="Email" id="email" name="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label>last name</Label>
                            <Input type="email"  className="form-control" placeholder="Email" id="email" name="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="email" placeholder="Email" id="email" name="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" placeholder="password" id="password" name="password"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>role</Label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose...</option>
                                <option>Freelancer</option>
                                <option>Content Editor</option>
                                <option>Content coordinator</option>
                                <option>Content director</option>
                                <option>Sales manager</option>
                                <option>Administrator</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label>site</Label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose...</option>
                                {sites.map(site => <option>{site.a}</option>)}
                            </select>

                        </FormGroup>
                        <FormGroup>
                            <Label>function</Label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose...</option>
                                <option>Blog</option>
                                <option>Product</option>
                            </select>
                        </FormGroup>

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
