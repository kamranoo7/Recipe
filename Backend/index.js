const express = require('express');
const bodyParser = require('body-parser');
 // Import Axios
 let cors=require('cors')
const { connection } = require('./db');
const { savedRouter } = require('./Routes/preference.routes');
const { userRouter } = require('./Routes/user.routes');
const { auth } = require('./Middleware/auth.middleware');
const app = express();
app.use(cors())
require("dotenv").config()


app.use(bodyParser.json());
app.use(express.json())
// API Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Recipe API' });
});

// Recipe Search Endpoint
app.use("/users",userRouter)
app.use(auth)
app.use("/get",savedRouter)

// User Preferences Endpoint

  
  app.listen(process.env.port,async()=>{
    try{
await connection
console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log("Not Connected To DB")
    }
    console.log("Server is running")
})