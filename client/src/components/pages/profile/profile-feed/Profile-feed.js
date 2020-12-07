import React, { Component } from 'react'
import './Profile-feed.css'


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
                            <div className='feed-card'>
                                <h5 className='recipe-name'> {elm.name}</h5>
                                <p>Raciones: 4 | Ingredientes: lista de ingredientes</p>
                            </div>
                        </div>
                    )
                })}

            </section>

        )
    }
}

export default Navbar