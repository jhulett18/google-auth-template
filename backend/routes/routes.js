const express = require('express')
const app = express();
const router = express.Router()
const signUpTemplateCopy = require('../models/signUpModels')
const bcrypt = require('bcryptjs')


router.post('/signup', async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)


    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName, // all fields that are collected
        email:request.body.email,
        username:request.body.username,
        password:securePassword
    })
    signedUpUser.save() // saves user information 
    .then(data => {
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})


router.get('/signin')
module.exports = router