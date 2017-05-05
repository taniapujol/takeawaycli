<?php
header("access-control-allow-origin:*");
require_once 'vendor/autoload.php';

$app = new \Slim\Slim();
// Datos de la base de datos
$host= 'localhost';
$username = 'root';
$password = '';
$bdname = 'takeawaycli';
// Conectar con base de datos
$db = new mysqli($host, $username, $password, $bdname);
mysqli_set_charset($db,"utf8");
// funciones par platos y categorias __________________________________________
	// obteniendo datos de la tabla platos
	$app->get("/getPlatos", function() use($db, $app) {
		$query = $db->query("SELECT * FROM platos");
		$platos = array();
		$cont = 0;
		while ($fila = $query->fetch_assoc()) {
			$platos[] = $fila;
			$cont++;
		}
		echo json_encode([
			"status" 	=> "success",
			"cont"		=> $cont,
			"data"		=> $platos
			]);

	});
	// obteninedo activos de la tabla platos
	$app->get("/onActivos", function() use($db, $app) {
		$query = $db->query("SELECT * FROM platos WHERE activado = 0");
		$activos = array();
		while ($fila = $query->fetch_assoc()) {
			$activos[] = $fila;
		}
		$activos = count($activos);
		echo json_encode([
			"status" 	=> "success",
			"data"		=> $activos
		]);
	});
	// obteniendo datos de la tabla categoria
	$app->get("/getCategorias", function() use($db, $app) {
		$query = $db->query("SELECT * FROM categoria");
		$cat = array();
		$cont = 0;
		while ($fila = $query->fetch_assoc()) {
			$cat[] = $fila;
			$cont++;
		}
		echo json_encode([
			"status" 	=> "success",
			"cont"		=> $cont,
			"data"		=> $cat
			]);

	});
	// Obteniendo datos del plato por su id
	$app->get("/getPlato/:id", function($id) use($db, $app) {
		$query = $db->query("SELECT * FROM platos WHERE id=$id");
		$plato = $query->fetch_assoc();
		echo json_encode([
			"status" 	=> "success",
			"data"		=> $plato
			]);
	});
	// Obteniendo datos de la categoria por su id
	$app->get("/getCategoria/:id", function($id) use($db, $app) {
		$query = $db->query("SELECT * FROM categoria WHERE id=$id");
		$categoria = $query->fetch_assoc();
		echo json_encode([
			"status" 	=> "success",
			"data"		=> $categoria
			]);
	});
	// editar plato de la base de datos por su id
	$app->post("/editPlato/:id", function($id) use($db, $app) {
		$json = $app->request->post("json");
		$data = json_decode($json, true);
		$query = "UPDATE platos SET "
				. "nombre = '{$data["nombre"]}', "
				. "activado = '{$data["activado"]}', "
				. "descripcion = '{$data["descripcion"]}', "
				. "precio = '{$data["precio"]}', "
				. "foto = '{$data["foto"]}' "
				. " WHERE id={$id}";
		$update = $db->query($query);
		if ($update) {
			$result = array(
				"status" => "success",
				"message" => "El plato se ha actualizado correctamente!!!"
			);
		} else {
			$result = array(
				"status" => "error",
				"message" => "El plato NO SE HA actualizado!!!"
			);
		}
		echo json_encode($result);
	});
	// editar categoria de la base de datos por su id
	$app->post("/editCategoria/:id", function($id) use($db, $app) {
		$json = $app->request->post("json");
		$data = json_decode($json, true);
		$query = "UPDATE categoria SET "
				. "nombre = '{$data["nombre"]}', "
				. "descripcion = '{$data["descripcion"]}'"
				. " WHERE id={$id}";
		$update = $db->query($query);
		if ($update) {
			$result = array(
				"status" => "success",
				"message" => "La categoria se ha actualizado correctamente!!!"
			);
		} else {
			$result = array(
				"status" => "error",
				"message" => "La categoria NO SE HA actualizado!!!"
			);
		}
		echo json_encode($result);
	});
	// borrar categoria de la base de datos por su id
	$app->get("/DeleteCategoria/:id", function($id) use($db, $app){
		$query ="DELETE FROM categoria WHERE id=$id";
		$deleteCat =  $db->query($query);
		if ($deleteCat) {
			$result = array(
				"status" => "success",
				"message"=> "la categoria se ha borrado correctamente!!!"
			);
		} else {
			$result = array(
				"status" => "error",
				"message"=> "La categoria NO SE HA borrado"
			);
		}
		echo json_encode($result);
	});
	// borrar plato de la base de datos por su id
	$app->get("/DeletePlato/:id", function($id) use($db, $app){
		$query = "DELETE FROM platos WHERE id=$id";
		$deletePlato = $db->query($query);
		if ($deletePlato) {
			$result = array(
				"status" => "success",
				"message"=> "la categoria se ha borrado correctamente!!!"
			);
		} else {
			$result = array(
				"status" => "error",
				"message"=> "La categoria NO SE HA borrado"
			);
		}
		echo json_encode($result);
	});
	// Crear plato en la base de datos
	$app->post("/addPlato", function() use($db, $app){
		$json = $app->request->post("json");
		$data = json_decode($json, true);
		$query ="INSERT INTO platos VALUES (null,"
			."'{$data["nombre"]}',"
			."'{$data["precio"]}',"
			."'{$data["descripcion"]}',"
			."'{$data["foto"]}',"
			."'{$data["activado"]}',"
			."'{$data["categoria"]}')";
		$insert = $db->query($query);
		if ($insert) {
			$result = array(
				"status" => "success",
				"message" => "El Plato se ha creado correctamente!!!"
			);
		} else {
			$result = array(
				"status" => "error",
				"message" => "El Plato NO SE HA CREADO!!!"
			);
		}
		echo json_encode($result);
	});
	// Crear categoria en la base de datos
	$app->post("/addCategoria", function() use($db, $app){
		$json = $app->request->post("json");
		$data = json_decode($json, true);
		$query = "INSERT INTO categoria VALUES (null,'{$data["nombre"]}','{$data["descripcion"]}')";
		$insert = $db->query($query);
		if ($insert) {
			$result = array(
				"status" => "success",
				"message" => "La categoria se ha creado correctamente!!!"
			);
		} else {
			$result = array(
				"status" => "error",
				"message" => "La categoria NO SE HA CREADO!!!"
			);
		}
		echo json_encode($result);
	});
