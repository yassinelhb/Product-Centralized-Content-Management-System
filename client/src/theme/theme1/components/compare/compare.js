import React, {Suspense} from 'react';
import '../../css/Style.css';
import { Link} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'
import serviceTheme from "../../../../services/theme.service";
import {Button, Modal} from "react-bootstrap";



class Compare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleClose = () => {
        this.props.close()
    }

    render() {

        const { show } = this.props

        return (
            <Modal show= {show}
                   size="xl"
                   onHide={ this.handleClose }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Compare products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table content_compare_prod">
                            <tbody>
                                <tr>
                                    <td>
                                    </td>
                                    <td className="compare_infos">
                                        <img src={ require('../../../../assets/img/add.png')} />
                                        <Link className="product_title" to={''}>Annual Fee Credit Card</Link>
                                    </td>
                                    <td className="compare_infos">
                                        <img src={ require('../../../../assets/img/add.png')} />
                                        <Link className="product_title" to={''}>Annual Fee Credit Card</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Cotisation annuelle
                                    </td>
                                    <td>
                                        0,00 €
                                    </td>
                                    <td>
                                        0,00 €
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Compte supplémentaire
                                    </td>
                                    <td>
                                        -
                                    </td>
                                    <td>
                                        -
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Carte de crédit incluse
                                    </td>
                                    <td>
                                        Oui
                                    </td>
                                    <td>
                                        Oui
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                    </td>
                                    <td>
                                        <span className="btn_remove">
                                            <i className="nc-icon nc-simple-remove"></i>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="btn_remove">
                                            <i className="nc-icon nc-simple-remove"></i>
                                        </span>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Compare;
