import React from 'react';
import {Link} from "react-router-dom";


class Detail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <div className="breadcrumb">
                    <Link to={'/'} className="navigation_page"> Home </Link>
                    <span className="navigation_pipe">/</span>
                    <span className="navigation_page"> category 2 </span>
                    <span className="navigation_pipe">/</span>
                    <span className="navigation_page"> subcategory 1 </span>
                    <span className="navigation_pipe">/</span>
                    <span className="navigation_page">  Hello bank compte vue hello </span>

                </div>
                <div className="content_product">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="product_header">
                                <div className="product_img">
                                    <img src={ require('../../../assets/img/logo.png')}/>
                                </div>
                                <h1 className="product_title">
                                    Hello bank compte vue hello
                                </h1>
                            </div>
                            <div className="product_desc">
                                <p className="product_desc_parag">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                                <h4 className="product_desc_title">
                                    App facile à utiliser
                                </h4>
                                <p className="product_desc_parag">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                </p>
                                <h4 className="product_desc_title">
                                    Conclusion
                                </h4>
                                <p className="product_desc_parag">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="product_prop">
                                {/*<h3 className="product_prop_title">
                                    Caractéristiques
                                </h3>*/}

                                <table className="table table_prop">
                                    <tbody>
                                    <tr>
                                        <th>Cotisation annuelle</th>
                                        <td>0,00 €</td>
                                    </tr>
                                    <tr>
                                        <th>Compte supplémentaire</th>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <th>Carte de crédit incluse</th>
                                        <td>Oui</td>
                                    </tr>
                                    <tr>
                                        <th>Type de carte de crédit</th>
                                        <td>MasterCard</td>
                                    </tr>
                                    <tr>
                                        <th>Retrait zone Euro</th>
                                        <td>0,00 € (5 retraits par mois, puis 2 €/retrait)</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button className="btn btn-primary"> Go to web site </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Detail;
