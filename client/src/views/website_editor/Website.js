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
import Web_serv from "../../services/website.service";
import AddWebsite from "./AddWebsite";
import UpdateWebsite from "./UpdateWebsite";
import UpdateProductType from "../productType/UpdateProductType";


class Website extends React.Component {
    Styleimage= ()=>{
        return{
            padding: '5px',
            width: '150px',
        }
    };
    constructor() {
        super();
        this.state = {
            website: [],


        };
    }


    componentDidMount() {

        Web_serv.getAll()
            .then( res => {
                this.setState({
                    website : res
                });
            })
    }
    refreshTable = () => {
        Web_serv.getAll()
            .then( res => {
                this.setState({
                    website : res
                });
            });
        /*
       console.log(this.state.ads_banner);
        console.log(subtype);
             this.setState({
                ads_banner : this.state.ads_banner.push(subtype)
              });
    */
    };
    deleteHandler(id) {
        Web_serv.delete(id)
            .then( res => {
                this.setState({
                    website : this.state.website.filter(t => t._id !== id)
                });
            })

    }
    addToWebsiteHandler(type) {
        Web_serv.assignTypeToWebsite(type)
            .then( res => {
                console.log(res);
            })

    }
    render() {
        const { website } = this.state ;
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">website</CardTitle>
                                    <AddWebsite refreshTable={this.refreshTable}/>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Name</th>
                                            <th>Contry</th>
                                            <th>Image</th>
                                            <th>Actions</th>

                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            website.length ?
                                                website.map(website => <tr key={website._id}> <td>{website.site_name}</td><td>{website.Contry}</td>
                                                    <td>

                                                        <img className="group list-group-image" style={this.Styleimage()}
                                                             src={require("assets/img/" + website.logo_pic)}/>
                                                    </td>
                                                    <td><div className="row"> <Button color="danger"  onClick={() =>this.deleteHandler(website._id)} >Delete</Button><Button color="success"  onClick={() =>this.addToWebsiteHandler(website)} >Add to website</Button></div></td></tr>) :
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

export default Website;
