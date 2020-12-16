import './Recipe-card.css'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RecipeCard = ({ _id, img, name, servings, time, likeButton, loggedUser }) => {

    return (
        <>

            <Container className='recipe-card'>
                <Row >

                    <Col md={{ span: 3, offset: 1 }} className='align-items-center recipe-img-col'>
                        <figure>
                            <Link to={`/detail/${_id}`}>
                                <Image className='recipe-img-card' src={img} />
                            </Link>
                        </figure>
                    </Col>
                    <Col md={6} className='recipe-card-col'>
                        <Link to={`/detail/${_id}`} className='recipe-card-text'>
                            <h5>{name}</h5>
                            <p>Raciones: {servings} | Tiempo de preparación: {time} minutos</p>
                        </Link>
                    </Col>
                    <Col md={1} >

                        {!loggedUser.favRecipes.includes(_id) ?
                            <Button className='fav-btn-card' onClick={() => likeButton(_id)}>💛</Button>
                            :
                            <Button className='fav-btn-card liked' onClick={() => likeButton(_id)}>💔</Button>
                        }
                    </Col>
                </Row>

            </Container>

        </>
    )
}

export default RecipeCard