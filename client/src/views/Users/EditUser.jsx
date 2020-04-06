import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Label} from 'reactstrap';
import userService from "../../services/User/user.js";
import TypeService from "../../services/product/ProductType.service";

const EditUser = (props) => {

    const {typeId} =props;
    const {userss} =props;
    const [modal, setModal] = useState(false);
    const [username, setusername] = useState(" ");
    const [email, setemail] = useState(" ");
    const [website, setwebsite] = useState("");
    const [password, setpassword] = useState("");
    const [password2, setpassword2] = useState("");
    const [error, seterror] = useState("");

    const [Statut, setStatut] = useState("");
    const [change, setchange] = useState("False");

    const toggle = () => setModal(!modal);
const changee = () => {

    setchange("True");
    seterror("");

}
    const submitHandlerr = (e) => {
        e.preventDefault();
        console.log(password2);
        console.log(password);
        console.log("/////" +error);
        if(password === password2) {
            const data = {
                "username": username,
                "email": email,
                "website": website,
                "Statut": Statut,
                "password": password
            };
            console.log(data);
            userService.update(data, typeId)
                .then(res => {
                    console.log(res);
                })
        }
        else{
            seterror("password don't match");
        }
    };
    useEffect(() => {
        userService.getOneById(typeId)
            .then( res => {
                setusername(res.username);
                setemail(res.email);
                setwebsite(res.website);
                setStatut(res.Statut);
                setpassword(res.password);
                setpassword2(res.password);

            })

    },[typeId]);
    return (
        <div>
            <Button color="warning" onClick={toggle}>Edit </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit User</ModalHeader>
                <form onSubmit={submitHandlerr}>
                    <ModalBody>

                        <FormGroup>
                            <label>User name</label>
                            <Input
                                placeholder="Type UserName"
                                type="text"
                                name="username"
                                value={username}
                                onChange={e => setusername(e.target.value)}

                            />
                        </FormGroup>
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
                            <Label>Website</Label>
                            <select required name="website" value={website}  onChange={e => setwebsite(e.target.value)} className="form-control"  >
                                {userss.map(users => <option value={users._id}>{users.site_name}</option>)}
                            </select>

                        </FormGroup>
                        <FormGroup>
                            <Label>Statut</Label>
                            {Statut === "activated" &&
                            <select required name="website" value={Statut} onChange={e => setStatut(e.target.value)}
                                    className="form-control">
                                <option selected>{Statut}</option>
                                <option>desactivated</option>
                            </select>
                            }
                            {Statut === "desactivated" &&
                            <select required name="website" value={Statut} onChange={e => setStatut(e.target.value)}
                                    className="form-control">
                                <option selected>{Statut}</option>
                                <option>activated</option>
                            </select>
                            }
                        </FormGroup>
                        <Button color="primary" type="submit" onClick={changee}>change password</Button>
                        {
                            change ==="True"&&
                            <FormGroup>
                            <label>Password</label>
                            <Input
                            placeholder="Type Password"
                            type="password"
                            name="username"
                            onChange={e => setpassword(e.target.value)}

                            />
                                <label>Confirm Password</label>
                                <Input
                                    placeholder="Type Password"
                                    type="password"
                                    name="username"
                                    onChange={e => setpassword2(e.target.value)}

                                />
                            </FormGroup>


                        }

                            <div className="alert-danger">
                                {error}
                            </div>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >Edit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default EditUser;
