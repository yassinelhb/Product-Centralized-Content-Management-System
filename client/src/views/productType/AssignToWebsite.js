/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import PropertyService from "../../services/product/ProductProperty.service";
import index from "react-chartjs-2";
const AssignToWebsite = (props) => {




    const {typeId,type,website,websiteId} =props;
  const [modal, setModal] = useState(false);
  const [subTypeIndex, setIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [labels, setLabels] = useState([]);
  const toggle = () => {setModal(!modal);setIndex(0);};
  const next = () => setIndex(subTypeIndex + 1);

  const submitHandler = (e) => {

    e.preventDefault();
      console.log(websiteId);
      TypeService.assignTypeToWebsite(type,website._id)
          .then( res => {
              console.log(res);
              PropertyService.createMany(labels)
                  .then( res => {
                      console.log(res);
                  });
              toggle();
              console.log(labels);
          })
  };

    function  changeHandler(e,property) {

        console.log(labels);
       labels.map((l,i) =>{
             if( l.property === property._id){
            l.label = e.target.value;

             }

         });
        setLabels(labels);
        console.log(labels)


    }
  useEffect(() => {
      console.log(website);
    SubTypeService.getByType(typeId)
        .then( res => {
            console.log(res);
          res.map((subType,index)=>{
              console.log(subType);
              if(index === subTypeIndex){
                  PropertyService.getBySubType(subType._id).then(properties =>{
                      setProperties(properties) ;
                      properties.map(p=>{
                      const label = {label:'',property:p._id,website:website._id};
                          labels.push(label);



                      });
                      setLabels(labels);
                      }
                  );
              }
          })
        })

  },[typeId,subTypeIndex]);
  return (
      <div>
        <Button color="primary" onClick={toggle}  >Assign to website</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Assign to website</ModalHeader>
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
                  (subTypeIndex !== properties.length) ?
                      <Button color="primary" onClick={next}> next</Button> :
                  null
              }
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
      </div>
  );
};

export default AssignToWebsite;
