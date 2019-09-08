const router = require('express').Router();
const Database = require('../db')
const DB = new Database()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Joi = require('@hapi/joi')

//Shema for Register Validation
const regSchema = {
    username: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).required(),
    password2: Joi.string().min(8).required(),
    tos_check:  Joi.number().min(0).max(1)
}
//Shema for Login Validation
const logSchema = {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().required()
}

//REGISTER
router.post('/register',(req,res) => {
    
    //Data Validation
    const {error} = Joi.validate(req.body, regSchema);
    if (error) return res.status(400).send(error.details[0].message); 

    if( req.body.password !== req.body.password2) return res.status(400).send({"message":"Ponovljeni password mora biti isti!"});

    if(req.body.tos_check == false) return res.status(400).send({"message":"Prihvatite uvjete koristenja za uspjesnu registraciju!"});

    //Checking if user is already in Database
    DB.checkEmail(req.body.email)
        .then((data) => {
            if(data.length > 0){
                res.status(400).send('Korisnik je vec registriran!')
            }else {
                //Adding user to Database
                DB.addUser(req.body)
                .then(() => {
                    res.send({message: "Korisnik uspjesno dodan!"})
                })
                .catch((err) => {
                    console.log(err)
                    res.send({message:"Dodavanje nije uspjelo!"})
                })
            }
        })
    
    //Reading users from Database just for debugging
    /*
    DB.getUsers()
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    */
})
//LOGIN
router.post('/login', async (req,res) => {
    //Data Validation
    const {error} = Joi.validate(req.body, logSchema);
    if (error) return res.status(400).send(error.details[0].message); 

    //Checking if user is already in Database
    await DB.checkEmail(req.body.email)
        .then(async (data) => {
            if(data.length == 0)
                return res.status(400).send({message: 'Email is not found!'})
            else{
                //PASSWORD CHECK
                const user = await DB.getUserByEmail(req.body.email);
                const validPass = await bcrypt.compare(req.body.password,user[0].password);
                if(!validPass) return res.status(400).send({message:'Invalid Password!'});               
                
                //Create and assign token
                const token = jwt.sign({ _id: user[0].user_id},'nesto')
                res.header('Authorization',token).send({message: "Login successful, check the Authorization header for token!"});
            }
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send({message: 'Problem with server!'})
        })
})
module.exports = router;