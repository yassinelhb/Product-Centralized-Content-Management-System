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
            link: {
                link_text: '',
                link_path: ''
            },
            errors: {
                link_text: '',
                link_path: ''
            }
        }

    }


    editButtonClick = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    addButtonClick  = () => {
        this.setState({
            errors: {}
        })
    }

    saveButtonClick  = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    setLinkClick = (link,index) => {
        this.setState({
            link: {
                link_text: link.link_text,
                link_path: link.link_path,
                link_index: index
            },
            errors: {}
        })
    }

    linkTextChange = (event) => {
        this.setState( {
            link: {
                ...this.state.link,
                link_text: event.target.value.toLowerCase()
            },
            errors : {
                ...this.state.errors,
                exist: '',
                link_text: ''
            }
        })
    }

    linkPathChange = (event) => {
        this.setState({
            link: {
                ...this.state.link,
                link_path: event.target.value.toLowerCase()
            },
            errors : {
                ...this.state.errors,
                exist: '',
                link_path: ''
            }
        })
    }

    addLinkClick = () => {

        if ( this.state.link.link_text === '') {
            this.setState({
                errors: {
                    ...this.state.errors,
                    link_text: 'required'
                }
            })
        }
        if ( this.state.link.link_path === '') {
            this.setState({
                errors: {
                    ...this.state.errors,
                    link_path: 'required'
                }
            })
        }
        else {
            serviceSite.linkSite(this.state.link,'add')
                .then( res => {
                    if (res.nModified === 0) {
                        this.setState({
                            errors : {
                                exist : true
                            }
                        })
                    } else {
                        this.setState({
                            links : [...this.state.links, this.state.link]
                        })
                    }
                })

        }

    }

    editLinkClick = () => {
        if (this.state.links[this.state.link.link_index].link_text !== this.state.link.link_text
            || this.state.links[this.state.link.link_index].link_path !== this.state.link.link_path ) {

            if( this.state.link.link_text === '') {

                this.setState({
                    errors: {
                        ...this.state.errors,
                        link_text: 'required'
                    }
                })
            }
            else if ( this.state.link.link_path === '') {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        link_path: 'required',
                    }
                })

            }

            else {

                serviceSite.linkSite(this.state.link,'edit')
                    .then( res => {
                        if (res.nModified === 0) {
                            this.setState({
                                errors : {
                                    exist : true
                                }
                            })
                        } else {
                            const links = [...this.state.links]
                            links[this.state.link.link_index] = this.state.link
                            this.setState({
                                links : links
                            })
                        }
                    })
            }
        }
    }

    deleteLinkClick = () => {

        serviceSite.linkSite(this.state.link,'remove')
            .then(
                this.setState({
                    links: this.state.links.filter((link,i) => i != this.state.link.link_index)
                })
            )
    }


    render() {

        const logo = this.props.logo

        // fetch links

        const links = this.state.links.map((link,index) =>

            this.state.edit ? (

                <li className="nav-item dropdown" key={index}>
                    <a className="nav-link" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false" onClick={ () => this.setLinkClick(link,index) }>
                        { link.link_text }
                    </a>
                    <div className="dropdown-menu">
                        <form>
                            <div className="form-group">
                                <input type="text" className={ this.state.errors.link_text || this.state.errors.exist  ? 'form-control border-danger' : 'form-control' } placeholder="Link text" defaultValue={ link.link_text }
                                       onChange={this.linkTextChange}/>
                            </div>
                            <div className="form-group">
                                <input type="text" className={ this.state.errors.link_path || this.state.errors.exist  ? 'form-control border-danger' : 'form-control' } placeholder="Link path" defaultValue={ link.link_path }
                                       onChange={this.linkPathChange}/>
                            </div>
                            <span className="btn btn-primary" onClick={ () => this.editLinkClick() }>Save</span>
                            <span className="btn btn-danger" onClick={ () => this.deleteLinkClick() }>Delete</span>

                        </form>
                    </div>
                </li>

            ) : (
                <li className="nav-item" key={index} >
                    <Link className="nav-link" to={`/website/`+link.link_path}>
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
                            aria-haspopup="true" aria-expanded="false" onClick={ this.addButtonClick}> Add </button>
                    <div className="dropdown-menu">
                        <form>
                            <div className="form-group">
                                <input type="text" className={ this.state.errors.link_text || this.state.errors.exist  ? 'form-control border-danger' : 'form-control' } placeholder="Link text"
                                       onChange={this.linkTextChange}/>
                            </div>
                            <div className="form-group">
                                <input type="text" className={ this.state.errors.link_path || this.state.errors.exist  ? 'form-control border-danger' : 'form-control' } placeholder="Link path"
                                       onChange={this.linkPathChange}/>
                            </div>
                            <span className="btn btn-primary" onClick={ () => this.addLinkClick() }>Save</span>
                        </form>
                    </div>
                </li>
                <li className="nav-item nav-item-setting">
                    <button className="nav-btn"  onClick={ this.saveButtonClick}> Save </button>
                </li>
            </>
        ) : (
            <li className="nav-item nav-item-setting" >
                <button className="nav-btn" onClick={this.editButtonClick}>
                    Edit
                </button>
            </li>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-light">
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
