import React, {Suspense} from 'react';
import { Link} from "react-router-dom";
import '../css/Style.css';
import serviceSite from '../../../services/website.service'


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            links: this.props.links,
            toggle_edit : false
        }
    }


    editButtonClick = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    saveButtonClick  = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    addLinkClick = () => {

        if ( this.refs.link_text.value !== '' && this.refs.page.value !== '') {

            const link = {
                link_text: this.refs.link_text.value,
                page: this.refs.page.value,
            }

            serviceSite.linkSite(link,'add').then( res => {
                    this.setState({
                        links : [...this.state.links, res]
                    })
            })

        }

    }

    editLinkClick = (link_id,index) => {
        const link_text = this.refs[`link_text` + index ].value
        const page = this.refs[`page` + index].value

       if (link_text !== '' && page.value !== '') {
           const link = {
               link_text: link_text,
               page: page,
               _id: link_id
           }

           serviceSite.linkSite(link, 'edit').then(res => {
               const links = [...this.state.links]
               links[index] = res
               this.setState({
                   links: links
               })

           })

       }

    }

    deleteLinkClick = (link, index) => {

        serviceSite.linkSite(link,'remove')
            .then(
                this.setState({
                    links: this.state.links.filter((link,i) => i !== index)
                })
            )
    }

    mouseEnterHandle = () => {
        this.setState({
            toggle_edit: true
        })
    }

    mouseLeaveHandle = () => {
        this.setState({
            toggle_edit: false
        })
    }

    render() {

        const logo = this.props.logo

        // fetch pages
        const pages = this.props.pages.map(link =>
            <option key={link._id} value={link._id}> { link.page_name} </option>
        )

        // fetch links
        const links = this.state.links.map((link, index) => this.state.edit ? (

                <li className="nav-item dropdown" key={ link._id } >
                    <a className="nav-link" data-toggle="dropdown" data-toggle-second="tooltip" title="Click to edit!"
                          aria-haspopup="true" aria-expanded="false" >
                        { link.link_text }
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <form>
                            <div className="form-group">
                                <input type="text" ref={ 'link_text' + index} className='form-control' placeholder="Link text"
                                       defaultValue={ link.link_text } />
                            </div>
                            <div className="form-group">
                                <select ref={ 'page' + index} defaultValue={link.page._id} className='form-control'>
                                    { pages }
                                </select>
                            </div>
                            <span className="btn btn-primary" onClick={ () => this.editLinkClick(link._id,index) }>Save</span>
                            <span className="btn btn-danger" onClick={ () => this.deleteLinkClick(link,index) }>Delete</span>

                        </form>
                    </div>
                </li>
            ) : (
                <li className="nav-item" key={link._id} >
                    <Link className="nav-link" to={`/website/`+link.page.page_name}>
                        { link.link_text }
                    </Link>
                </li>
            )
        )

        // toggle button edit and add
        const btn_setting = this.state.edit ? (
            <>
                <li className="nav-item nav-item-setting dropdown" >
                    <button className="nav-btn" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false" onClick={ this.addButtonClick} data-toggle-second="tooltip" title="Click to add!"> Add </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <form>
                            <div className="form-group">
                                <input type="text" className='form-control' placeholder="Link text" ref="link_text"/>
                            </div>
                            <div className="form-group">
                                <select ref="page" className='form-control'>
                                    <option value=''>select page</option>
                                    { pages }
                                </select>
                            </div>
                            <span className="btn btn-primary" onClick={ () => this.addLinkClick() }>Save</span>
                        </form>
                    </div>
                </li>
                <li className="nav-item nav-item-setting">
                    <button className="nav-btn"  onClick={ this.saveButtonClick } data-toggle-second="tooltip" title="Click to save!"> Save </button>
                </li>
            </>
        ) : (

            this.state.toggle_edit ? (
                <li className="nav-item nav-item-setting" >
                    <button className="nav-btn" onClick={this.editButtonClick} >
                        Edit
                    </button>
                </li>
            ) : ''

        )

        return (
            <nav className="navbar navbar-expand-lg navbar-light" onMouseEnter={ () => this.mouseEnterHandle() }  onMouseLeave={ () => this.mouseLeaveHandle() }>
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={ require('../../../assets/img/'+ logo)}/>
                        </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarNavDropdown" className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                            {links}
                            { btn_setting }

                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="{{ url('/login') }}">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="{{ url('/register') }}">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        );
    }
}

export default Header;
