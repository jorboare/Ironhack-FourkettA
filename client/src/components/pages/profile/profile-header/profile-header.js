
import { Col, Image, Button } from 'react-bootstrap'

import './profile-header.css'



const Info = props => {

    const user = props.userProfile
    return (
        <>
            <Col xs={6} md={3} className='image-Col'>
                <Image className='profile-img' src={user.img} />
            </Col>
            <Col xs={12} md={8} >
                <section className='profile-info'>
                    <h3>
                        {user.username}
                    </h3>
                    <p>Number of recipes: {props.numberRecipes} | Friends: 30</p>
                </section>
            </Col>
            <Col xs={12} md={1} >
                <section className='profile-info'>
                    <Button variant="info" onClick={() => props.followButton(user._id)}>Seguir</Button>
                </section>
            </Col>
        </>


    )
}

export default Info