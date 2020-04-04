import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";

const EditUser = (props) => {

    const {typeId} =props;
    const [modal, setModal] = useState(false);
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="warning" onClick={toggle}>Update</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new product type</ModalHeader>
                <form >
                    <ModalBody>

                        <FormGroup>
                            <label>Name</label>
                            <Input
                                placeholder="Type Name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Description</label>
                            <Input
                                placeholder="Type description"
                                type="text"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}

                            />
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

export default EditUser;
