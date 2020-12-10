
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import RecipeCard from './../profile-feed/Recipe-card'

class filterRecipes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userRecipes: undefined
        }

    }

    componentDidMount() {

        const filteredRecipes = this.props.recipes.filter(elm => elm.author === this.props.loggedUser._id)
        this.setState({ userRecipes: filteredRecipes })

    }

    render() {
        return (
            <>
                {this.state.userRecipes &&
                    <>
                        { this.state.userRecipes.map(elm => <RecipeCard loggedUser={this.props.loggedUser} {...elm} key={elm._id} likeButton={this.handleFavButton} />)}
                    </>
                }
            </>

            // <Link to={`/detail/${this.props._id}`} className='recipe-link'>
            //     <Container className='feed'>
            //         <Row className='card-content'>
            //             <Col md={4}>
            //                 <figure>
            //                     <Image className='recipe-img' src={this.props.img} />
            //                 </figure>
            //             </Col>
            //             <Col md={8} className='feed-card'>
            //                 <div className='recipe-like'>
            //                     <h5 className='recipe-name'>{this.props.name}</h5>
            //                     <Button onClick={() => this.props.likeButton(this.props._id)}>💛</Button>
            //                 </div>
            //                 <p>Raciones: {this.props.servings} | Tiempo de preparación: {this.props.time} minutos</p>
            //             </Col>
            //         </Row>
            //     </Container>
            // </Link>
        )
    }
}



export default filterRecipes