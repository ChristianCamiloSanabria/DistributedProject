import Task from "../schema/task.js";
import index from "../views/index_html.js";
import express from "express";
import Student from "../schema/student.js";

const router = express.Router();



router.get("/cuenta/:idcuenta/:idPersona",(req,res)=>{
	console.log(req.params);
	console.log(req.params.idcuenta);
	console.log(req.params.idPersona);
	res.send("Tu cuenta personal");
});


//Metodos GET

/**
	
**/
router.get('/',async (req, res) => {
	//Aqui estoy recogiendo los datos del servidor
	const tasks_db = await Task.find();
	console.log(tasks_db);
	/*Aqui es donde se le pasa dos parametros al navegador 
		Primer_Parametro: index que viene el html
		Segundo_Parametro: El objeto .JSON que viene por tasks_db
	
	res.render("index",{
		tasks: tasks_db
	}); 
	*/
	//res.send('Hollo world!');
	//console.log(index);
	//res.send(index);
	res.send("Hola");

});









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


router.get("/show/list_student",async (req, res) => {
	const listStudent = await Student.find();
	var students ="";
	listStudent.forEach(function(element) {
		students += element;
		console.log(students);
	});

	res.status(200).send("GET::"+students);
});


 
/**
** POST
** Servicio de insertar a la DB un estudiante. 
**/

router.post("/add/:id_student/:number_document/:type_document/:name_student/:lastname_student/:code_student",async (req, res) => {
	try{
		console.log("Aqui llegan los parametros"+req.params);
		const listStudent = await Student.find();
		if(checkStudent(req.params,listStudent)){
			//const student = new Student({"id_student": req.params.id_student,"number_document": req.params.number_document,"type_document": '"'+req.params.type_document+'"',"name_student": '"'+req.params.name_student+'"',"lastname_student": '"'+req.params.lastname_student+'"',"code_student": req.params.code_student,"status": "true"});
			const student = new Student(req.params);
			console.log("Aqui se crea el estudiante:"+student);
			res.status(200).send("Post: Saved Student"+ await student.save());	
		}else{
			res.status(200).send("El estudiante ya se encuantra registrado");
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
		if (element.name_student==student.name_student&&element.lastname_student==student.lastname_student) {
			bolean = false;
		}
	});
	return bolean;
}


export default router;