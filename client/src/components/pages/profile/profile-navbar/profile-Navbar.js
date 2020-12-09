import React, { Component } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './profile-Navbar.css'

class Navbar extends Component {

    constructor() {
        super()

        this.state = {
            recipes: undefined
        }
    }

    render() {

        return (
            <section className='profile-navbar'>
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Cuenta
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Editar cuenta</Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Eliminar cuenta</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Recetas
                          </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Mis recetas</Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Link to='/newRecipe'>
                                    Añadir receta
                                </Link>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Mis amigos
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Amiguinchis por aquí</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </section>

        )
    }
}

export default Navbar