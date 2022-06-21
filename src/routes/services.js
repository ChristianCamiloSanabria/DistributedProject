import Task from "../schema/task.js";
import index from "../views/index_html.js";
import express from "express";


const router = express.Router();


router.get("/cuenta/:idcuenta/:idPersona", (req, res) => {
    console.log(req.params);
    console.log(req.params.idcuenta);
    console.log(req.params.idPersona);
    res.send("Tu cuenta personal");
});


//Metodos GET

/*
/!**

 **!/
router.get('/', async (req, res) => {
    //Aqui estoy recogiendo los datos del servidor
    const tasks_db = await Task.find();
    console.log(tasks_db);
    /!*Aqui es donde se le pasa dos parametros al navegador
        Primer_Parametro: index que viene el html
        Segundo_Parametro: El objeto .JSON que viene por tasks_db

    res.render("index",{
        tasks: tasks_db
    });
    *!/
    //res.send('Hollo world!');
    //console.log(index);
    //res.send(index);
    res.send("Hola");

});
*/

/**
 ** GET
 **
 **/
router.get("/show/last_saved_student", async (req, res) => {
    const listStudent = await Student.find();
    let lastStudent = "";
    listStudent.forEach(function (element) {
        lastStudent = element;
        console.log(lastStudent);
    });

    res.status(200).send("GET:lastStudent:" + lastStudent);
});


/**
 ** POST
 **
 **/

router.post("/add/:id_student/:number_document/:name_student/:type_document/:lastname_student/:code_student", async (req, res) => {
    console.log(req.params);
    const student = new Student({
        "id_student": req.params.id_student,
        "number_document": req.params.number_document,
        "type_document": '"' + req.params.type_document + '"',
        "name_student": '"' + req.params.name_student + '"',
        "lastname_student": '"' + req.params.lastname_student + '"',
        "code_student": req.params.code_student,
        "status": "true"
    });
    console.log(student);
    res.status(200).send("Post: Saved Student" + await student.save());
});
export default router;