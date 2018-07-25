module.exports = function (sequelize, DataTypes) {
    return sequelize.define("game", {
        outcome: DataTypes.STRING,
        owner: DataTypes.INTEGER,
        skill: DataTypes.INTEGER,
        skillPlayed: DataTypes.INTEGER,
        notes: DataTypes.STRING
    });
};