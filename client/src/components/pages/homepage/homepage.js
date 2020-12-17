import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import './homepage.css'
import Fork from './fork-2.png'
import { Container, Row, Col } from 'react-bootstrap'
import Pie from './graphics/Pie'
import React, { Component } from 'react'
import RecipesService from './../../../service/recipes.service'

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

        this.recipesService
            .getRecipes()
            .then(res => this.setState({ allRecipes: res.data.length }))
            .then(res => this.recipesService.veggieRecipes())
            .then(res => this.setState({ veggie: res.data.length }))
            .then(res => this.recipesService.veganRecipes())
            .then(res => this.setState({ vegan: res.data.length }))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <section className='hero'>
                    <h1><span class='title-focused'>F</span>ourkett<span class='title-focused'>A</span></h1>
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
                                <hr />
                                <p>FourkettA es un organizador de recetas así como una plataforma con la que poder acceder facilmente a nuevas recetas, seguir a otros usuarios para tener a mano su contenido y descubrir nuevas recetas con las que inspirarse con solo pulsar un botón.</p>
                            </Col>
                        </Row>

                    </Container>
                </section>
                <div className='spliter beige'></div>
                {this.state.vegan &&
                    <section className='home-graphics'>
                        <Container>
                            <Row>
                                <Col md={6} className='num-recipes-col'>
                                    <h2>{this.state.allRecipes} <span className='num-recipes'>recetas</span></h2>
                                    <hr></hr>
                                    <p>Ahora mismo tenemos registradas {this.state.allRecipes} recetas. En <i>FourkettA</i> puedes descubrir cuál será tu próximo plato favorito, o la receta con la que tus invitados van a rebañar el plato. ¡Regístrate y empieza a cocinar!</p>
                                </Col>
                                <Col md={6}>
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