
import { Col, Row, Image } from 'react-bootstrap'
import Foto from './header.jpeg'
import './profile-header.css'



const Info = () => {

    return (
        <>
            <Col xs={6} md={4}>
                <Image className='profile-img' src={Foto} />
            </Col>
            <Col xs={12} md={8} >
                <section className='profile-info'>
                    <h3>
                        Jordi Boronat Arévalo
                    </h3>
                    <p>Number of recipes: 15 | Friends: 30</p>
                </section>

            </Col>
        </>


    )
}

export default Info