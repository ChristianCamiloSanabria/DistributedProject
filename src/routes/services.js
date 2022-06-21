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

router.get('/',async (req, res) => {
	//Aqui estoy recogiendo los datos del servidor
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
    }catch (error){

    }
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







//--------------------------POST---------------------------------- //
/**
** POST "/add/student/:id_student/:number_document/:type_document/:name_student/:lastname_student/:code_student"
** Servicio de insertar a la DB un estudiante. 
**/

router.post("/add/student/:id_student/:number_document/:type_document/:name_student/:lastname_student/:code_student",async (req, res) => {
	try{
		const infoServicio = req.params;
		console.log("Aqui llegan los parametros"+infoServicio);
		const listStudent = await Student.find();
		if(checkStudent(infoServicio,listStudent)){
			//const student = new Student({"id_student": infoServicio.id_student,"number_document": infoServicio.number_document,"type_document": '"'+infoServicio.type_document+'"',"name_student": '"'+infoServicio.name_student+'"',"lastname_student": '"'+infoServicio.lastname_student+'"',"code_student": infoServicio.code_student,"status": "true"});
			const student = new Student(infoServicio);
			console.log("Aqui se crea el estudiante:"+student);
			res.status(200).send("Post: Saved Student"+ await student.save());	
		}else{
			res.status(200).send("El estudiante ya se encuantra registrado o el codigo del estudiante ya se encuantra asignado");
		}
	} catch(err){
      console.error(err); //mostramos el error por consola para poder solucionar futuros errores
      res.status(500).send("error"); //en caso de error respondemos al cliente con un 500
    }
});

/**
** function checkStudent:
** Verifica si un estudiante ya se encuentra registrado en la base de datos.
** Return: un boleano que confirma si el estudiante se encuentra o no.
** Parametros de entrada: 
	student: Representa los datos del estudiante que se quiere insertar en la DB,
	listStudent: Listado de todos lo estudiantes actuales en la DB.
**/
function checkStudent(student,listStudent){
	let bolean= true;
	listStudent.forEach(function(element) {
		if (element.name_student==student.name_student&&element.lastname_student==student.lastname_student||element.code_student==student.code_student) {
			bolean = false;
		}
	});
	return bolean;
}


/**
** POST "/add/subject/:id_subject/:name_subject/:code_subject/:quotas/:status"
** Servicio de insertar a la DB una Materia. 
**/

router.post("/add/subject/:id_subject/:name_subject/:code_subject/:quotas/:status",async (req, res) => {
	try{
		const infoServicio = req.params;
		console.log("Aqui llegan los parametros"+infoServicio);
		const listSubject = await Subject.find();
		if(checkSubject(infoServicio,listSubject)){
			const subject = new Subject(infoServicio);
			console.log("Aqui se crea la Materia:"+subject);
			res.status(200).send("Post: Saved Subject"+ await subject.save());	
		}else{
			res.status(200).send("La Materia ya se encuantra registrada o el codigo de la materia esta ya asignado");
		}
	} catch(err){
      console.error(err); //mostramos el error por consola para poder solucionar futuros errores
      res.status(500).send("error"); //en caso de error respondemos al cliente con un 500
    }
});

/**
** function checkSubject:
** Verifica si una Materia ya se encuentra registrada en la base de datos.
** Return: un boleano que confirma si la Materia se encuentra o no.
** Parametros de entrada: 
	subject: Representa los datos de la Materia que se quiere insertar en la DB,
	listSubject: Listado de todos lo Materias actuales en la DB.
**/
function checkSubject(subject,listSubject){
	let bolean= true;
	listSubject.forEach(function(element) {
		if (element.name_subject==subject.name_subject||element.code_subject==subject.code_subject) {
			bolean = false;
		}
	});
	return bolean;
}


/**
** POST "/add/inscription/:id_inscription/:id_subject/:id_student"
** Servicio de insertar a la DB una Inscripcion. 
**/

router.post("/add/inscription/:id_inscription/:id_subject/:id_student",async (req, res) => {
	try{
		const infoServicio = req.params;
		console.log("Aqui llegan los parametros"+infoServicio);
		const listInscription = await Inscription.find();
		if(checkInscription(infoServicio,listInscription)){
			if (isSubject(infoServicio,await Subject.find())) {
				if (isStudent(infoServicio,await Student.find())) {
					const inscription = new Inscription(infoServicio);
					console.log("Aqui se crea la Inscripcion:"+inscription);
					res.status(200).send("Post: Saved Inscription"+ await inscription.save());		
				}else{
					res.status(200).send("El Estutiante no existe");
				}	
			}else{
				res.status(200).send("La materia no existe");
			}

		}else{
			res.status(200).send("La Inscripcion ya se encuantra registrada o el id_inscription de la Inscripcion esta ya asignado");
		}
	} catch(err){
      console.error(err); //mostramos el error por consola para poder solucionar futuros errores
      res.status(500).send("error"); //en caso de error respondemos al cliente con un 500
    }
});

/**
** function checkInscription:
** Verifica si una Inscripcion ya se encuentra registrada en la base de datos.
** Return: un boleano que confirma si la Inscripcion se encuentra o no.
** Parametros de entrada: 
	inscription: Representa los datos de la Inscripcion que se quiere insertar en la DB,
	listInscription: Listado de todas las inscripciones actuales en la DB.
**/
function checkInscription(inscription,listInscription){
	let bolean= true;
	listInscription.forEach(function(element) {
		if (element.id_inscription==inscription.id_inscription||element.id_subject==inscription.id_subject&&element.id_student==inscription.id_student) {
			bolean = false;
		}
	});
	return bolean;
}
/**
** function isSubject:
** Verifica si una Materia si existe en la base de datos.
** Return: un boleano que confirma si la Materia  existe.
** Parametros de entrada: 
	inscription: Representa los datos de la Materia que se quiere insertar en la DB,
	listSubject: Listado de todas las Materias actuales en la DB.
**/
 function isSubject(inscription,listSubject){
	let bolean= false;
	listSubject.forEach(function(element) {
		if (element.id_subject==inscription.id_subject) {
			bolean = true;
		}
	});
 	return bolean;
 }
/**
** function isStudent:
** Verifica si un Estudiante si existe en la base de datos.
** Return: un boleano que confirma si la Estudiante  existe.
** Parametros de entrada: 
	inscription: Representa los datos de la Estudiante que se quiere insertar en la DB,
	listStudent: Listado de todas las Materias actuales en la DB.
**/
 function isStudent(inscription,listStudent){
	let bolean= false;
	listStudent.forEach(function(element) {
		if (element.id_student==inscription.id_student) {
			bolean = true;
		}
	});
 	return bolean;
 }
//--------------------------POST- END--------------------------------- //

export default router;