
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
import TypeService from "../../services/product/ProductType.service";
import AddProductType from "./AddProductType";
import UpdateProductType from "./UpdateProductType";
import AssignToWebsite from "./AssignToWebsite";

class productTypes extends React.Component {




  constructor() {
    super();

    this.state = {
      types: [],
      website:{},
      websiteId:''

    };
  }


  componentDidMount() {
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    console.log(this.data);
    if(this.data != null )
    {


    this.state = {
      website:this.data,
      websiteId:this.data._id
    };}
    TypeService.getAll()
        .then( res => {
          this.setState({
            types : res,
            website:this.data,
            websiteId:this.data._id
          });
        })
  }
  deleteHandler(id) {
    TypeService.delete(id)
        .then( res => {
          this.setState({
            types : this.state.types.filter(t => t._id !== id)
          });
        })

  }

  render() {
    const { types,website } = this.state ;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Product Types</CardTitle>
                  <AddProductType/>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>

                      </tr>
                    </thead>
                    <tbody>

                      {
                        types.length ?
                            types.map(type => <tr key={type._id}> <td>{type.name}</td><td>{type.description}</td><td><div className="row"><UpdateProductType typeId={type._id} /> <Button color="danger"  onClick={() =>this.deleteHandler(type._id)} >Delete</Button><AssignToWebsite type={type} typeId={type._id} websiteId={this.state.websiteId}   website={website}   /></div></td></tr>) :
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

export default productTypes;
