import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import serviceSite from "../../../services/website.service";
import "../assets/block.css"
import SelectLayout from "../select-layout";
import PageEditor from "../page-editor";
import NotFound from "../../../components/404/NotFound";


class BlockEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            website: '',
            editor: false,
            page: '',
            pageId: props.match.params.pageId
        }
    }

    componentDidMount() {
        serviceSite.webSite()
            .then( res => {
                this.setState({
                    website : res
                });

                if( this.state.pageId) {
                    this.state.website.pages.filter(page => page._id === this.state.pageId).forEach(page =>
                        this.setState({
                            page : page
                        })
                    )
                }
            })

    }

    handleSelectLayout = (layout) => {
        this.setState({
            editor: true,
            page : {
                page_name: layout.layout_name,
                layout: layout
            }
        })
    }

    render() {
        const { editor, page, website, pageId }  = this.state

        return (
            <div className="wrapper-editor">
                {
                    pageId ?
                        website && ( page ?  <PageEditor page = { page } website={ website } /> : <NotFound/>  )
                        :
                        website && (
                            editor  ?  <PageEditor page = { page } website={ website }  /> : <SelectLayout useLayout={ this.handleSelectLayout } website={ website } />
                        )
                }
            </div>

        );
    }

}

export default BlockEditor;
