
import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col, Button, Modal, FormGroup, Input, ModalBody, ModalFooter
} from "reactstrap";

import SubTypeService from "../../services/product/ProductSubType.service";
import PropertyService from "../../services/product/ProductProperty.service";
import ProductService from "../../services/product/Product.service";
import Label from "reactstrap/es/Label";
import TypeService from "../../services/product/ProductType.service";
import {Redirect} from "react-router";

class AddProduct extends React.Component {
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
    { this.setState({
      websiteId : this.data._id,
      countrycode : this.data.Contry,
    });
      this.etat=''
    }

    this.state = {
      properties: [],
      imagePreviewUrl: '',
      errors :[],
      types :[],
      subTypes :[],
      websiteId:'',
      countrycode:'',
      product:{},
      redirect: false

    };
  }
   getProperties = (e) => {
     this.setState({
       product: {
         ...this.state.product,
         subType: e.target.value,
       },
     });
    e.preventDefault();
    PropertyService.getBySubType(e.target.value)
        .then( res => {
      this.setState({
        properties : res,

      });
    })
  };
  getSubTypes = (e) => {

    e.preventDefault();
    SubTypeService.getByType(e.target.value)
        .then( res => {
          this.setState({
            subTypes : res
          });
        })
  };
  handleChange = async (e) => {
    console.log( e.target.name);
    this.setState({
      product: {
        ...this.state.product,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: ''
      }
    });
    console.log(this.state.product)
  };
  handleImageChange = (e) => {

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {

      if ( file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' ) {
        reader.onloadend = () => {
          this.setState({

            imagePreviewUrl: reader.result,
            product: {
              ...this.state.product,
              picture: file,
            },
          });
        };

        reader.readAsDataURL(file)
      }
      else {
        this.setState({
          errors: {
            ...this.state.errors,
            theme_img: 'Image (Files allowed: png jpg jpeg)'
          }
        })
      }
    }


  };
   submitHandler = (e) => {
     e.preventDefault();
     const { product } = this.state;
     let formData = new FormData();
     formData.set('title', product.title);
     formData.set('picture', product.picture.name);
     formData.set('subType', product.subType);
     formData.set('bankLink', product.bankLink);
     formData.set('active', false);
     formData.set('sponsored', false);
     formData.set('country_code', this.state.countrycode);

     formData.append('file', product.picture);
     this.state.properties.map(p=>{
       formData.set(p.name, product[p.name]);
     });
        ProductService.create(formData,this.state.websiteId).then(s =>
            this.setState({
          redirect: true
        }));
   };
  componentDidMount() {
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    if(this.data != null )
    {
      console.log(this.data._id);
      this.setState({
        websiteId : this.data._id,
        countrycode : this.data.Contry,
      });
      this.etat='';



      TypeService.getByWebsite(this.data._id)
          .then( res => {
            this.setState({
              types : res
            });
          })
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/admin/products' />
    }
  };
  render() {
    const { properties } = this.state ;
    const { imagePreviewUrl, errors, types,subTypes } = this.state;
    return (
        <>
          {this.renderRedirect()}

          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Add Product </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <form className="" onSubmit={this.submitHandler}>

                      <FormGroup>
                        <label>Title</label>
                        <Input
                            placeholder="title"
                            type="text"
                            name="title"
                            onChange={this.handleChange}

                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Bank Link</label>
                        <Input
                            placeholder="Link"
                            type="text"
                            name="bankLink"
                            onChange={this.handleChange}

                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Image</label>
                        <div className="form_theme row">
                        <div className="col-md-5 ">
                          <div className=" input_file">
                            <input type="file" className="form-control" accept=".png, .jpg, .jpeg" onChange={ this.handleImageChange }/>

                            <div className="file_preview">
                              {
                                imagePreviewUrl ?
                                    <img src={imagePreviewUrl} alt=""/>
                                    :
                                    <p className="input_text">Drag your files here or click in this area</p>

                              }

                            </div>
                          </div>
                          {
                            errors.theme_img &&
                            <span className="text-danger small"> { errors.theme_img } </span>
                          }

                        </div>
                        </div>
                      </FormGroup>

                      <FormGroup>
                        <Label for="typeSelect">Product Type</Label>
                        <Input onChange={this.getSubTypes} type="select" name="type" id="typeSelect">

                          {

                            types.length ?
                                types.map(Type => <option value={Type._id}>{Type.name}</option>) :
                                null
                          }
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="typeSelect">Product Sub-Type</Label>
                        <Input onChange={this.getProperties} type="select" name="type" id="typeSelect">

                          {
                            subTypes.length ?
                                subTypes.map(Type => <option value={Type._id}>{Type.name}</option>) :
                                null
                          }
                        </Input>
                      </FormGroup>

                      {

                        properties.length ?
                            properties.map(property =>
                                <FormGroup>
                                  <label>{property.name} type : {property.type}</label>
                                  <Input
                                      placeholder="title"
                                      type="text"
                                      name={property.name}
                                      onChange={this.handleChange}
                                  />
                                </FormGroup>
                            ) :
                            null
                      }
                      <Button color="primary" type="submit" >Add</Button>{' '}

                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

        </>
    );
  }




}

export default AddProduct;
