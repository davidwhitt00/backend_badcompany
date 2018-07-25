module.exports = function (sequelize, DataTypes) {
    return sequelize.define("user", {
        username: {type: DataTypes.STRING, unique: true},
        passwordhash: DataTypes.STRING
    });
};


