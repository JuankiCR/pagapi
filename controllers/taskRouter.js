const taskRouter = require('express').Router();
const { newTask, deleteTask, myTasks, editTask} = require('../services/tasks');

taskRouter.get('/mytasks/:user_id', (request, response) => {
    const user_id = Number(request.params.user_id);

    myTasks(user_id)
    .then(tasks => {
        if (tasks.length >= 1){
            tasks.push({"message": "Tareas encontradas ^•ﻌ•^ฅ"});
            response.status(302).json(tasks);
        }else{
            response.status(400).json({"message": "Tareas no encontradas ^◦ᆽ◦^"});
        }
    }).catch(e => {
        response.status(400).json(e);
    });
});

taskRouter.post('/create', (request, response) => {
    const task = request.body;

    newTask(task)
    .then(() => {
        response.status(201).json({"message": "Tarea creada ฅ^•ﻌ•^ฅ"});
    }).catch(() => {
        response.status(400).json({"message": "Error al crear tarea ^◦ᆽ◦^"});
    });
});

taskRouter.put('/update',(request, response) => {
    const task = request.body;

    editTask(task)
    .then(status => {
        if (status === 1){
            response.status(202).json({"message": "Tarea editada ฅ^•ﻌ•^ฅ"});
        }
        if (status === 0){
            response.status(400).json({"message": "Error al editar tarea ^◦ᆽ◦^"});
        }
    }).catch(e => {
        response.status(500).json(e);
    });
});

taskRouter.delete('/', (request, response) => {
    const task_id = request.body;

    console.log(task_id)

    deleteTask(task_id)
    .then(status => {
        if (status === 1){
            response.status(200).json({"message": "Tarea eliminada ฅ^◦ᆽ◦^ฅ"});
        }
        if (status === 0){
            response.status(400).json({"message": "Tarea no eliminada ^◦ᆽ◦^"});
        }
    }).catch(e => {
        response.status(500).json(e);
    });
});

module.exports = taskRouter;