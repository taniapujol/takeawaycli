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
// obteniendo datos de la tabla categoria
$app->get("/getCategoria", function() use($db, $app) {
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
// obteniendo datos de la tabla singin 'registro de usuarios'
$app->get("/getUser", function() use($db, $app) {
	$query = $db->query("SELECT * FROM singin");
	$users = array();
	while ($fila = $query->fetch_assoc()) {
		$users[] = $fila;
	}
	echo json_encode([
		"status" 	=> "success",
		"data"		=> $users
		]);

});

// Enviando result de la app elegida
$app->run();
