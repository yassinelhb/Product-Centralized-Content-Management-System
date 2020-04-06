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
import user from "../../services/User/user";
import UpdateProductType from "../productType/UpdateProductType";
import EditUser from "./EditUser";
import loginn from "../../services/Login/Login.js";
import Input from "reactstrap/es/Input";
import FormGroup from "reactstrap/es/FormGroup";



class Users extends React.Component {

    constructor() {
        super();
        this.state = {
            sites:[],
            userss: [],
            search:'',


        };
    }
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
        componentDidMount(){
            const token = localStorage.getItem("token");
            loginn.getAll()
                .then(res => {


                    this.setState({
                        sites: res
                    });
                    console.log(this.state.sites);
                });
            user.getAll(token)
                .then( res => {
                    this.setState({
                        userss : res

                    });
                })
        }

    render() {
        let userss  = this.state.userss.filter(
            (users) => {
                return users.username.indexOf(this.state.search) !== -1;
            }
        ) ;

        return(


            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Users</CardTitle>
                                <Input
                                    placeholder="Search "
                                    type="text"
                                    name="search"
                                    required
                                    onChange={this.handleChange.bind(this)}

                                />
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>role</th>
                                        <th>Website</th>
                                        <th>function</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        userss.length ?
                                            userss.map(users =>
                                                <tr key={users._id}>
                                                    <td>{users.username}</td>
                                                    <td>{users.email}</td>
                                                    <td>{users.role}</td>
                                                    {
                                                        users.website ?

                                                            <td>{users.website.a}</td>:<td>____</td>

                                                    }
                                                    {
                                                        users.function ?

                                                            <td>{users.function}</td>:<td>____</td>

                                                    }
                                                    {users.Statut==="activated" &&
                                                    <td> <Button color="success" >{users.Statut}</Button>  </td>

                                                    }
                                                    {users.Statut==="desactivated" &&
                                                    <td> <Button color="danger" >{users.Statut}</Button> </td>



                                                    }


                                                    <td><EditUser  typeId={users._id} userss={this.state.sites}/></td>



                                                </tr> ) :
                                            null
                                    }





                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        );

    }
}

export default Users;
