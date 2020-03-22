import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

class Header extends React.Component {

    constructor() {
        super();
    }

    useLayoutClick = () => {
        this.props.useLayout()
    }

    render() {
        const { layout, component, page } = this.props
        return (
            <nav className="navbar navbar-expand-md navbar-editor navbar-dark fixed-top">
                <a className="navbar-brand" href="#">
                    <i className="nc-icon nc-minimal-left"></i>
                </a>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        { component === 'pageEditor' &&  <span>{ page.page_name }</span> }
                    </ul>
                    <div className="navbar-button mt-md-0">
                        { component === 'pageEditor' ?
                            <>
                                <button className="btn btn-outline-info" disabled>Preview</button>
                                <button className="btn btn-info">Save...</button>
                                <button className="btn toggle-menu">
                                <i className="nc-icon nc-settings-gear-65"></i>
                                </button>
                            </> : <button className="btn btn-info" onClick={ this.useLayoutClick }>Use { layout.layout_name } layout</button>
                        }

                    </div>
                </div>
            </nav>
        );
    }

}

export default Header;
