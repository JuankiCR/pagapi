const bcrypt = require('bcrypt');
const table_usr = 'Cliente';

const pg = require('knex')({
    client: 'pg',
    connection: 'postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':5432/'+process.env.DB
});

const userRegister = async ({name, lastname, email, nick, pass, avatar_color, bg_color}) => {
    const saltRounds = 10;
    const passHash = await bcrypt.hash(pass, saltRounds);
    
    return pg(table_usr).insert({
        name : name,
        lastname : lastname,
        email : email,
        nick : nick,
        pass : passHash,
        avatar_color : avatar_color === '' ? '000000' : avatar_color,
        bg_color : bg_color === '' ? 'ffffff' : bg_color
    });
};

const userLogin = ({user, pass}) => {
    return pg.select('nombreCliente', 'apellidoCliente').from(table_usr).where({
        noCuenta : user,
        passwordCliente : pass
    }).orWhere({
        noCuenta : user,
        passwordCliente : pass
    });
};

const selectTodos = ({tabla}) => {
	pg.select().from(tabla);
};

module.exports = {
    userRegister,
    userLogin,
    selectTodos
}
