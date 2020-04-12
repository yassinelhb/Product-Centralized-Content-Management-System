
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
import {Link} from "react-router-dom";
import SubTypeService from "../../services/product/ProductSubType.service";
import PropertyService from "../../services/product/ProductProperty.service";
import ProductService from "../../services/product/Product.service";
import Image from "react-bootstrap/Image";
import {Redirect} from "react-router";


class Products extends React.Component {
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
      products: [],
      websiteId: '',
      countrycode: '',
      redirect: false

    };
  }


  componentDidMount() {
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    if(this.data != null ) {
      console.log(this.data._id);
      this.setState({
        websiteId: this.data._id,
        countrycode: this.data.Contry,
      });
      ProductService.findByWebsite(this.data._id)
          .then(res => {
            this.setState({
              products: res
            });
          })
    }
  }
  refreshTable = () => {
    ProductService.findByWebsite(this.state.websiteId)
        .then( res => {
          this.setState({
            products : res
          });
        });

  };
  deleteHandler(id) {
    ProductService.removeFromWebsite(id,this.state.websiteId)
        .then( res => {
          this.setState({
            products : this.state.products.filter(t => t._id !== id)
          });
        })

  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/admin/product/add' />
    }
  }
  render() {
    const { products } = this.state ;
    return (
        <>
          {this.renderRedirect()}
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Products </CardTitle>
                    <Button color="success" onClick={this.setRedirect} > Add  </Button>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>sub-Type</th>
                        <th>bank Link</th>
                        <th>Picture</th>
                        <th>Actions</th>

                      </tr>
                      </thead>
                      <tbody>

                      {
                        products.length ?
                            products.map(product => <tr key={product._id}> <td>{product.title}</td><td>{product.subType.name}</td><td>{product.bankLink}</td>
                              <td>    <img src="http://localhost:3001/product/getPicture/1586281664321-0.png" style={{width: "50px",height:"50px"}}  /> </td>
                              <td><div className="row"><Button color="danger"  onClick={() =>this.deleteHandler(product._id)} >Delete</Button></div></td></tr>) :
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

export default Products;