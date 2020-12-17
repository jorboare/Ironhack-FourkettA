import './Recipe-card.css'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EmptyHeart from './images/heart.png'
import FullHeart from './images/heart (1).png'
import Servings from './images/user.png'
import Time from './images/stopwatch.png'
import Leaf from './images/leaf.png'

const RecipeCard = ({ _id, img, name, servings, time, type, likeButton, loggedUser }) => {

    return (
        <>

            <Container className='recipe-card'>
                <Row >

                    <Col md={{ span: 3, offset: 1 }} className='recipe-img-col'>
                        <figure>
                            <Link to={`/detail/${_id}`}>
                                <Image className='recipe-img-card' src={img} />
                            </Link>
                        </figure>
                    </Col>
                    <Col md={6} className='recipe-card-col'>
                        <div className='recipe-border-line'>
                            <Link to={`/detail/${_id}`} className='recipe-card-text'>
                                <h5>{name}</h5>
                                <div className='recipe-information'>
                                    <p>
                                        <Image className='servings-img' src={Servings} />
                                        {servings}
                                    </p>
                                    <p>
                                        <Image className='time-img' src={Time} />
                                        {time}'
                                </p>

                                    {type === 'vegetariana' && <p><Image className='time-img' src={Leaf} /> vegetariana</p>}
                                    {type === 'vegana' && <p><Image className='time-img' src={Leaf} /> vegana</p>}
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col md={1} >

                        {!loggedUser.favRecipes.includes(_id) ?
                            <Button className='fav-btn-card' onClick={() => likeButton(_id)}>
                                <span className='unliked-btn'><Image className='emptyHeart' src={EmptyHeart} /></span>
                                <span className='likeHeart'><Image className='fullHeart' src={FullHeart} /></span>


                            </Button>
                            :
                            <Button className='fav-btn-card liked' onClick={() => likeButton(_id)}>
                                <span className='likedHeart'><Image className='fullHeart' src={FullHeart} /></span>
                                <span className='unlike-btn'><Image className='emptyHeart' src={EmptyHeart} /></span>

                            </Button>
                        }
                    </Col>
                </Row>

            </Container>

        </>
    )
}

export default RecipeCard