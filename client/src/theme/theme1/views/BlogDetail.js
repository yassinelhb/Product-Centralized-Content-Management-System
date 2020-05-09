import React, {Suspense} from 'react';
import '../css/Style.css';
import Header from "../components/header";
import  logo from './blog.jpg';
import  logo2 from './profile.png'

import '../css/BlogStyle.css';
import serviceBlog from "../../../services/Blog/Blog";
import Paginator from "../../../views/Blog/Paginator.js"
class BlogDetail extends React.Component {




    render() {
        return (
            <div>



                <div className="News">
                    <strong className="newss"> News</strong>
                    <hr className="hr-comment margin-top-25-"></hr>

                        <a href="../../blog/quelles-cartes-pour-retirer-de-largent-a-moindre-cout-/"><p
                            className="rightBlog"><span className="darkblue-color">»&nbsp;</span>
                            <strong>Quelles cartes pour retirer de l'argent à moindre coût ? </strong></p></a>
                    <a href="../../blog/quelles-cartes-pour-retirer-de-largent-a-moindre-cout-/"><p
                        className="rightBlog"><span className="darkblue-color">»&nbsp;</span>
                        <strong>Quelles cartes pour retirer de l'argent à moindre coût ? </strong></p></a>
                    <a href="../../blog/quelles-cartes-pour-retirer-de-largent-a-moindre-cout-/"><p
                        className="rightBlog"><span className="darkblue-color">»&nbsp;</span>
                        <strong>Quelles cartes pour retirer de l'argent à moindre coût ? </strong></p></a>
                </div>





                <div className="col-xs-2 col-md-7 Blog-content"  >
                    <div className="navsq">
                        <a className="navigations" href="/website/home"><strong>Home > </strong></a>
                      <a className="navigations"href="/website/Blog"><strong>Blog > </strong></a>
                   <a className="navigations"href="/website/Blog"><strong>COVID-19: What to Keep in Mind With Credit Card Bill Payments </strong></a>
                    </div>

                            <div className="image">
                    <img src={logo} width="617px" height="347px"/>
                    <p className="Title">COVID-19: What to Keep in Mind With Credit Card Bill Payments</p>
                            </div>
                    <div className="auteur">
                      <a href="/website/home">
                      <img className="img-avatar" src={logo2}/>
                      </a>
                        <div className="flex blogcontent">
                            <p className="avatar-name">Marwen</p>
                            <p className="avatar-name">21/04/2020</p>

                        </div>
                    </div>
                    <div className="contenue">
                        <p>
                            Que vous perdiez votre carte ou que vous l'ayez oubliée dans le distributeur automatique de billets, qu'elle ait été volée ou que vous ne l'ayez jamais reçue: si vous voulez être sûr que personne d'autre ne pourra l'utiliser, vous pouvez toujours la bloquer. La carte ne vaut alors plus rien: personne ne peut l'utiliser pour effectuer des paiements, retirer de l'argent ou acheter des biens. Vous voulez bloquer votre carte? Alors, appelez Card Stop.

                            Qu'est-ce que Card Stop ?
                            Card Stop est un service de Worldline, une société qui développe des systèmes de paiement en ligne dans toute l’Europe. Vous pouvez appeler Card Stop jour et nuit, depuis plus de 15 ans, pour bloquer des cartes de paiement et d’autres méthodes de paiement:

                            Cartes de carburant
                            Cartes de crédit
                            Isabel et cartes de visite électroniques
                            Cartes Bancontact et Mister Cash
                            L'application mobile de Bancontact et Mister Cash
                            E-chèques ( chèques- repas électroniques, par exemple)
                            L' application m-banxafe sur la carte SIM de votre téléphone
                            Cartes avec label privé (toutes les cartes dites "Isis" telles que celles de Makro, Eldi ou Gamma)
                            Quand bloquer ma carte ?
                            Vous avez perdu votre carte ou elle a été volée
                            Elle a été avalée par la machine
                            Vous n'avez jamais reçu votre nouvelle carte
                            En cas de fraude ou si vous remarquez que vous n'avez pas effectué vous-même certaines opérations sur votre relevé de dépenses
                            Vous avez reçu une lettre de prévention de la fraude de l’équipe de gestion du risque et de la fraude . Cette équipe vous envoie une lettre lorsqu'elle juge que les fraudeurs ont les informations de votre carte. Votre carte est bloquée de manière préventive afin que personne ne puisse en abuser.
                            Vous avez perdu votre téléphone avec la fonction m-banxafe ou il a été volé. Remarque: Card Stop ne bloque que la fonction m-banxafe, il ne peut pas bloquer la totalité de votre carte SIM.
                            Comment bloquer ma carte ?
                            Card Stop est accessible 24 heures sur 24, 7 jours sur 7 au numéro +32 70 344 344. En résumé, vous appelez Card Stop pour demander de bloquer votre carte. Card Stop traite votre appel, identifie votre ou vos produits et les bloque. Dans certains cas, il envoie une demande de blocage à l'émetteur de la carte s'il ne peut pas bloquer la carte elle-même. Vous recevez des informations supplémentaires, un numéro de fichier et Card Stop contacte l'émetteur de votre carte afin qu'il puisse vous en envoyer une nouvelle.

                            Préparez les détails les plus importants de votre carte, de votre compte et de votre identité, lorsque vous appelez:

                            Le nombre de cartes que vous souhaitez bloquer
                            Le numéro de la / des carte (s) que vous souhaitez bloquer
                            Le type de carte et la marque (carte bancaire, carte Visa, etc.)
                            Le numéro de compte que vous avez associé à la carte
                            L'émetteur de la carte (généralement votre banque)
                            Les données du titulaire
                            Votre carte sera bloquée dans l'heure. Dès que Card Stop confirme le blocage, vous n'êtes plus responsable de toute utilisation abusive. La nouvelle carte est prête environ 7 jours ouvrables après son blocage.

                        </p>
                    </div>

                </div>

            </div>
        )
    }

}
export default BlogDetail;
