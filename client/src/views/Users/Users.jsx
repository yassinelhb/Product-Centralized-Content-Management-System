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


class Users extends React.Component {

    constructor() {
        super();
        this.state = {
            userss: [],


        };
    }
        componentDidMount(){
            const token = localStorage.getItem("token");

            user.getAll(token)
                .then( res => {
                    this.setState({
                        userss : res

                    });
                })
        }

    render() {
        const { userss } = this.state ;

        return(


            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Users</CardTitle>
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
                                                    <td>{users.role}</td>
                                                    {users.Statut==="activated" &&
                                                        <td> {users.Statut}  </td>

                                                    }
                                                    {users.Statut==="desactivated" &&
                                                    <td> {users.Statut}  </td>



                                                    }
                                                    <td><EditUser typeId={users._id}/></td>



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
