
import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col, Button
} from "reactstrap";

import SubTypeService from "../../services/product/ProductSubType.service";
import AddProductSubType from "../productSubType/AddProductSubType";
import UpdateProductSubType from "../productSubType/UpdateProductSubType";
import PropertyService from "../../services/product/ProductProperty.service";
import UpdateProductProperty from "./UpdateProductProperty";
import AddProductProperty from "./AddProductProperty";
class productProperties extends React.Component {
  buttonstyle= (e)=>{
    return{
      "display":e
    }
  };
  etat ='none';
  constructor(props) {
    super(props);
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    if(this.data != null )
    {
      this.etat=''
    }
    this.state = {
      properties: [],


    };
  }


  componentDidMount() {

    PropertyService.getAll()
        .then( res => {
          this.setState({
            properties : res
          });
        })
  }
  refreshTable = () => {
    PropertyService.getAll()
        .then( res => {
          this.setState({
            properties : res
          });
        });

  };
  deleteHandler(id) {
    PropertyService.delete(id)
        .then( res => {
          this.setState({
            properties : this.state.properties.filter(t => t._id !== id)
          });
        })

  }
  addToWebsiteHandler(type) {
    PropertyService.assignTypeToWebsite(type)
        .then( res => {
          console.log(res);
        })

  }
  render() {
    const { properties } = this.state ;
    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Product Types</CardTitle>
                    <AddProductProperty refreshTable={this.refreshTable}/>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Product SubType</th>
                        <th>Actions</th>

                      </tr>
                      </thead>
                      <tbody>

                      {
                        properties.length ?
                            properties.map(property => <tr key={property._id}> <td>{property.name}</td><td>{property.description}</td><td>{property.type}</td>
                              <td><ul>{property.subType.length ? property.subType.map(subtype => <li> {subtype.name} </li> )  : null}</ul></td>
                              <td><div className="row"><UpdateProductProperty refreshTable={this.refreshTable} propertyId={property._id}/> <Button color="danger"  onClick={() =>this.deleteHandler(property._id)} >Delete</Button><Button color="success" style={this.buttonstyle(this.etat)} onClick={() =>this.addToWebsiteHandler(property)} >Add to website</Button></div></td></tr>) :
                            null
                      }





                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

        </>
    );
  }




}

export default productProperties;
