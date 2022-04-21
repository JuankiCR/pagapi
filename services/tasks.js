const table = 'class_work';

const pg = require('knex')({
    client: 'pg',
    connection: 'postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':5432/'+process.env.DB
});

const myTasks = async (user_id) => {
    return pg.select().from(table).where({
        owner_id : user_id
    });
};

const newTask = async ({owner_id, class_id, description, state, due_date, task_type, submit_form}) => {
    due_date = new Date(due_date);
    limit_date = new Date(due_date - 1);

    console.log(due_date+" : "+limit_date);
    return pg(table).insert({
        owner_id : owner_id,
        class_id : class_id,
        description : description,
        state : state,
        due_date : due_date,
        limit_date : limit_date,
        task_type : task_type,
        submit_form : submit_form
    });
};

const editTask = async ({user_id, task_id, class_id, description, state, due_date, end_date, task_type, submit_form}) => {
    due_date = new Date(due_date);
    limit_date = new Date(due_date - 1);

    return pg(table).where({
        owner_id : user_id,
        task_id : task_id
    }).update({
        class_id : class_id,
        description : description,
        state : state,
        due_date : due_date,
        end_date : end_date === '' ? null : end_date,
        task_type : task_type,
        submit_form : submit_form
    });
}

const deleteTask = ({task_id}) => {
    return pg(table).where({
        task_id : task_id
    }).del();
};

module.exports = {
    myTasks,
    newTask,
    editTask,
    deleteTask
}