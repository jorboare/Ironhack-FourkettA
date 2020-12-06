import React, { Component } from 'react'
import Recipes from '../../../service/recipes.service'
import { Card, ListGroup } from 'react-bootstrap'

export default class RecipesList extends Component {
    constructor() {
        super()

        this.state = {
            recipes: []
        }

        this.recipesList = new Recipes()


    }

    componentDidMount = () => {
        this.recipesList
            .getRecipes()
            .then(res => this.setState({ recipes: res.data }))
            .catch(err => console.log(err))

    }



    render() {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <ListGroup variant="flush">
                        {this.state.recipes.map(elm => < ListGroup.Item key={elm._id} > {elm.name}</ListGroup.Item>)}
                    </ListGroup>
                </Card>
            </>
        )
    }
}