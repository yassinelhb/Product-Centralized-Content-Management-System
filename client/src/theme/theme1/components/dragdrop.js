import React, {Suspense} from 'react';
import '../css/Style.css';
import Header from "../components/header";
import { Link} from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'


class Dragdrop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            page_category : props.page_category,
            best_category : []
        };

        this.bestCategoryChange = this.bestCategoryChange.bind(this)


    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, type) => {

        let id = ev.dataTransfer.getData("id");
        let page_category = this.state.page_category.filter((page) => {
            if (page.page_name == id) {
                page.type = type;
            }
            return page;
        });

        this.setState({
            ...this.state,
            page_category
        });


        if( type === 'done') {
            this.setState({
                ...this.state,
                page_category
            });
        }
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    bestCategoryChange = (page) => {
        this.setState({
            page: {
                ...this.state.page,
                best_category: {
                    ...this.state.best_category,
                    best_category_list: page
                }
            }
        })
    }


    render() {

        var page_category = {
            todo: [],
            done: []
        }

        this.state.page_category.forEach ((page) => {
            page_category[page.type].push(
                <div key={page._id}
                     onDragStart = {(e) => this.onDragStart(e, page.page_name)}
                     draggable
                     className="draggable">
                    {page.page_name}
                </div>
            );

            if( page.type === 'done' ) {
                this.bestCategoryChange(page)
            }

        });

        return (

            <div className="row">
                <div className="col-md-9">
                    <div className="best_category"
                         onDrop={(e)=>this.onDrop(e, "done")}
                         onDragOver={(ev)=>this.onDragOver(ev)}>

                        {page_category.done}

                    </div>
                </div>
                <div className="col-md-3">
                    <div className="list_category"
                         onDragOver={(e)=>this.onDragOver(e)}
                         onDrop={(e)=>{this.onDrop(e, "todo")}}>
                        <span className="task-header">List category</span>
                        {page_category.todo}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dragdrop;
