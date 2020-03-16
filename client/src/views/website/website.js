import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";


class Website extends React.Component {

    render() {

        return (
            <div className="wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarNavDropdown" className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>

                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="http://example.com"
                                   id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                   aria-expanded="false">
                                    Dropdown
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="{{ url('/login') }}">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="{{ url('/register') }}">Register</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

}

export default Website;
