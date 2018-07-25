var router = require('express').Router();
var sequelize = require('../db');
var Post = sequelize.import('../models/post');
//Get All Items for User
router.get('/', function (req, res){
    var userid = req.user.id;

    Post
        .findAll({
            //where: { owner: userid }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

//Post Single Item for User
router.post('/', function (req, res){
    var owner = req.user.id;
    var post = req.body.post.post;

    Post
        .create({
            post: post,
            owner: owner
        })
        .then(
            function createSuccess(post,owner) {
                res.json({
            post: post,
            owner: owner
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

//Get single Item for User
router.get('/:id', function(req,res){
    var data = req.params.id;
    var userid = req.user.id;

    Post
    .findOne({
        where: { id: data, owner: userid }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
});

//Delete Item for User
router.delete('/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    Post
    .destroy({
        where: {id: data, owner: userid }
    }).then(
        function deletePostSuccess(data){
            res.send("you removed a post");
        },
        function deletePostError(err){
            res.send(500, err.message);
        }
    );
});
//Update item for User
router.put('/:id', function(req,res){
    var userid = req.user.id;
    var data = req.params.id;
    var post = req.body.post.post
    
    Post
    .update({
        post: post,
    },
    {where: {id: data, owner: userid }}
    ).then(
        function updateSuccess(updatedPost) {
        res.json({
           updatedPost: updatedPost
        });
    },
    function updateError(err){
        res.send(500, err.message);
    }
    )
});

module.exports = router;