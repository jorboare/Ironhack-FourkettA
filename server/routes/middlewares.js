const mongoose = require('mongoose')

module.exports = {
    checkRecipeId: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.query.id) ? res.status(500).send({ message: 'ID inválido' }) : next(),
    checkParamsRecipeId: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.recipe_id) ? res.status(500).send({ message: 'ID inválido' }) : next(),
    checkUserId: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.query.user_Id) ? res.status(500).send({ message: 'ID inválido' }) : next()
}

