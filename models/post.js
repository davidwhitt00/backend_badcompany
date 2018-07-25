module.exports = function (sequelize, DataTypes) {
    return sequelize.define("post", {
        post: DataTypes.STRING,
        owner: DataTypes.INTEGER
    
    });
};

