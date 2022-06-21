import Task from "../schema/task.js";
import express from "express";
const router = express.Router();

import Student from "../schema/student.js";
import Subject from "../schema/subject.js";
import Inscription from "../schema/inscription.js";




router.get("/cuenta/:idcuenta/:idPersona", (req, res) => {
    console.log(req.params);
    console.log(req.params.idcuenta);
    console.log(req.params.idPersona);
    res.send("Tu cuenta personal");
});
//-----------------------------------
/*
 * Get Subject
 */
router.get('/getSubject/:id_subject', async (req, res) => {
    const subjects = await Subject.find();
    let subject = null;
    subjects.forEach(function (element) {
        if (req.params.id_subject == element.id_subject) {
            subject = element.toString();
            res.status(200).send("Get subject" + subject);
        }

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
    if (subject == null) {
        res.status(404).send("No se encuentra materia :(");
    }
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
 * Servicios PATCH
 */

/***
 * Patch Student
 */
router.patch("/patch/:idStudent/:status" ,async (req, res) =>{
    try {
        const listStudents = await Student.find();
        let idStudent = req.params.idStudent;
        listStudents.forEach(function (element)
        {
            if (element.id_student == idStudent){
                element.status = req.params.status;
                res.status(200).send("staus changed")
            }
        });
    } catch (error) {
        res.status(400).send("Bad request!");
    }
    res.status(201).send("Put: Update Subject");
});

/***
 * Patch Subject
 */
router.patch("/patch/:id_subject/:status" ,async (req, res) =>{
    try {
        const listSubject = await Subject.find();
        let idSubject = req.params.id_subject;
        listSubject.forEach(function (element)
        {
            if (element.id_student == idSubject){
                element.status = req.params.status;
                res.status(200).send("staus changed")
            }
        });
    }catch (error){

    }
});

//-----------------------------END PATCH ------------------------

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