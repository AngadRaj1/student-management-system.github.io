const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const cors = require('cors')


const user = require('./routes/user');

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/user/',user)


app.get('/',(req,res)=>{
    res.json({ name: "Angad" });
});

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// })


//connection from the db
mongoose.connect(config.DATABASE, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify: false
},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Connected to the DB !!')
    }
})

const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log('Server is running on port 3005');
})
