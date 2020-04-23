import React, {Suspense, Fragment} from 'react';
import { LanguageData } from '../../views/website_editor/language-data';
import onClickOutside from "react-onclickoutside";

class Translator extends React.Component {

    constructor() {
        super();
        this.state = {
            languages: LanguageData(),
            search: false,
            sourceLang: 'auto',
            targetLang: 'en'
        }

    }

    handleClickOutside() {
        this.handleClose()
    }

    handleLanguage = () => {
        this.setState({
            search: true
        })
    }

    handleClose = () => {
        this.setState({
            search: false
        })
    }



    render() {
        const { languages, search } = this.state
        const list_language = languages.map(language =>
            <div className="item_language">
                <span className="language_name"> { language.name }</span>
            </div>
        )
         return (
             <div className="content_trans">
                 <div className="select_header">
                     {
                         search ?
                             <div className="search_language">
                                 <input type="text" className="form-control" placeholder="Search ..."/>
                                 <span className="close_search" onClick={ this.handleClose }>
                                     <i className="nc-icon nc-simple-remove"></i>
                                 </span>
                             </div>
                             :
                             <>
                                 <div className="select_language">
                                     <span className="select_text"> ARABIC </span>
                                     <span className="select_icon">
                             <i className="nc-icon nc-minimal-down"></i>
                         </span>
                                 </div>
                                 <span className="revert-icon">
                                     <i className="nc-icon nc-refresh-69"></i>
                                 </span>
                                 <div className="select_language" onClick={ this.handleLanguage }>
                                     <span className="select_text"> FRENSH </span>
                                     <span className="select_icon">
                                         <i className="nc-icon nc-minimal-down"></i>
                                     </span>
                                 </div>
                             </>
                     }
                 </div>
                 <div className="select_body">
                     <div className="list_language">
                         { list_language }
                     </div>
                 </div>
             </div>
        );
    }

}

export default onClickOutside(Translator);
