
import { Col, Image, Button } from 'react-bootstrap'

import './profile-header.css'



const Info = props => {

    const user = props.userProfile

    return (
        <>
            <Col xs={6} md={3} className='image-Col'>
                <Image className='profile-img' src={user.img} />
            </Col>
            <Col xs={12} md={6} >
                <section className='profile-info'>
                    <h3>
                        {user.username}
                    </h3>
                    <p>{user.description} </p>
                    <hr className='profile-splitter'></hr>
                    <p>Número de recetas: {props.numberRecipes} | Seguidos: {user.friends.length}</p>
                </section>
            </Col>
            <Col xs={12} md={3} >

                <section className='profile-info'>
                    {props.loggedUser.friends.includes(user._id) ?
                        <Button variant="info" className="unfollow" onClick={() => props.followButton(user._id)}>
                            <span className='following'>Siguiendo</span>
                            <span className='unfollow-btn'>Dejar de seguir</span>
                        </Button>

                        :

                        <Button variant="info" onClick={() => props.followButton(user._id)}>Seguir</Button>
                    }
                </section>
            </Col>
        </>


    )
}

export default Info