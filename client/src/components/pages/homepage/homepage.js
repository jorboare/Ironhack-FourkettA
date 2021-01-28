import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import './homepage.css'
import Plate1 from './images/plato-1.png'
import Plate2 from './images/plato-2.png'
import { Container, Row, Col } from 'react-bootstrap'
import Pie from './graphics/Pie'
import React, { Component } from 'react'
import RecipesService from './../../../service/recipes.service'
import Gradient from './gradient copia.png'


class Homepage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            veggie: undefined,
            vegan: undefined,
            allRecipes: undefined
        }
        this.recipesService = new RecipesService()
    }

    componentDidMount() {

        const getRecipes = this.recipesService.getRecipes()
        const getVeggies = this.recipesService.veggieRecipes()
        const getVegan = this.recipesService.veganRecipes()

        Promise
            .all([getRecipes, getVeggies, getVegan])
            .then(res => this.setState(
                {
                    allRecipes: res[0].data.length,
                    veggie: res[1].data.length,
                    vegan: res[2].data.length
                }
            ))
            .catch(err => console.log(err))

    }
    render() {
        return (
            <>
                <section className='hero'>
                    <h1><span className='title-focused'>F</span>ourkett<span className='title-focused'>A</span></h1>
                    <p>Para cocinillas organizados</p>
                    <div className='homepage-btn'>
                        {!this.props.loggedUser ?
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


                    </div>
                    <video autoPlay muted loop playsInLine className='video-hero'>
                        <source src="https://res.cloudinary.com/jordi-ironhack/video/upload/v1611221686/fotos-webuild/Secuencia_01_m87ppa.mp4" type='video/mp4'>
                        </source>
                    </video>
                    <div className='bg-black'></div>
                </section>
                <div className='spliter'></div>
                <section className='home-info'>


                    <Image src={Gradient} className='gradient-img' />


                    <Image src={Plate1} alt='plate image' className='plate-img-left' />


                    <Container className='home-info-container'>
                        <Row>
                            <Col md={6}>
                            </Col>
                            <Col md={6}>
                                <h2>¿Qué es <b>FourkettA</b>?</h2>
                                <hr />
                                <p>FourkettA es un organizador de recetas así como una plataforma con la que poder acceder facilmente a nuevas recetas, seguir a otros usuarios para tener a mano su contenido y descubrir recetas con las que inspirarse con solo pulsar un botón.</p>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className='spliter beige'></div>
                {this.state.vegan &&
                    <section className='home-graphics'>
                        <Image src={Gradient} className='gradient-img-graphics' />

                        <Container>
                            <Row>
                                <Col md={5} className='num-recipes-col'>
                                    <h2>{this.state.allRecipes} <span className='num-recipes'>recetas</span></h2>
                                    <hr></hr>
                                    <p>Ahora mismo tenemos registradas {this.state.allRecipes} recetas. En <i>FourkettA</i> puedes descubrir cuál será tu nueva comida favorita, o la receta con la que tus invitados van a rebañar el plato. ¡Regístrate y empieza a cocinar!</p>
                                </Col>
                                <Col md={7}>
                                    <div className='graphics'>

                                        <Pie vegan={this.state.vegan} veggie={this.state.veggie} allRecipes={this.state.allRecipes} />
                                    </div>

                                </Col>
                            </Row>

                        </Container>
                    </section>
                }
                <footer className='footer'>
                    <p>FourkettA &#9400; 2020| Un proyecto de <span className='underline'>Jordi Boronat</span> para Ironhack.</p>
                    <p>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
                </footer>
            </>
        )
    }
}

export default Homepage