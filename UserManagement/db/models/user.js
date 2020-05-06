const Sequelize = require('sequelize');
const user = (sequelize) => {
    return sequelize.define('user', {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            role: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false
        });
}

module.exports = user;