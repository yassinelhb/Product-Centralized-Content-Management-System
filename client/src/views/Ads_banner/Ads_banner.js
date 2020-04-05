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
import web_serv from "../../services/website.service";
import AddAds_banner from "./AddAds_banner";
import UpdateAds_banner from "./UpdateAds_banner";
import SubTypeService from "../../services/product/ProductSubType.service";


class Ads_banner extends React.Component {
    Styleimage= ()=>{
        return{
        padding: '5px',
        width: '150px',
        }
    };
      border ='solid'
      banner_update =""
    Styleborder= (e)=>{

        if(e==this.banner_update){ return{
            border : this.border
        }}
        else
        {return{
            background :''  }

        }
    };
    Stylesacane= (e)=>{
        if(e==true){ return{
            background :'#96F70A'

        }}
        else
        {return{
            background :'#F1130D'  }

        }
    };
    buttonstyle= (e)=>{
        return{
           "display":e
        }
    };

     etat ='none';
     side_id ='';
     id_banner=' '


    constructor() {
        super();

        let data =sessionStorage.getItem('webselect');
        this.data = JSON.parse(data);

        if(this.data != null )
        {
            this.etat=''
            this.side_id = this.data._id;
            this.banner_update = this.data.ads_banners;

        }
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
        alert ( this.banner_update )
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

    addToWebsiteHandler(ads) {
        const data = {"ads_banners":ads._id } ;
        console.log(data);
        web_serv.update_ads(data,this.side_id)
        this.banner_update=  ads._id;

        Ads_serv.getAll()
            .then( res => {
                this.setState({
                    ads_banner : res
                });
            });


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
                                    <CardTitle tag="h4">Ads_banners</CardTitle>
                                    <AddAds_banner refreshTable={this.refreshTable}/>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Actions</th>

                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            ads_banner.length ?
                                                ads_banner.map(ads_banner => <tr key={ads_banner._id}> <td style={this.Stylesacane(ads_banner.Valide_ads)}>{ads_banner.Ads_banner_name}</td><td style={this.Styleborder(ads_banner._id)}>{ads_banner.description}</td>
                                                    <td >

                                                    <img className="group list-group-image" style={this.Styleimage()}
                                                         src={require("assets/img/" + ads_banner.Ads_img)}/>
                                                    </td>
                                                    <td><div className="row"><UpdateAds_banner refreshTable={this.refreshTable} typeId={ads_banner._id}/> <Button color="danger"  onClick={() =>this.deleteHandler(ads_banner._id)} >Delete</Button><Button color="success"  style={this.buttonstyle(this.etat)} onClick={() =>this.addToWebsiteHandler(ads_banner)} >Add to website</Button></div></td></tr>) :
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
