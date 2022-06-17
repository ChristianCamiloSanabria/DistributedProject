import Task from "../schema/task.js";
import index from "../views/index_html.js";
import express from "express";


const router = express.Router();



router.get("/cuenta/:idcuenta/:idPersona",(req,res)=>{
	console.log(req.params);
	console.log(req.params.idcuenta);
	console.log(req.params.idPersona);
	res.send("Tu cuenta personal");
});


//Metodos GET

/**
	xde
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






export default router;