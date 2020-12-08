import './Recipe-card.css'
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipes }) => {
    console.log(recipes)
    return (
        <div className='feed'>
            <Link to={`/detail/${recipes._id}`}>
                <figure className='recipe-img'>
                    <Image className='recipe-img' src={recipes.img} />
                </figure>
                <div md={9} className='feed-card'>
                    <h5 className='recipe-name'>{recipes.name}</h5>
                    <p>Raciones: 4 | Ingredientes: lista de ingredientes</p>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard