import React, {Suspense} from 'react';
import '../../css/Style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button, Modal} from "react-bootstrap";



class Add extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description : '',
            errors: ''
        }
    }

    handleChange = (e) => {
        this.setState( {
            description: {
                ...this.state.description,
                [e.target.name] : e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        })
    }

    handleClick = async () => {

        const { description } = this.state

        if ( ! description.title || ! description.text ) {

            await ( ! description.title ) &&
            this.setState({
                errors: {
                    ...this.state.errors,
                    title: 'Title required'
                }
            })

            await ( ! description.text ) &&
            this.setState({
                errors: {
                    ...this.state.errors,
                    text: 'Title required'
                }
            })
        } else {
            this.props.add(description)
        }
    }

    handleClose = () => {
        this.props.hide()
    }

    render() {

        const { errors } = this.state
        const { show } = this.props

        return (

           <Modal show={show}
                  size="md"
                  centered
                  onHide={ this.handleClose }
           >
               <Modal.Header closeButton>
                   <Modal.Title>Add description</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                   <div className="form-group">
                       <label>Title</label>
                       <input type="text" name="title" className={ errors.title ? 'form-control border-danger' : 'form-control' } onChange={ this.handleChange }/>
                       {
                           errors.title &&
                           <span className="text-danger small"> { errors.title } </span>
                       }
                   </div>
                   <div className="form-group">
                       <label>Text</label>
                       <textarea name="text" className={ errors.text ? 'form-control border-danger' : 'form-control' } onChange={ this.handleChange }></textarea>
                       {
                           errors.text &&
                           <span className="text-danger small"> { errors.text } </span>
                       }
                   </div>
               </Modal.Body>
               <Modal.Footer>
                   <Button variant="secondary" onClick={ this.handleClose }>
                       Cancel
                   </Button>
                   <Button variant="info"  onClick={ this.handleClick }>
                       Submit
                   </Button>
               </Modal.Footer>
           </Modal>

        );
    }
}

export default Add;
