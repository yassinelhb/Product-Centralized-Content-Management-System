/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Label} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import jwt_decode from "jwt-decode";
import loginn from "../../services/Login/Login";

const Register3 = () => {



    const [modal, setModal] = useState(false);
    const [Email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setrole] = useState("");

    const toggle = () => setModal(!modal);
    const changeHandler = (e) => {
        e.target.name = e.target.value;
    };



    return (
        <div>
            <Button color="primary" onClick={toggle}>Add new content coordinator/ sales manages </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new user</ModalHeader>
                <form >
                    <ModalBody>
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
                                <option>Content coordinator</option>
                                <option>Sales manager</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label>site</Label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose...</option>




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

export default Register3;
