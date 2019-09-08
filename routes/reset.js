const router = require('express').Router();
const Database = require('../db')
const DB = new Database()


const Joi = require('@hapi/joi')

const mailjet = require ('node-mailjet')
.connect('a54c724239bce6cf12a82b6f24dc81f4', '2464aa7abb7879e306381b96b6a915ea')


const jwt = require('jsonwebtoken')
const verify = require('./verifyToken')

router.post('/reset',async (req,res) => {
    //Check if email is sent at all
    if(req.body.email === ''){
        return res.json({message: 'Email required!'})
    }
    //Check if email exist in database
    await DB.checkEmail(req.body.email)
        .then(async (data) => {
            if(data.length == 0)
                return res.status(400).send({message: 'Email is not found!'})
            else {
                const token = jwt.sign({email: req.body.email},'reset');
                //Get user by email
                const user = await DB.getUserByEmail(req.body.email);
                //SENDING MAIL
                const request = mailjet
                    .post("send", {'version': 'v3.1'})
                    .request({
                    "Messages":[
                        {
                        "From": {
                            "Email": "bosniangc@gmail.com",
                            "Name": "FORUM PASSWORD RESET"
                        },
                        "To": [
                            {
                            "Email": user[0].email,
                            "Name": user[0].username
                            }
                        ],
                        "Subject": "Password reset!",
                        "TextPart": "Use the link to reset password, with link send in the body your new password like {password: younewpassword}",
                        "HTMLPart": "localhost:3000/reset/new/"+token,
                        "CustomID": "AppTest"
                        }
                    ]
                    })
                    request
                    .then((result) => {
                        console.log(result.body)
                        return res.status(200).send({message: "Link for password reset sent to your mail!"})
                    })
                    .catch((err) => {
                        console.log(err.statusCode)
                        return res.status(500).send({message: 'Problem with server!'})
                    })
            }
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send({message: 'Problem with server!'})
        })


})

router.post('/reset/new/:token',(req,res) => {
    if(!req.params.token) return res.status(400).send({message: "Token is missing!"})
    if(req.body.password === ''){
        return res.json({message: 'Password required!'})
    }

    const token = req.params.token;
    const verified = jwt.verify(token,'reset')
    req.user = verified;

    //Schema for password validation
    const passSchema = {
        password: Joi.string().min(8).required()
    }
    const {error} = Joi.validate(req.body, passSchema);
    if (error) return res.status(400).send(error.details[0].message); 

    //CHANGING PASSWORD
    DB.setPassword(req.body.password,req.user.email)
        .then(() => {
            return res.status(200).send({message: "Password Changed!"})
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send({message: "Problem with server!"})
        })


})

module.exports = router;