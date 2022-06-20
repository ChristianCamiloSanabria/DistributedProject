import Task from "../schema/task.js";
import index from "../views/index_html.js";
import express from "express";
import Student from "../schema/student.js";

const router = express.Router();


router.get("/cuenta/:idcuenta/:idPersona", (req, res) => {
    console.log(req.params);
    let va = req.params.idPersona;
    console.log(req.params.idcuenta);
    console.log(va);

    res.send("Tu cuenta personal: " + req.params.idPersona);
});
/**
 *
 */
router.get("/students/:id_student", async (req, res) => {
    console.log(req.params);
    let va = req.params.id_student;
    console.log(va);
    const tasks_db = await Student.find({"id_student": va});
    console.log(tasks_db);
    res.send("Estudiante: " + req.params.id_student);
});

router.put("/")


//Metodos GET

/**
 xde
 **/
/*
router.get('/', async (req, res) => {
    //Aqui estoy recogiendo los datos del servidor
    const tasks_db = await Task.find();
    console.log(tasks_db);
    const task = {
        title: "Juan",
        description: "344",
        status: true
    };
    const task3 = await Task.send(task);
    const task2 = await Task.save();
    res.status(201).send({task});


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
router.get("/show/last_saved_student",async (req, res) => {
	const listStudent = await Student.find();
	var lastStudent ="";
	listStudent.forEach(function(element) {
		lastStudent = element;
		console.log(lastStudent);
	});

	res.status(200).send("GET:lastStudent:"+lastStudent);
});




/**
** POST
**
**/

router.post("/add/:id_student/:number_document/:name_student/:type_document/:lastname_student/:code_student",async (req, res) => {
	console.log(req.params);
	const student = new Student({"id_student": req.params.id_student,"number_document": req.params.number_document,"type_document": '"'+req.params.type_document+'"',"name_student": '"'+req.params.name_student+'"',"lastname_student": '"'+req.params.lastname_student+'"',"code_student": req.params.code_student,"status": "true"});
	console.log(student);
	res.status(200).send("Post: Saved Student"+ await student.save());
});




/**
router.post("/add/:id_student/:number_document/:name_student/:type_document/:lastname_student/:code_student",async (req, res) => {
	console.log(req.params);

	const student = new Student({"id_student": req.params.id_student,"number_document": req.params.number_document,"type_document": '"'+req.params.type_document+'"',"name_student": '"'+req.params.name_student+'"',"lastname_student": '"'+req.params.lastname_student+'"',"code_student": req.params.code_student,"status": "true"});
	console.log(student);
	await student.save();
	

	//Aqui estoy recogiendo los datos del servidor
	//const student_db = new Student(null,"{_id: 12}","{id_student: 12,number_document: 1049,type_document: 'carnet',name_student: 'christian',lastname_student: 'Sanabria',code_student: 2332,status: 'true'");
	//const student_db = new Student();
	//console.log("Esto es la respuesta del Mongo:  "+await student_db.save());
	//console.log(new Student(null,null,"{id_student: 12,number_document: 1049,type_document: 'carnet',name_student: 'christian',lastname_student: 'Sanabria',code_student: 2332,status: 'true'"));
	
	const listStudent = await Student.find();

	listStudent.forEach(function(element) {
		const v = element;
	  console.log(v);
	});


	Aqui es donde se le pasa dos parametros al navegador 
		Primer_Parametro: index que viene el html
		Segundo_Parametro: El objeto .JSON que viene por tasks_db
	
	res.render("index",{
		tasks: tasks_db
	}); 

	//res.send('Hollo world!');
	//console.log(index);
	//res.send(index);
	console.log("Esto es lo que quiero mostrar: " + req);

	req.forEach(function(element) {
		const v = element;
	  console.log(v);
	});
	//res.status(status).send(req.body);
	res.status(200).send("Post");

});

**/







export default router;