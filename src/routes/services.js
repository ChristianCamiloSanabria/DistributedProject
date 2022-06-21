import Task from "../schema/task.js";
import index from "../views/index_html.js";
import express from "express";
import Student from "../schema/student.js";
import Subject from "../schema/subject.js";


const router = express.Router();


router.get("/cuenta/:idcuenta/:idPersona", (req, res) => {
    console.log(req.params);
    console.log(req.params.idcuenta);
    console.log(req.params.idPersona);
    res.send("Tu cuenta personal");
});

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
    });
    if (subject == null) {
        res.status(404).send("No se encuentra materia :(");
    }
});

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
    }catch (error){

    }
});

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