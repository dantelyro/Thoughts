const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Thought = db.define('Thoughts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

User.hasMany(Thought)
Thought.belongsTo(User)

module.exports = Thought
