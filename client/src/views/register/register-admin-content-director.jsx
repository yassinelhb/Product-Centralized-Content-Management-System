/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";

const Register1 = () => {



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
            <Button color="primary" onClick={toggle}>Add new Administrator/Content director</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new user</ModalHeader>
                <form >
                    <ModalBody>


                        <FormGroup>
                            <label>Email</label>
                            <Input
                                placeholder="Type Email"
                                type="text"
                                name="Email"
                                value={Email}
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
                            <label>Role</label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose...</option>
                                <option>Content director</option>
                                <option>Administrator</option>
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

export default Register1;
