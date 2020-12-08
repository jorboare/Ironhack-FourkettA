
import { Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Foto from './header.png'
import './profile-header.css'



const Info = props => {

    const user = props.loggedUser
    return (
        <>
            <Col xs={6} md={3} className='image-Col'>
                <Image className='profile-img' src={Foto} />
            </Col>
            <Col xs={12} md={9} >
                <section className='profile-info'>
                    <h3>
                        {user.username}
                    </h3>
                    <p>Number of recipes: 15 | Friends: 30</p>
                </section>
                <Link to='/newRecipe'>
                    <Button variant="dark" className='btn'>Añadir receta</Button>
                </Link>

            </Col>
        </>


    )
}

export default Info