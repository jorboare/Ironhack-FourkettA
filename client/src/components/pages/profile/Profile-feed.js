import React, { Component } from 'react'
import './Profile-feed.css'
import { Card, ListGroup } from 'react-bootstrap'

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            recipes: [...props.recipes]
        }
        console.log(props.recipes)
    }

    render() {

        return (
            <section className='recipes'>
                {this.state.recipes.map((elm, idx) => {
                    return (
                        <div className='feed'>
                            <h5 className='recipe-name' key={elm._id} > {elm.name}</h5>
                            <p key={idx}>Raciones: 4 | Ingredientes: lista de ingredientes</p>
                        </div>
                    )
                })}

            </section>

        )
    }
}

export default Navbar