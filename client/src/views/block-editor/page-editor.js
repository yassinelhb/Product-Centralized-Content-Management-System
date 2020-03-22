import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Category from "../../theme/theme1/views/category";
import Header from "./components/header";
import Sidebar from "./components/sidebar";


class PageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            website : props.website,
            page : props.page
        }
    }

    loadComponent() {
        const Component = React.lazy(() => import('../../theme/'+this.state.website.theme.theme_name+'/views/' + this.state.page.layout.layout_name))
        return <Component/>
    }


    render() {
        return (
            <div className="wrapper-editor">

                <Header component="pageEditor" page={ this.state.page }/>
                <Sidebar  page={ this.state.page } />
                <div className="content-editor">
                    <Suspense fallback={<div>Loading ...</div>}>
                        { this.loadComponent() }
                    </Suspense>
                </div>
            </div>
        );
    }

}

export default PageEditor;
