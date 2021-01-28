
import { Col, Image, Button, Container, Row } from 'react-bootstrap'

import './profile-header.css'



const Info = props => {

    const user = props.userProfile

    return (
        <>
            <div className='profile-header-div'>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={3} className='image-Col'>
                            <Image className='profile-img' src={user.img} />


                            <div className='follow-button'>
                                {props.loggedUser.friends.includes(user._id) ?
                                    <Button variant="info" className="unfollow" onClick={() => props.followButton(user._id)}>
                                        <span className='following'>Siguiendo</span>
                                        <span className='unfollow-btn'>Dejar de seguir</span>
                                    </Button>

                                    :

                                    <Button variant="info" onClick={() => props.followButton(user._id)}>Seguir</Button>
                                }
                            </div>

                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                            <section className='profile-info'>
                                <h3>
                                    {user.username}
                                </h3>
                                <hr className='profile-splitter username'></hr>

                                <p>{user.description} </p>

                                <hr className='profile-splitter'></hr>

                                <p className='header-numbers'>Recetas subidas: {props.numberRecipes} | Siguiendo: {user.friends.length}</p>
                            </section>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>



    )
}

export default Info