import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './header.css'


const Header = () => {

    return (
        <Navbar bg="dark" variant="dark" className='navbar'>
            <Link to='/'>
                <Navbar.Brand>_AppName</Navbar.Brand>
            </Link>
            <Nav className="mr-auto">
                <Link to='/recipes'>
                    <Nav.Link as='div'>Recipes</Nav.Link>
                </Link>
            </Nav>
            <Nav className="mf-auto">
                <Link to='/signup'>
                    <Nav.Link as='div'>Registro</Nav.Link>
                </Link>
                <Link to='/login'>
                    <Nav.Link as='div'>Inicio sesión</Nav.Link>
                </Link>
            </Nav>
        </Navbar>
    )

}

export default Header