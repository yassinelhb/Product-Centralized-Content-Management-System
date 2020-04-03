import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import serviceSite from '../../services/website.service'
import servicePage from '../../services/page.service'
import Category from "../../theme/theme1/views/category";
import NavTools from "../../components/Navbars/NavTools";


class Website extends React.Component {

    constructor() {
        super();
        this.state = {
            website: '',
            pages: ''
        }

    }
   componentDidMount() {
        serviceSite.webSite()
            .then( res => {
            this.setState({
                website : res
            });
        })

       servicePage.getPage()
           .then( res => {
               this.setState({
                   pages : res
               });
           })
   }

   loadHeader() {
        const Header = React.lazy(() => import('../../theme/' + this.state.website.theme.theme_name + '/components/header'))
        return <Header links = { this.state.website.header.links} logo = { this.state.website.logo_pic } pages = { this.state.pages } />
   }

   loadComponent(page) {
       const Componant =  React.lazy(() => import('../../theme/'+ page.website.theme.theme_name +'/views/'+page.layout.layout_name))
       return <Componant page={ page } editor = { true } />
   }


    render() {
        const { pages, website } = this.state
        const router = pages &&
            pages.map((page) =>
                page.layout.layout_name === 'subcategory' ?
                    <Route exact path={`${this.props.match.url}/`+page.productTypePage.page_name + `/` +page.page_name} render={ () => this.loadComponent(page)} key={page._id}/>
                    :
                    <Route exact path={`${this.props.match.url}/`+page.page_name} render={ () => this.loadComponent(page)} key={page._id}/>
            )




         return (
            <div className="wrapper">
                <NavTools/>
                <Suspense fallback={<div>Loading ...</div>}>
                    {  website.header && pages ? this.loadHeader(): ''}
                </Suspense>
                <div className="wrapper-content">
                    <Suspense fallback={<div>Loading ...</div>}>
                        { router }
                    </Suspense>
                </div>
            </div>
        );
    }

}

export default Website;
