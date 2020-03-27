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
            category : props.category,
            best_category : []
        };

        this.bestCategoryChange = this.bestCategoryChange.bind(this)


    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, type) => {

        let id = ev.dataTransfer.getData("id");
        let category = this.state.category.filter((cat) => {
            if (cat.name == id) {
                cat.type = type;
            }
            return cat;
        });

        this.setState({
            ...this.state,
            category
        });


        if( type === 'done') {
            this.setState({
                ...this.state,
                category
            });
        }
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    bestCategoryChange() {
        console.log('eefzf')
        this.props.done(this.state.best_category)
    }


    render() {

        this.state.best_category = []

        var category = {
            todo: [],
            done: []
        }

        this.state.category.forEach ((cat) => {
            category[cat.type].push(
                <div key={cat.name}
                     onDragStart = {(e) => this.onDragStart(e, cat.name)}
                     draggable
                     className="draggable">
                    {cat.name}
                </div>
            );

            if( cat.type === 'done' ) {
                this.state.best_category.push(cat)
            }

        });

        return (

            <div className="row">
                <div className="col-md-9">
                    <div className="best_category" onMouseEnter={ this.bestCategoryChange }
                         onDrop={(e)=>this.onDrop(e, "done")}
                         onDragOver={(ev)=>this.onDragOver(ev)}>

                        {category.done}

                    </div>
                </div>
                <div className="col-md-3">
                    <div className="list_category"
                         onDragOver={(e)=>this.onDragOver(e)}
                         onDrop={(e)=>{this.onDrop(e, "todo")}}>
                        <span className="task-header">List category</span>
                        {category.todo}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dragdrop;
