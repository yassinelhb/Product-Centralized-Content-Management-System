import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link, withRouter   } from "react-router-dom";
import Category from "../../theme/theme1/views/category";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import servicePage from "../../services/page.service";
import serviceSite from "../../services/website.service";



class PageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            website : '',
            alert : ''
        }
    }

    loadComponent() {

        const { page, website } = this.state

        const Component = React.lazy(() => import('../../theme/'+ website.theme.theme_name + '/views/' + page.layout.layout_name))
        return <Component page = { page } editor = { false } handle = { this.handleChange } />

    }

    handleChange = (page) => {
        this.setState({
            page: page,
            alert : ''
        })
    }

    componentDidMount() {
        serviceSite.webSite()
            .then( res =>
                this.setState({
                    website : res
                })
            )
    }

    savePage = () => {

        if ( !this.state.page._id ) {
            servicePage.addPage( this.state.page )
                .then(res => {
                    res.message ?
                        this.setState({
                            alert : res.message
                        })
                        :
                        this.setState({
                            page: res
                        }, () =>  this.props.history.push('/block-editor/' + this.state.page._id ))
                })

        } else {

            servicePage.editPage( this.state.page )
                .then(res => {
                    res.message ?
                        this.setState({
                            alert : res.message
                        })
                        :
                        this.setState({
                            page: res
                        })
                })
        }

    }


    render() {
        const { page, errors, website, alert } = this.state
        return (
            <div className="wrapper-editor">
                <Header component="pageEditor" page={ page } save = { () => this.savePage() } />
                <Sidebar  page={ page }  handle = { this.handleChange } errors = { errors } />
                <div className="content-editor">
                    {
                        alert &&

                        <div className="alert alert-danger">
                            { alert }
                        </div>
                    }

                    <Suspense fallback={<div>Loading ...</div>}>
                        { website.theme && this.loadComponent() }
                    </Suspense>
                </div>
            </div>
        );
    }

}

export default withRouter(PageEditor);
