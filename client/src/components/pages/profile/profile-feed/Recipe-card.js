

const RecipeCard = ({ recipes }) => {
    console.log(recipes)
    return (
        <div className='feed'>
            <div className='feed-card'>
                <h5 className='recipe-name'>{recipes.name}</h5>
                <p>Raciones: 4 | Ingredientes: lista de ingredientes</p>
            </div>
        </div>
    )
}

export default RecipeCard