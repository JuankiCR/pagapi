module.exports = function(app, database) {

    app.get('/', (request, response) => {
        response.json({"message" : "API for juankicr.dev"});
    });

    app.post('/register', (request, response) => {
        const newUser = request.body;

        console.log(newUser);

        database.userRegister(newUser)
        .then(() => {
            response.json({"message":"Usuario Registrado!"});
        }).catch(e => {
            response.status(500).json(e);
        });
    });

    app.post('/login', (request, response) => {
        const loginData = request.body;

        console.log(request.body);

        database.userLogin(loginData)
        .then(data => {
            response.json(data);
        }).catch(e => {
            response.status(500).json(request.body);
        });
    });
};