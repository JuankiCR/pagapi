const userRouter = require('express').Router();
const { userLogin, userRegister} = require('../services/userData');

userRouter.post('/register', (request, response) => {
    const newUser = request.body;

    userRegister(newUser)
    .then(() => {
        response.status(202).json({"message": "Usuario registrado! ฅ^•ﻌ•^ฅ"});
    }).catch(() => {
        response.status(400).json({"message": "Error al registrar ^◦ᆽ◦^"});
    });
});

userRouter.post('/login', (request, response) => {
    const loginData = request.body;

    userLogin(loginData)
    .then(userData => {
        if (userData.length >= 1){
            userData.push({"message": "Usuario encontrado ^•ﻌ•^ฅ"});
            response.status(302).json(userData);
        }else{
            response.status(404).json({"message": "Usuario no encontrado ^ᵕﻌᵕ^zzZ "});
        }
    }).catch(e => {
        response.status(500).json(e);
    });
});

module.exports = userRouter;