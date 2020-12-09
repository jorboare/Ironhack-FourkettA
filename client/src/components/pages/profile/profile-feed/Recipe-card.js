import './Recipe-card.css'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

const RecipeCard = (props) => {
    return (
        // <Link to={`/detail/${recipes._id}`} className='recipe-link'>
        <Container className='feed'>
            <Row className='card-content'>
                <Col md={4}>
                    <figure>
                        <Image className='recipe-img' src={props.img} />
                    </figure>
                </Col>
                <Col md={8} className='feed-card'>
                    <div className='recipe-like'>
                        <h5 className='recipe-name'>{props.name}</h5>
                        <Button onClick={() => props.likeButton(props._id)}>💛</Button>
                    </div>
                    <p>Raciones: {props.servings} | Tiempo de preparación: {props.time} minutos</p>
                </Col>
            </Row>
        </Container>
        // </Link>
    )
}

export default RecipeCard