//  funciones para usuarios _______________________________________
	// obteniendo datos de la tabla clientes
		$app->get("/getCliente/:nombre", function($nombre) use($db, $app) {
			$query = $db->query("SELECT * FROM cliente where nombre=$nombre");
			$cliente = array();
			while ($fila = $query->fetch_assoc()) {
				$cliente[] = $fila;
			}
			echo json_encode([
				"status" 	=> "success",
				"data"		=> $cliente
				]);

		});
	// obteniendo datos de la tabla clientes 'Login'
		$app->get("/getUser", function() use($db, $app){
			$query= $db->query("SELECT nombre, password FROM cliente");
			$cliente = array();
			while ($fila = $query->fetch_assoc()) {
				$cliente[] = $fila;
			}
			echo json_encode([
				"status" 	=> "success",
				"data"		=> $cliente
				]);

		});
	// introducir datos en la tabla clientes 'resgistro de usuarios'
		$app->post("/registro", function() use($db,$app){
			$json = $app->request->post("json");
			$data = json_decode($json, true);
			$query= "INSERT INTO cliente VALUES (null,'{$data["nombre"]}','{$data["email"]}','{$data["telf"]}','{$data["direccion"]}','{$data["cp"]}','{$data["password"]}', null)";
			$insert = $db->query($query);
			if ($insert) {
				$result = array(
					"status" => "success", 
					"message" => "El registro se ha registrado correctamente!!!"
				);
			} else {
				$result = array(
					"status" => "error", 
					"message" => "El resistro NO SE HA RESALIZADO"
				);
			}
			echo json_encode($result);

		});
	// introducir datos en la tabla contactForm 'formulario de contacto'
		$app->post("/addContact", function() use($db,$app){
			$json = $app->request->post("json");
			$data = json_decode($json, true);
			$query= "INSERT INTO contact_form VALUES (null,'{$data["nombre"]}','{$data["email"]}','{$data["mensaje"]}',null)";
			$update = $db->query($query);
			if ($update) {
				$result = array("status" => "success", "message" => "El contacto se ha registrado correctamente!!!");
			} else {
				$result = array("status" => "error", "message" => $query);
			}
			echo json_encode($result);
		});
// funciones para el carrito (pedido y Detalle-pedido)______________

$app->run(); // Fin de php 

