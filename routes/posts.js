const router = require('express').Router();
const Database = require('../db')
const DB = new Database()

const verify = require('./verifyToken')

/// MAKE NEW POST'\
router.post('/posts/new',verify,(req,res) => {
    const {post_name,post_body} = req.body;
    //Check if data is sent
    if(!post_name || !post_body) return res.status(400).json({"message":"Post name or body is missing!"})

    //Checking if name is empty
    if(post_body === "" || post_body === " ") return res.status(400).json({"message":"Post body can't be empty!"})

    //Checking if post name already exist
    DB.getPostByName(post_name)
        .then((data) => {
            if(data.length > 0){
                res.status(400).send('Post/Tema sa istim nazivom vec postoji!')
            }else {
                //ADDING POST TO DATABASE
                DB.addPost(req.body,req.user._id)
                .then((data) => {
                    res.send({message: "Post/tema uspjesno dodan!"})
                })
                .catch((err) => {
                    console.log(err)
                    res.send({message:"Dodavanje posta/teme nije uspjelo!"})
                })
            }
        })
})

// EDIT POST
router.post('/posts/edit',verify, (req,res) => {
    const {post_name,post_body} = req.body;
    //Check if any data is missing
    if(!post_name) return res.status(400).send({message: "Name of theme/post is missing!"})
    if(!post_body || post_body === "" || post_body === " ") return res.status(400).send({message:"Post/theme text is missing!"}) 

    //Check who created post
    DB.getPostByName(post_name)
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('Post/Tema sa datim nazivom ne postoji!')
            }else {
                const postsUserID = data[0].user_id;
                //CHECK FOR OWNER
                if(postsUserID != req.user._id) return res.status(400).send('Access denied!');
                DB.editPost(post_name,post_body)
                .then((data) => {
                    res.send({message: "Post/tema uspjesno editovano!"})
                })
                .catch((err) => {
                    console.log(err)
                    res.send({message:"Editovanje posta/teme nije uspjelo!"})
                })
            }
        })
})
//GET POST BY NAME
router.get('/post',verify, (req,res) => {
    const {post_name} = req.body;

    //Check if any data is missing
    if(!post_name) return res.status(400).send({message: "Name of theme/post is missing!"})
    if(!post_name || post_name === "" || post_name === " ") return res.status(400).send({message:"Post/theme name is empty!"}) 

    DB.getPostByName(post_name)
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('Post/Tema sa datim nazivom ne postoji!')
            }else {
                res.status(200).send({ "post_name" : data[0].post_name, "post_body" : data[0].post_body});
            }
        })
})
//GET POST BY ID
router.get('/post/:id',verify, (req,res) => {
    //Check if any data is missing
    if(!req.params.id) return res.status(400).send({message: "ID is missing!"})

    DB.getPostById(req.params.id)
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('Post/Tema sa datim nazivom ne postoji!')
            }else {
                res.status(200).send({ "post_name" : data[0].post_name, "post_body" : data[0].post_body});
            }
        })
})
//DELETE POST BY NAME
router.delete('/post/delete',verify, (req,res) => {
    const {post_name} = req.body;
    //Check if any data  is missing
    if(!post_name) return res.status(400).send({message: "Name of theme/post is missing!"})
    if(!post_name || post_name === "" || post_name === " ") return res.status(400).send({message:"Post/theme name is empty!"}) 

    //Check who created post
    DB.getPostByName(post_name)
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('Post/Tema sa datim nazivom ne postoji!')
            }else {
                const postsUserID = data[0].user_id;
                //CHECK FOR OWNER
                if(postsUserID != req.user._id) return res.status(400).send('Access denied!');
                DB.deletePostByName(post_name)
                .then((data) => {
                    res.send({message: "Post/tema uspjesno obrisana!"})
                })
                .catch((err) => {
                    console.log(err)
                    res.send({message:"Brisanje posta/teme nije uspjelo!"})
                })
            }
        })
})

//GET ALL POSTS
router.get('/posts',verify, (req,res) => {
    DB.getPosts()
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('There is no themes/posts in database!')
            }else {
                res.status(200).json(data);
            }
        })
})


module.exports = router;