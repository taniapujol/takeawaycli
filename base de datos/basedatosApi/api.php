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
$app->run();
