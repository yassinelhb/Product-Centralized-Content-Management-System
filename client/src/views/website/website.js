import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import serviceSite from '../../services/website.service'
import Category from "../../theme/theme1/views/category";
import NavTools from "../../components/Navbars/NavTools";


class Website extends React.Component {

    constructor() {
        super();
        this.state = {
            website: ''
        }

    }
   componentDidMount() {
        serviceSite.webSite()
            .then( res => {
            this.setState({
                website : res
            });
        })
   }

   loadHeader(website) {
        const Header = React.lazy(() => import('../../theme/' + website.theme.theme_name + '/components/header'))
        return <Header links = { website.header.links} logo = { website.logo_pic } pages = { website.pages } />
   }

   loadComponent(website,page) {
       const Componant =  React.lazy(() => import('../../theme/'+website.theme.theme_name+'/views/'+page.layout.layout_name))
       return <Componant page={ page } editor = { true } />
   }


    render() {
        const website = this.state.website
        const router = website.pages ? (
            website.pages.map((page) =>
             <Route exact path={`${this.props.match.url}/`+page.page_name} render={ () => this.loadComponent(website,page)} key={page._id}/>
             )
        ) : ''


         return (
            <div className="wrapper">
                <NavTools/>
                <Suspense fallback={<div>Loading ...</div>}>
                    { website.theme ?  this.loadHeader(website) : ''  }
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
