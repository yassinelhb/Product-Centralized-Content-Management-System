/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import PropertyService from "../../services/product/ProductProperty.service";
import index from "react-chartjs-2";
import Select from "react-select";
const AssignToWebsite = (props) => {

    const {typeId,type,website,websiteId} =props;
  const [modal, setModal] = useState(false);
  const [display, setDisplay] = useState(true);

    const [subTypeIndex, setIndex] = useState(0);
  const [subTypes, setSubTypes] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [properties, setProperties] = useState([]);
  const [labels, setLabels] = useState([]);
  const toggle2 = () => {setModal(!modal);setIndex(0);};
  const toggle = () => {setModal(!modal);setIndex(0);setOptions([]);};

    const next = () => {
        setIndex(subTypeIndex + 1);
        if(selected != null){
            selected.map((subType,index)=>{
                if(index === subTypeIndex){
                    PropertyService.getBySubType(subType.value).then(properties =>{
                            setProperties(properties) ;
                            properties.map(p=>{
                                const label = {label:'',property:p._id,website:website._id};
                                labels.push(label);



                            });
                            setLabels(labels);
                        }
                    );
                }
            })}

    };
 const addSubTypes  = () => {
setDisplay(false);
     if(selected != null){
         selected.map((subType,index)=>{
             if(index === subTypeIndex){
                 PropertyService.getBySubType(subType.value).then(properties =>{
                         setProperties(properties) ;
                         properties.map(p=>{
                             const label = {label:'',property:p._id,website:website._id};
                             labels.push(label);



                         });
                         setLabels(labels);
                     }
                 );
             }
         })}
 };
  const submitHandler = (e) => {
    e.preventDefault();
      console.log(websiteId);
      TypeService.assignTypeToWebsite(type,website._id,selected)
          .then( res => {
              PropertyService.createMany(labels)
                  .then( res => {
                      console.log(res);
                  });
              toggle();
          })
  };

    function  changeHandler(e,property) {

       labels.map((l,i) =>{
             if( l.property === property._id){
            l.label = e.target.value;

             }

         });
        setLabels(labels);


    }
  useEffect(() => {
      console.log(website);
      setOptions([]);
    SubTypeService.getByType(typeId)
        .then( res => {
            res.forEach(sub => {
                const option = { value: sub._id, label: sub.name };
                options.push(option);

                setOptions(options);

            });

        });

  },[typeId]);
    function multiSelectHandler(e) {
        setSelected(e);


    }
  return (
      <div>
        <Button color="primary" onClick={toggle2}  >Assign to website</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Assign to website</ModalHeader>
            {display ?
                <div>
            <Select
                isMulti
                name="subTypes"
                options={options}
                onChange={e => multiSelectHandler(e)}

            />
            <Button color="primary" onClick={addSubTypes} >Add</Button>
            <hr/>
                </div>:
          <form onSubmit={submitHandler}>
          <ModalBody>

              {
                  properties.length ?
                      properties.map((property,i) =>
            <FormGroup>
              <label>{property.name}</label>
              <Input
                  placeholder="label "
                  type="text"
                  name={i}
                  onChange={e => {changeHandler(e,property);}}

              />
            </FormGroup>
                      )
                      : null
              }

          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" >Add</Button>{' '}

              {
                  (subTypeIndex !== selected.length) ?
                      <Button color="primary" onClick={next}> next</Button> :
                  null
              }
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
          </form>
                }
        </Modal>
      </div>
  );
};

export default AssignToWebsite;
