/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Label} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import jwt_decode from "jwt-decode";
import loginn from "../../services/Login/Login";
import register from "../../services/User/register";

const Register3 = ({sites}) => {



    const [modal, setModal] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setrole] = useState("");
    const [website, setwebsite] = useState("");

    const toggle = () => setModal(!modal);
    const changeHandler = (e) => {
        e.target.name = e.target.value;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const data = {"email":email,"password":password, "role":role,"website":website, "token":token};
        console.log(data);
        register.register(data).then( res => {
            console.log(res);
        })
    };

    return (
        <div>
            <Button color="primary" onClick={toggle}>Add new content coordinator/ sales manages </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new user</ModalHeader>
                <form className="register-page" onSubmit={submitHandler} >
                    <ModalBody>
                        <FormGroup>
                            <label>Email</label>
                            <Input
                                required
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
                                required
                                placeholder="Type Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setpassword(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>role</Label>
                            <select required name="role" value={role}  onChange={e => setrole(e.target.value)} className="form-control">
                                <option selected>Choose...</option>
                                <option>Sales manager</option>
                                <option>Content coordinator</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label>site</Label>
                            <select required name="website" value={website}  onChange={e => setwebsite(e.target.value)} className="form-control" >
                                <option selected>Choose...</option>
                                {sites.map(site => <option value={site._id}>{site.a}</option>)}
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
