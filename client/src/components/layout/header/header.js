import { Navbar, Nav } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import AuthServices from './../../../service/auth.service'


class Header extends Component {
    constructor(props) {
        super(props)
        this.authservice = new AuthServices()
    }

    componentDidMount() {
        console.log(this.props)
    }

    logOut = () => {
        this.authservice
            .logout()
            .then(res => {
                this.props.storeUser(undefined)

                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Navbar className='navbar' >
                <Link to='/'>
                    <Navbar.Brand>_AppName</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    <Link to='/recipes'>
                        <Nav.Link as='div'>Recipes</Nav.Link>
                    </Link>
                </Nav>
                <Nav className="mf-auto">
                    {this.props.loggedUser
                        ?
                        <>
                            <Link to='/profile'>
                                <Nav.Link as='div'>Perfil</Nav.Link>
                            </Link>
                            <Nav.Link as='div' onClick={this.logOut}>Cerrar sesión</Nav.Link>
                        </>
                        :
                        <>
                            <Link to='/signup'>
                                <Nav.Link as='div'>Registro</Nav.Link>
                            </Link>
                            <Link to='/login'>
                                <Nav.Link as='div'>Inicio sesión</Nav.Link>
                            </Link>
                        </>
                    }




                </Nav>
            </Navbar>
        )
    }

}

export default Header