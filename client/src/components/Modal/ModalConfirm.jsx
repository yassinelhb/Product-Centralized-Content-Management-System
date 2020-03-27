/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Modal, Button } from "react-bootstrap";
import serviceSite from "../../services/website.service";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ModalConfirm extends React.Component {

    constructor() {
        super();

    }
    removeClick = (page) => {

        serviceSite.deletePage(page._id)
            .then(() => {
                this.props.hide(page._id)
            })
    }

    handleClose = () => {
       this.props.hide()
    }

  render() {
    const { show, page } = this.props
    return (
        <Modal show={show}
              size="md"
              centered
              onHide={ this.handleClose }
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>You are sure you want remove this page ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ this.handleClose}>
                    Close
                </Button>
                <Button variant="info" onClick={ () => this.removeClick(page) }>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>

    );
  }
}

export default ModalConfirm;
