const express=require('express');
const app=express();
const dotenv=require('dotenv').config()
const port= process.env.port||5000;

const sequelize=require("./config")
const userModel=require("./models/user")
const ticketModel=require("./models/ticket")

// app routes 
app.use(express.json());
app.use('/',require('./routes/homeRoutes'))  // home route 
app.use("/user",require('./routes/userRoutes'))   // user Routes

//database 
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database successfully');
  })
  .catch((error) => {
    console.error('Unable to connect to database:', error);
  });
  
  // sync the models 
  userModel.sync({ sync: true });
  ticketModel.sync({sync:true});

  
  // app start 
app.listen(port,()=>{
 console.log(`Running server successfully on port ${port}!`)
});
