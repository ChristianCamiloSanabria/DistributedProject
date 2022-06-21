import Task from "../schema/task.js";
import express from "express";
import Student from "../schema/student.js";


const router = express.Router();


router.get("/cuenta/:idcuenta/:idPersona", (req, res) => {
    console.log(req.params);
    console.log(req.params.idcuenta);
    console.log(req.params.idPersona);
    res.send("Tu cuenta personal");
});



/**
 URL vacia
 **/
router.get('/', async (req, res) => {
    const tasks_db = await Task.find();
    console.log(tasks_db);
        res.send("Hola");
});

/**
 * GET:
 *  Obtiene el ultimo estudiante guardado en la base de datos usando
 *  la URL /show/last_saved_student
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

router.post("/addStudent/:id_student/:number_document/:name_student/:type_document/:lastname_student/:code_student", async (req, res) => {
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


/***
 * Metodos PUT
 */


/***
 * PUT Estudiante
 */
router.put('put/:id_student/:number_document/:type_document/:name_student/:lastname_student/:code_student', async (req, res) => {
    try {
        const id = Number(req.params.id_student);
        const number_document = Number(req.params.number_document);
        const type_document = req.params.type_document;
        const name_student = req.params.name_student;
        const lastname_student = req.params.lastname_student;
        const code_student = req.params.code_student;
        let response = await db
    } catch (error) {
        res.send(error);
    }

});

/***
 * PUT materia
 */
router.put('put/:id_student/:number_document/:type_document/:name_student/:lastname_student/:code_student', async (req, res) => {
    try {
        const id = Number(req.params.id_student);
        const number_document = Number(req.params.number_document);
        const type_document = req.params.type_document;
        const name_student = req.params.name_student;
        const lastname_student = req.params.lastname_student;
        const code_student = req.params.code_student;
        let response = await db
    } catch (error) {
        res.send(error);
    }

});

export default router;