/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import Ads_serv from "../../services/Ads_banner/Ads_banner.service";

import Label from "reactstrap/es/Label";
import {Link} from "react-router-dom";
import '../../assets/scss/websiteListe';
import '../../assets/css/Ads.css';


const AddAds_banner = (props) => {


    const [modal, setModal] = useState(false);
    const [Ads_banner_name, setAds_banner_name] = useState("");
    const [description, setDescription] = useState("");
    const [Ads_img, setAds_img] = useState([]);
    const [Valide_ads, setValide_ads] = useState("");
    const [ss, setSS] = useState("");

    const toggle = () => setModal(!modal);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {Ads_banner_name:Ads_banner_name,description:description,Ads_img:Ads_img , Valide_ads :Valide_ads} ;
        console.log(data);
        Ads_serv.create(data)
            .then( res => {
                props.refreshTable();
                toggle();
            })
    };


    return (
        <div>
            <Button color="primary" onClick={toggle}>Add</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new ads </ModalHeader>
                <form onSubmit={submitHandler}>
                    <ModalBody>

                        <FormGroup>
                            <label>Name</label>
                            <Input
                                placeholder="Type Name"
                                type="text"
                                name="name"
                                value={Ads_banner_name}
                                onChange={e => setAds_banner_name(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Description</label>
                            <Input
                                placeholder="Type description"
                                type="text"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Valide_ads</label>

                            <select id="cars" name="Valide_ads">
                                <option value="true"  onChange={e => setValide_ads(e.target.value)}>True</option>
                                <option value="false"  onChange={e => setValide_ads(e.target.value)}>False</option>

                            </select>
                        </FormGroup>


                        <FormGroup >


                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Upload Image</label>
                                        <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Browse… <input type="file" id="imgInp"/>
                </span>
            </span>
                                            <input type="text" name="Ads_img"
                                                   value={Ads_img}
                                                   onChange={e => setAds_img(e.target.value)}
                                                   className="form-control" readOnly/>

                                        </div>
                                        <img id='img-upload'/>
                                    </div>
                                </div>
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

export default AddAds_banner;
