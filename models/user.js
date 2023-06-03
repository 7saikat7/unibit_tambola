'use strict';
const Sequelize = require('../config');
const {v4:uuidv4}=require('uuid')
const {DataTypes}=require("sequelize")
const Tickets=require('../models/ticket')

const User =Sequelize.define("User",{
  userId:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true,
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    maxLength:60,
    allowNull:false,
    trim:true
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"00"
  },
  
});
User.hasMany(Tickets,{foreignKey:"userId",onDelete:"CASCADE"}),
Tickets.belongsTo(User,{foreignKey:"userId"}),

module.exports = User