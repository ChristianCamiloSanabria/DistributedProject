import express from "express";

const router = express.Router();

import Student from "../schema/student.js";
import Subject from "../schema/subject.js";
import Inscription from "../schema/inscription.js";


/**
 Get para mostrar las tres colecciones (Estudiantes, Materias e Inscripciones)
 **/
router.get('/showData', async (req, res) => {
    const students = await Student.find();
    const subjects = await Subject.find();
    const inscriptions = await Inscription.find();
    res.send("Students:" + students);
    res.send("subjects" + subjects);
    res.send("inscriptions" + inscriptions);
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

/***
 * Get Student
 */
router.get('/getStudent/:id_student', async (req, res) => {
    const students = await Student.find();
    let student = null;
    students.forEach(function (element) {
        if (req.params.id_student == element.id_student) {
            student = element.toString();
            res.status(200).send("Get Student" + student);
        }
    });
    if (student == null) {
        res.status(404).send("Estudiante no encontrado :(");
    }
});

/***
 * Get Inscription
 */
router.get('/getInscription/:id_inscription', async (req, res) => {
    const inscriptions = await Inscription.find();
    let inscription = null;
    inscriptions.forEach(function (element) {
        if (req.params.id_inscription == element.id_inscription) {
            inscription = element.toString();
            res.status(200).send("Get Inscription" + inscription);
        }
    });
    if (inscription == null) {
        res.status(404).send("No se encuentra inscripcion :(");
    }
});
/***
 * ------------------------------------- END GET ------------------------------
 */


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
        let id_inscription = req.params.id_inscription;
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

/***
 * ---------------------------------------- END PUTS------------------------------------------
 */

export default router;