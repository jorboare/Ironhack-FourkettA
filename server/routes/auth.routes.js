const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")

const User = require("../models/user.model")

router.post('/signup', (req, res) => {

    const { username, password, img } = req.body

    if (!username || !password) {
        res.status(400).json({ message: 'Rellena todos los campos' })
        return
    }

    if (password.length < 4) {
        res.status(400).json({ message: 'Contraseña insegura' })
        return
    }

    User
        .findOne({ username })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: 'El usuario ya existe' })
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass, img })
                .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Login error' }) : res.status(200).json(newUser)))
                .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
})


router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.status(500).json({ message: 'Error authenticating user' });
            console.log(err)
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, err => err ? res.status(500).json({ message: 'Session error' }) : res.status(200).json(theUser))

    })(req, res, next)
})



router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Log out success!' });
})


router.get('/loggedin', (req, res) => req.isAuthenticated() ? res.status(200).json(req.user) : res.status(403).json({ message: 'Unauthorized' }))



//Search friends

router.get('/searchFriends', (req, res) => {

    User
        .find()
        .then(users => {
            const filteredArray = users.filter(elm => elm.username.toLowerCase().includes(req.query.username.toLowerCase()))
            res.json(filteredArray)
        })
        .catch(err => res.status(500).json(err))

})

//Find Recipe Author

router.get('/author', (req, res) => {

    console.log(req.query.user_Id)

    User
        .findById(req.query.user_Id)
        .then(author => res.json(author))
        .catch(err => res.status(500).json(err))

})

//Find User by Username

router.get('/userData', (req, res) => {

    console.log(req.query.username)

    User
        .findOne({ username: req.query.username })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))

})

//Follow users
router.put('/addFriends', (req, res) => {

    User
        .findByIdAndUpdate(req.query.user_Id, { $push: { friends: req.query.friend_Id } })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err))

})

//Delete friend
router.put('/deleteFriend', (req, res) => {

    const filteredFriends = req.body.friends.filter(elm => elm != req.query.friend_Id)

    User
        .findByIdAndUpdate(req.body._id, { friends: filteredFriends })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err))

})

//ADD RECIPE LIKE

router.put('/favRecipe', (req, res) => {

    User
        .findByIdAndUpdate(req.query.user_Id, { $push: { favRecipes: req.query.recipe_Id } })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err))

})

//Delete friend
router.put('/deleteFav', (req, res) => {

    const filteredFavorites = req.body.favRecipes.filter(elm => elm != req.query.recipe_Id)

    User
        .findByIdAndUpdate(req.body._id, { favRecipes: filteredFavorites })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err))

})


//Update User
router.put('/updateUserImg', (req, res) => {

    console.log(req.query.user_Id)

    User
        .findByIdAndUpdate(req.query.user_Id, req.body)
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err))

})
//Delete User
router.get('/deleteUser', (req, res) => {

    console.log(req.query.user_Id)

    User
        .findByIdAndDelete(req.query.user_Id)
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err))

})
module.exports = router