import './Recipe-card.css'
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EmptyHeart from './images/heart.png'
import FullHeart from './images/heart (1).png'
import Servings from './images/user.png'
import Time from './images/stopwatch.png'
import Leaf from './images/leaf.png'

const RecipeCard = ({ _id, img, name, servings, time, type, likeButton, loggedUser, colmd }) => {

    return (
        <Col xs={12} sm={6} md={colmd} ld={4} style={{ "marginBottom": "20px" }}>
            <div className='recipe-card-col'>

                <Link to={`/detail/${_id}`} className='recipe-card-img'>
                    <Image className="profile-recipe-img-card" variant="top" src={img} />
                </Link>

                <Link to={`/detail/${_id}`} className='recipe-card-text'>


                    <h4>{name}</h4>

                    <div className='recipe-border-line'>
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
                    </div>

                </Link>
                <div className='recipe-card-btns'>
                    {!loggedUser.favRecipes.includes(_id) ?
                        <Link to="#" className='fav-btn-card' onClick={() => likeButton(_id)}>
                            <Image className='emptyHeart' src={EmptyHeart} />
                        </Link>
                        :
                        <Link to="#" className='fav-btn-card liked' onClick={() => likeButton(_id)}>
                            <Image className='fullHeart' src={FullHeart} />
                        </Link>
                    }
                </div>
            </div>


        </Col>
    )
}

export default RecipeCard