'use strict';
const Sequelize = require('../config');
const {v4:uuidv4}=require('uuid')
const {DataTypes}=require("sequelize")
const User=require('../models/user')

const Tickets =Sequelize.define("Tickets",{
  ticketId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
  userId:{
    type:DataTypes.UUID,
    foreignKey:true,
  },
  data:{
    type:DataTypes.JSON,
  },
});

module.exports=Tickets