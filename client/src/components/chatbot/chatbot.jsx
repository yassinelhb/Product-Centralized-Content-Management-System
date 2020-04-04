/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input
} from "reactstrap";

import routes from "routes.js";
import '../../assets/css/ads_front.css';
import ChatBot from 'react-simple-chatbot';

class chatbot extends React.Component {

    render() {
        return (

            <ChatBot
                steps={[

                    {
                        id: '1',
                        message: 'What is your name?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Hi {previousValue}, nice to meet you!',
                        trigger: '4',
                    },

                    {
                        id: '4',
                        message: 'What ur occupation?',
                        trigger: '5',
                    },
                    {
                        id: '5',
                        options: [
                            { value: 1, label: 'student', trigger: '6' },
                            { value: 2, label: 'businessman', trigger: '7' },
                            { value: 3, label: 'normal employee', trigger: '8' },
                        ],
                    },
                    {
                        id: '6',
                        message: 'you are a student, so  we have some wonderful bank offer that can give u many advantage',
                        end: true,
                    },
                    {
                        id: '7',
                        message: 'you are a businessman,  great so  we have some Special bank offer that can give u many advantage',
                        end: true,
                    },
                    {
                        id: '8',
                        message: 'you are a normal employee ,  so  we have some Special bank offer that can help and give u many advantage',
                        end: true,
                    },

                ]}
            />
        );
    }
}

export default chatbot;
