import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Category from "../../theme/theme1/views/category";
import Header from "../block-editor/components/header";
import Sidebar from "../block-editor/components/sidebar";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import { MoviesData, renderMovieTitle } from './country-data';
import Autocomplete from 'react-autocomplete';
import ScriptTag from 'react-script-tag';
import '../../assets/scss/websiteListe';
import '../../assets/css/WebsiteListe.css';
class Web_add extends React.Component {
    Styleherder= ()=>{
        return{

            backgroundColor : '#2926EA' ,
            color : 'white',

            border : '50 px',
            padding : '52 px  19px',

            textAlign :'center'


        }
    };

    render() {
        return (

<div className="row">
<div className="col-md-12 nav-link" style={this.Styleherder()}  >Add Website form</div>



        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet"/>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>






    <div className="col-md-8">
        <div className="card-user card">
            <div className="card-header"><h5 className="card-title">Add Website</h5></div>
            <div className="card-body">
                <form className="">
                    <div className="row">
                        <div className="pr-1 col-md-5">
                            <div className="form-group"><label>Website name</label><input disabled=""
                                                                                                placeholder="Website"
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                value="Creative Code Inc."/>
                            </div>
                        </div>

                        <div className="autocomplete-wrapper">
                            <h3>React Autocomplete Demo</h3>
                            <Autocomplete
                                value={this.state.val}
                                items={MoviesData()}
                                getItemValue={item => item.title}
                                shouldItemRender={renderMovieTitle}
                                renderMenu={item => (
                                    <div className="dropdown">
                                        {item}
                                    </div>
                                )}
                                renderItem={(item, isHighlighted) =>
                                    <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                                        {item.title}
                                    </div>
                                }
                                onChange={(event, val) => this.setState({ val })}
                                onSelect={val => this.setState({ val })}
                            />
                        </div>
                        <div className="px-1 col-md-3">
                            <div className="form-group"><label>Username</label><input placeholder="Username" type="text"
                                                                                      className="form-control"
                                                                                      value="michael23"/></div>
                        </div>
                        <div className="pl-1 col-md-4">
                            <div className="form-group"><label htmlFor="exampleInputEmail1">Email address</label><input
                                placeholder="Email" type="email" className="form-control"/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="pr-1 col-md-6">
                            <div className="form-group"><label>First Name</label><input placeholder="Company"
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        value="Chet"/></div>
                        </div>
                        <div className="pl-1 col-md-6">
                            <div className="form-group"><label>Last Name</label><input placeholder="Last Name"
                                                                                       type="text"
                                                                                       className="form-control"
                                                                                       value="Faker"/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group"><label>Address</label><input placeholder="Home Address"
                                                                                     type="text"
                                                                                     className="form-control"
                                                                                     value="Melbourne, Australia"/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="pr-1 col-md-4">
                            <div className="form-group"><label>City</label><input placeholder="City" type="text"
                                                                                  className="form-control"
                                                                                  value="Melbourne"/></div>
                        </div>
                        <div className="px-1 col-md-4">
                            <div className="form-group"><label>Country</label><input placeholder="Country" type="text"
                                                                                     className="form-control"
                                                                                     value="Australia"/></div>
                        </div>
                        <div className="pl-1 col-md-4">
                            <div className="form-group"><label>Postal Code</label><input placeholder="ZIP Code"
                                                                                         type="number"
                                                                                         className="form-control"/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group"><label>About Me</label><textarea className="form-control">Oh so, your weak rhyme You doubt I'll bother, reading into it</textarea>
                            </div>
                        </div>
                    </div>
                    <div className="field" align="left">
                        <h3>Upload your images</h3>
                        <input type="file" id="files" name="files[]" multiple/>
                    </div>
                    <div className="row">
                        <div className="update ml-auto mr-auto">
                            <button type="submit" className="btn-round btn btn-primary">Update Profile</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>


</div>

        )

    }

}

export default Web_add;
