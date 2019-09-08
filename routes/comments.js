const router = require('express').Router();
const Database = require('../db')
const DB = new Database()

const verify = require('./verifyToken')

//CREATE NEW COMMENT
router.post('/comment/new',verify,(req,res) => {
    const {post_id,comm_body} = req.body;
    //Check if data is sent
    if(!post_id || !comm_body) return res.status(400).json({"message":"Post id or comment body is missing!"})

    //Checking if comment body is empty
    if(comm_body === "" || comm_body === " ") return res.status(400).json({"message":"Comment body can't be empty!"})

    //Checking if post exist
    DB.getPostById(post_id)
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('Post/Tema sa datim ID-em ne postoji!')
            }else {
                //ADDING COMMENT TO DATABASE
                DB.addComment(req.body,req.user._id)
                .then((data) => {
                    res.send({message: "Komentar uspjesno dodan!"})
                })
                .catch((err) => {
                    console.log(err)
                    res.send({message:"Dodavanje komentara nije uspjelo!"})
                })
            }
        })
})

// EDIT COMMENT
router.post('/comment/edit',verify, (req,res) => {
    const {comm_id,comm_body} = req.body;
    //Check if any data is missing
    if(!comm_id) return res.status(400).send({message: "Comment ID is missing!"})
    if(!comm_body || comm_body === "" || comm_body === " ") return res.status(400).send({message:"Comment text is missing!"}) 

    //Check who created post
    DB.getCommentById(comm_id)
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('Komentar sa datim ID-em ne postoji!')
            }else {
                const postsUserID = data[0].user_id;
                //CHECK FOR OWNER
                if(postsUserID != req.user._id) return res.status(400).send('Access denied!');
                DB.editComment(comm_id,comm_body)
                .then((data) => {
                    res.send({message: "Komentar uspjesno editovan!"})
                })
                .catch((err) => {
                    console.log(err)
                    res.send({message:"Editovanje komentara nije uspjelo!"})
                })
            }
        })
})

//GET ALL COMMENTS FOR POST
router.get('/comments/post/:id',verify, (req,res) => {
    //Check if any data is missing
    if(!req.params.id) return res.status(400).send({message: "Post ID is missing!"})

    DB.getCommentByPostId(req.params.id)
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('Ne postoje komentari za dati Post/Temu!')
            }else {
                res.status(200).json(data);
            }
        })
})

// DELETE COMMENT
router.delete('/comment/:id',verify, (req,res) => {
    //Check if any data is missing
    if(!req.params.id) return res.status(400).send({message: "Comment ID is missing!"})

    //Check who created post
    DB.getCommentById(req.params.id)
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('Komentar sa datim ID-em ne postoji!')
            }else {
                const postsUserID = data[0].user_id;
                //CHECK FOR OWNER
                if(postsUserID != req.user._id) return res.status(400).send('Access denied!');
                DB.deleteComment(req.params.id)
                .then((data) => {
                    res.send({message: "Komentar uspjesno obrisan!"})
                })
                .catch((err) => {
                    console.log(err)
                    res.send({message:"Brisanje komentara nije uspjelo!"})
                })
            }
        })
})

//SEARCH COMMENT BY TEXT
router.get('/comments/search',verify, (req,res) => {
    const {search_text} = req.body;
    //Check if any data is missing
    if(!search_text) return res.status(400).send({message: "Search text for comments is missing!"})

    //Check who created post
    DB.getComments()
        .then((data) => {
            if(data.length == 0){
                res.status(400).send('There is no comments in database!')
            }else {
                let found = [];
                data.forEach(el => {
                    if(el.comm_body.includes(search_text))
                        found.push(el);
                });
                res.status(200).json(found)
            }
        })

})

module.exports = router;