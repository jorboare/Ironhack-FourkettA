
import { Container, Row, Col, Image } from 'react-bootstrap'

import './profile-header.css'



const Info = ({ userProfile, numberRecipes }) => {

    return (
        <div className='profile-header-div'>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={3} className='image-Col'>
                        <Image className='profile-img' src={userProfile.img} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                        <section className='profile-info'>
                            <h3>
                                {userProfile.username}
                            </h3>
                            <hr className='profile-splitter username'></hr>

                            <p>{userProfile.description} </p>

                            <hr className='profile-splitter'></hr>

                            <p className='header-numbers'>Recetas subidas: {numberRecipes} | Siguiendo: {userProfile.friends.length}</p>
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>


    )
}

export default Info