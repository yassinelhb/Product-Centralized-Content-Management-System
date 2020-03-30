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
import Ads_serv from "../../services/Ads_banner/Ads_banner.service";
import AddAds_banner from "./AddAds_banner";
import UpdateAds_banner from "./UpdateAds_banner";


class Ads_banner extends React.Component {

    constructor() {
        super();
        this.state = {
            ads_banner: [],


        };
    }


    componentDidMount() {

        Ads_serv.getAll()
            .then( res => {
                this.setState({
                    ads_banner : res
                });
            })
    }
    refreshTable = () => {
        Ads_serv.getAll()
            .then( res => {
                this.setState({
                    ads_banner : res
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
        Ads_serv.delete(id)
            .then( res => {
                this.setState({
                    ads_banner : this.state.ads_banner.filter(t => t._id !== id)
                });
            })

    }
    addToWebsiteHandler(type) {
        Ads_serv.assignTypeToWebsite(type)
            .then( res => {
                console.log(res);
            })

    }
    render() {
        const { ads_banner } = this.state ;
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Product Types</CardTitle>
                                    <AddAds_banner refreshTable={this.refreshTable}/>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Product Type</th>
                                            <th>Actions</th>

                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            ads_banner.length ?
                                                ads_banner.map(ads_banner => <tr key={ads_banner._id}> <td>{ads_banner.Ads_banner_name}</td><td>{ads_banner.description}</td><td>{ads_banner._id}</td><td><div className="row"> <Button color="danger"  onClick={() =>this.deleteHandler(ads_banner._id)} >Delete</Button><Button color="success"  onClick={() =>this.addToWebsiteHandler(ads_banner)} >Add to website</Button></div></td></tr>) :
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

export default Ads_banner;
