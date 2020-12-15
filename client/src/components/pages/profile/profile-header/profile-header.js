
import { Col, Image } from 'react-bootstrap'

import './profile-header.css'



const Info = ({ userProfile, numberRecipes, followButton }) => {

    return (
        <>
            <Col xs={6} md={3} className='image-Col'>
                <Image className='profile-img' src={userProfile.img} />
            </Col>
            <Col xs={12} md={8} >
                <section className='profile-info'>
                    <h3>
                        {userProfile.username}
                    </h3>
                    <p>Recetas subidas: {numberRecipes} | Siguiendo: {userProfile.friends.length}</p>
                </section>
            </Col>

        </>


    )
}

export default Info