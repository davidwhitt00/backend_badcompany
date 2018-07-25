var router = require('express').Router();
var sequelize = require('../db');
var Games = sequelize.import('../models/games');

//Get All Items for User
router.get('/', function (req, res){
    var userid = req.user.id;

    Games
        .findAll({
            where: { owner: userid }
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
    var skill = req.body.games.skill;
    var skillPlayed = req.body.games.skillPlayed;
    var notes = req.body.games.notes;
    var outcome = req.body.games.outcome;


    Games
        .create({
            skill: skill,
            owner: owner,
            skillPlayed: skillPlayed,
            notes: notes,
            outcome: outcome
        })
        .then(
            function createSuccess(skill,owner,skillPlayed,notes) {
                res.json({
            skill: skill,
            owner: owner,
            skillPlayed: skillPlayed,
            notes: notes,
            outcome: outcome
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

    Games
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

    Games
    .destroy({
        where: {id: data, owner: userid }
    }).then(
        function deleteGamesSuccess(data){
            res.send("you removed a game");
        },
        function deleteGamesError(err){
            res.send(500, err.message);
        }
    );
});
//Update item for User
router.put('/:id', function(req,res){
    var data = req.params.id;
    var skill = req.body.games.skill;
    var skillPlayed = req.body.games.skillPlayed;
    var notes = req.body.games.notes;
    var outcome = req.body.games.outcome
    
    Games
    .update({
        skill: skill,
        skillPlayed: skillPlayed,
        notes:notes,
        outcome:outcome
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedGames) {
        res.json({
           updatedGames: updatedGames
        });
    },
    function updateError(err){
        res.send(500, err.message);
    }
    )
});

module.exports = router;