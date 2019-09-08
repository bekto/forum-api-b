const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
 
// create the connection to database
module.exports = class DB {
    constructor(){
        this.connection = mysql.createConnection({
            host: '192.168.64.2',
            user: 'forumUser',
            password: 'forum123.',
            database: 'forum'
        })   
    }  
    async addUser(data){
        const {username,email,password}=data;
        //Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        let user = [username,email,hashedPassword];
        this.connection.query(`insert into user(username,email,password) values (?,?,?)`, user,
        (err,results) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    getUsers(){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT user.username,user.email,user.password from user',
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    checkEmail(email){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT * from user where email=?',[email],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    getUserByEmail(email){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT user.user_id,user.username,user.email,user.password from user where user.email =?',[email],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async setPassword(pass,email){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass,salt); 

        this.connection.query('UPDATE user SET password = ? WHERE email = ?;',[hashedPassword,email],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async getPostByName(postName){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT * from posts where posts.post_name =?',[postName],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async addPost(data,user_id){
        const {post_name,post_body}=data;
        
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query(`insert into posts(user_id,post_name,post_body,posting_date,last_edit_date) values (?,?,?,NOW(),NOW())`, [user_id,post_name,post_body],
        (err,results) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async editPost(post_name,post_body){
        
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query(`UPDATE posts SET post_body = ?, last_edit_date = NOW() WHERE post_name = ?;`, [post_body,post_name],
        (err,results) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async getPostById(postId){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT * from posts where posts.post_id =?',[postId],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async deletePostByName(post_name){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('delete from posts where posts.post_id =?',[post_name],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async addComment(data,user_id){
        const {post_id,comm_body}=data;
        
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query(`insert into comments(user_id,post_id,comm_body,posting_date,last_edit_date) values (?,?,?,NOW(),NOW())`, [user_id,post_id,comm_body],
        (err,results) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async getCommentById(commId){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT * from comments where comments.comm_id =?',[commId],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async editComment(comm_id,comm_body){
        
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query(`UPDATE comments SET comm_body = ?, last_edit_date = NOW() WHERE comm_id = ?;`, [comm_body,comm_id],
        (err,results) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async getCommentByPostId(postId){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT * from comments where comments.post_id =?',[postId],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async deleteComment(comm_id){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('delete from comments where comments.comm_id =?',[comm_id],
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async getPosts(){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT * from posts',
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
    async getComments(){
        let prResolve;
        let promis = new Promise((resolve,reject) => {
            prResolve = resolve;
        });
        this.connection.query('SELECT * from comments',
        (err,results,fields) => {
            if(err) throw err;
            prResolve(results);
        });
        return promis;
    }
}
