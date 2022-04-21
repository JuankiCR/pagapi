require('dotenv').config();
const cors = require('cors');
const express = require('express');
const userRouter = require('./controllers/userRouter');
const taskRouter = require('./controllers/taskRouter');

var whiteList = ['https://juankicr.dev/', 'https://shop.juankicr.dev/', 'https://api.juankicr.dev/', 'http://3.145.3.173:3000/', 'http://3.145.3.173:3005/'];
var corsOptions = {
    origin: function (origin, callback){
        if (whiteList.indexOf(origin)   === -1){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use('/user', userRouter);
app.use('/task', taskRouter);

const PORT = 3005;
app.listen(PORT, () => {
    console.log('Server running on port: ' +PORT);
});