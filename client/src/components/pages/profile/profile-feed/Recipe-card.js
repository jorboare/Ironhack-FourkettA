import './Recipe-card.css'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RecipeCard = (props) => {

    return (
        <>

            <Container className='recipe-card'>
                <Row >

                    <Col md={{ span: 3, offset: 1 }} className='align-items-center recipe-img-col'>
                        <figure>
                            <Link to={`/detail/${props._id}`}>
                                <Image className='recipe-img-card' src={props.img} />
                            </Link>
                        </figure>
                    </Col>
                    <Col md={6} className='recipe-card-col'>
                        <Link to={`/detail/${props._id}`} className='recipe-card-text'>
                            <h5>{props.name}</h5>
                            <p>Raciones: {props.servings} | Tiempo de preparación: {props.time} minutos</p>
                        </Link>
                    </Col>
                    <Col md={1} >

                        {!props.loggedUser.favRecipes.includes(props._id) ?
                            <Button className='fav-btn-card' onClick={() => props.likeButton(props._id)}>💛</Button>
                            :
                            <Button className='fav-btn-card liked' onClick={() => props.likeButton(props._id)}>💔</Button>
                        }
                    </Col>
                </Row>

            </Container>

        </>
    )
}

export default RecipeCard