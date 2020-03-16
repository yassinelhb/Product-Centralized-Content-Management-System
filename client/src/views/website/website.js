import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import serviceSite from '../../services/website.service'
import Category from "../../theme/theme1/views/category";


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
        return <Header links = { website.header.links} logo = { website.logo_pic } />
   }

   loadComponent(website,link) {
       return  React.lazy(() => import('../../theme/'+website.theme.theme_name+'/views/'+link.link_text))
   }


    render() {
        const website = this.state.website
        const router = website.header ? (
            website.header.links.map((link,index) =>
             <Route path={`${this.props.match.url}/`+link.link_path} component={this.loadComponent(website,link)} key={index}/>
             )
        ) : ''


         return (
            <div className="wrapper">
                <Suspense fallback={<div>Loading ...</div>}>
                    { website.theme ?  this.loadHeader(website) : ''  }
                </Suspense>
                <div className="wrapper-content">
                    <div className="container">
                        <Suspense fallback={<div>Loading ...</div>}>
                          { router }
                        </Suspense>
                    </div>
                </div>
            </div>
        );
    }

}

export default Website;
