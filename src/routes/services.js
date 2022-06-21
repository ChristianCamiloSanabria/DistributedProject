import Task from "../schema/task.js";
import express from "express";
import Student from "../schema/student.js";
import Subject from "../schema/subject.js";
import Inscription from "../schema/inscription.js";


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
 * PUT Materia
 */
router.put('put/:id_subject/:name_Subject/:code_subject/:quotes/:status', async (req, res) => {
    try {
        const listSubjects = await Subject.find();
        let id_subject = Number(req.params.id_subject);
        listSubjects.forEach(function (element) {
            if (element.id_subject == id_subject) {
                element.name_subject = req.params.name_subject;
                element.code_subject = Number(req.params.code_subject);
                element.quota = Number(req.params.quotes);
                element.status = Boolean(req.params.status);
                console.log(element.toString());
            }
        });
    } catch (error) {
        res.status(400).send("Bad request!");
    }
    res.status(201).send("Put: Update Subject");
});

/***
 * PUT Estudiante
 */
router.put('put/:id_student/:number_document/:type_document/:name_student/:lastname_student/:code_student', async (req, res) => {
    try {
        const listStudent = await Student.find();
        let id_student = req.params.id_student;
        listStudent.forEach(function (element) {
            if (element.id_student == id_student) {
                element.number_document = Number(req.params.number_document);
                element.type_document = req.params.type_document;
                element.name_student = req.params.name_student;
                element.lastname_student = req.params.lastname_student;
                element.code_student = req.params.code_student;
                console.log(element.toString());
            }
        });
    } catch (error) {
        res.status(400).send("Bad request!");
    }
    res.status(201).send("Put: Update Student");
});

/***
 * PUT Inscripcion
 */
router.put('put/:id_inscription/:id_student/:id_subject', async (req, res) => {
    try {
        const listInscriptions = await Inscription.find();
        let id_inscription = req.params.id_inscription();
        listInscriptions.forEach(function (element) {
            if (element.id_inscription == id_inscription) {
                element.id_student = Number(req.params.id_student);
                element.id_subject = req.params.id_subject;
                console.log(element.toString());
            }
        });
    } catch (error) {
        res.status(400).send("Bad request!");
    }
    res.status(201).send("Put: Update Inscription");
});

export default router;