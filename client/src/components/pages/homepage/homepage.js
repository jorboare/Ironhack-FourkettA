import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import './homepage.css'
import Fork from './fork-2.png'
import { Container, Row, Col } from 'react-bootstrap'

const Homepage = ({ loggedUser }) => {
    return (
        <>
            <section className='hero'>
                <h1><span class='title-focused'>F</span>ourkett<span class='title-focused'>A</span></h1>
                <p>Para cocinillas organizados</p>
                <div className='homepage-btn'>
                    {!loggedUser ?
                        <>
                            <Link to='/signup'>
                                <Button variant="dark" className='btn'>Registro</Button>
                            </Link>
                            <Link to='/login'>
                                <Button variant="dark" className='btn'>Inicio sesión</Button>
                            </Link>
                        </> :
                        <Link to='/profile'>
                            <Button variant="dark" className='btn'>Perfil</Button>
                        </Link>}
                    <Image src={Fork} alt='Fork image' className='fork-img-right' />
                    <Image src={Fork} alt='Fork image' className='fork-img-left' />

                </div>
            </section>
            <div className='spliter'></div>
            <section className='home-info'>
                <Container className='home-info-container'>
                    <Row>
                        <Col md={6}>

                        </Col>
                        <Col md={6}>
                            <h2>¿Qué es <b>FourkettA</b>?</h2>
                            <hr></hr>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo diam, placerat in finibus eget, ultricies et quam. Pellentesque sit amet placerat libero, vitae pretium sem. Aenean tortor turpis, aliquam eget varius vel, mollis in quam. Nunc velit nisl, accumsan a lacinia eu, porta sit amet velit. Vivamus rutrum felis diam, et fringilla magna blandit pharetra. Mauris purus felis, tempor ut erat non, laoreet scelerisque tortor. Nullam sagittis nunc ut ex luctus malesuada. Pellentesque eu lectus dolor.</p>
                        </Col>
                    </Row>

                </Container>
            </section>
        </>
    )
}

export default Homepage