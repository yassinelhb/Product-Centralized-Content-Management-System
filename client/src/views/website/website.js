import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import serviceSite from '../../services/website.service'
import servicePage from '../../services/page.service'
import Category from "../../theme/theme1/views/category";
import NavTools from "../../components/Navbars/NavTools";
import Ads from "../../components/Ads/Ads"
import ChatBot from 'react-simple-chatbot';


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
                <Ads/>
                <Suspense fallback={<div>Loading ...</div>}>
                    {  website.header && pages ? this.loadHeader(): ''}
                </Suspense>
                <div className="wrapper-content">
                    <Suspense fallback={<div>Loading ...</div>}>
                        { router }
                    </Suspense>
                </div>
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
            </div>
        );
    }

}

export default Website;
