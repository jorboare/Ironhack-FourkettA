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

//Update User
router.put('/updateUser', (req, res) => {

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
        .findByIdAndDelete(req.query.user_Id, req.body)
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err))

})
module.exports = router