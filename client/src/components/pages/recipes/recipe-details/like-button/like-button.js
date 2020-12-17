import EmptyHeart from './../images/heart.png'
import FullHeart from './../images/heart (1).png'
import { Button, Image } from 'react-bootstrap'


const LikeButton = ({ favRecipes, handleFavButton, recipe }) => {
    return (
        <>
            {!favRecipes.includes(recipe._id) ?
                <Button className='detail-fav-btn-card' onClick={() => handleFavButton(recipe._id)}>
                    <span className='detail-unliked-btn'><Image className='emptyHeart' src={EmptyHeart} /></span>
                    <span className='detail-likeHeart'><Image className='fullHeart' src={FullHeart} /></span>


                </Button>
                :
                <Button className='detail-fav-btn-card liked' onClick={() => handleFavButton(recipe._id)}>
                    <span className='detail-likedHeart'><Image className='fullHeart' src={FullHeart} /></span>
                    <span className='detail-unlike-btn'><Image className='emptyHeart' src={EmptyHeart} /></span>

                </Button>
            }
        </>
    )
}
export default LikeButton