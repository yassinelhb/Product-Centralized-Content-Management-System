import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link, withRouter   } from "react-router-dom";
import Category from "../../theme/theme1/views/category";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import servicePage from "../../services/page.service";



class PageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            website: props.website,
            page: props.page,
            errors : {}
        }
    }

    loadComponent() {
        const { website, page } = this.state
        const Component = React.lazy(() => import('../../theme/'+this.state.website.theme.theme_name+'/views/' + this.state.page.layout.layout_name))
        return <Component page = { page } website = { website } editor = { false } setPage = { this.pageChange } />
    }

    handleChange = (page, errors) => {
        this.setState({
            page: page,
            errors: errors
        })
    }

    savePage = () => {

        if ( !this.state.page._id ) {
            servicePage.addPage( this.state.page )
                .then(res => {
                    res.message === 'already exist' ?
                        this.setState({
                            errors : {
                                page_name : 'required'
                            }
                        })
                        :
                        this.setState({
                            page: res
                        }, () =>  this.props.history.push('/block-editor/' + this.state.page._id ))
                })

        } else {

            servicePage.editPage( this.state.page )
                .then(res => {
                    this.setState({
                        page: res
                    })
                })
        }

    }

    render() {
        const { page, errors } = this.state
        return (
            <div className="wrapper-editor">
                <Header component="pageEditor" page={ page } save = { () => this.savePage() } />
                <Sidebar  page={ page }  handle = { this.handleChange } errors = { errors } />
                <div className="content-editor">
                    <Suspense fallback={<div>Loading ...</div>}>
                        { this.loadComponent() }
                    </Suspense>
                </div>
            </div>
        );
    }

}

export default withRouter(PageEditor);
