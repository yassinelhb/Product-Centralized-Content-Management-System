/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import Label from "reactstrap/es/Label";
import PropertyService from "../../services/product/ProductProperty.service";

const AddProductProperty = (props) => {

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subTypes, setSubTypes] = useState([]);
  const [newSubTypes, setNewSubTypes] = useState([]);
  const [type, setType] = useState("");
  const [ss, setSS] = useState("");

  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {name:name,description:description,type:type,subType:newSubTypes};
    console.log(data);
    PropertyService.create(data)
        .then( res => {
          props.refreshTable();
          toggle();
        })
  };
  useEffect(() => {
    SubTypeService.getAll()
        .then( res => {
          setSubTypes(res)
        })

  },[ss]);

    function multiSelectHandler(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setNewSubTypes(value);

    }

    return (
      <div>
        <Button color="primary" onClick={toggle}>Add</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add new product property</ModalHeader>
          <form onSubmit={submitHandler}>
            <ModalBody>

              <FormGroup>
                <label>Name</label>
                <Input
                    placeholder="property Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}

                />
              </FormGroup>
              <FormGroup>
              <label>Description</label>
              <Input
                  placeholder="property description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}

              />
            </FormGroup>
              <FormGroup>

              <label>type</label>
              <Input
                  placeholder="property type"
                  type="text"
                  name="description"
                  value={type}
                  onChange={e => setType(e.target.value)}

              />
            </FormGroup>

              <FormGroup>
                <Label for="typeSelect">Product SubType</Label>
                <Input onChange={e => multiSelectHandler(e)} multiple={true} type="select" name="type" id="typeSelect" >

                  {
                    subTypes.length ?
                        subTypes.map(Type => <option value={Type._id}>{Type.name}</option>) :
                        null
                  }
                </Input>
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

export default AddProductProperty;
