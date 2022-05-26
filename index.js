require('dotenv').config();
const cors = require('cors');
const express = require('express');
const userRouter = require('./controllers/userRouter');
const taskRouter = require('./controllers/taskRouter');

var whiteList = ['https://juankicr.dev/', 'https://shop.juankicr.dev/', 'https://api.juankicr.dev/', 'http://3.145.3.173:3000/', 'http://3.145.3.173:3005/', '*'];
var corsOptions = {
    origin: function (origin, callback){
        if (whiteList.indexOf(origin)   === -1){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
};

const pg = require('knex')({
	client : 'pg',
	connection : 'postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':5432/'+process.env.DB
})

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use('/user', userRouter);
app.use('/task', taskRouter);
app.get('/', (req,res) => {
	res.send('Hola Llamas')
})
app.get('/usuarios',(req,res) => {
	res.status(202).json(pg.select('*').from('Cliente'));
})
app.get('/administradores',(req,res) => {
	res.send(json(pg.select('*').from('Administradores')));
})
app.get('/eventos',(req,res) => {
	res.send(json(pg.select('*').from('Eventos')));
})

const PORT = 3004;
app.listen(PORT, () => {
    console.log('Server running on port: ' +PORT);
});
