import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './homepage.css'

const Homepage = () => {
    return (

        <section className='hero'>
            <h1>FourkettA</h1>
            <p>Para cocinillas organizados</p>
            <div className='homepage-btn'>
                <Link to='/signup'>
                    <Button variant="dark" className='btn'>Registro</Button>
                </Link>
                <Link to='/login'>
                    <Button variant="dark" className='btn'>Inicio sesión</Button>
                </Link>

            </div>
        </section>
    )
}

export default Homepage