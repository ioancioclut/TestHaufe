const Sequelize = require('sequelize');
const user = require('./models/user')

const username = process.env.DB_USER || 'haufe';
const password = process.env.DB_PASSWORD || 'test';
const host = process.env.DB_HOST || 'localhost';
const database = username;


const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres'
});

const User = user(sequelize);

module.exports = {sequelize, User};