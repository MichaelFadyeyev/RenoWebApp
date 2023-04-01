<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Header: *");

/**
 *	1	login	
 *	2	password
 */

require('../services/users_db_service.php');

$service = new UsersDbService();
$_POST = json_decode(file_get_contents('php://input'), true);

$login = $_POST['login'];
$password = $_POST['password'];

try {
    $password = md5($password);
    $response = $service->authenticate($login, $password);

    if ($response) {
        echo json_encode($response);
    } else
        echo -1;
} catch (Exception $e) {
    echo $e->getMessage();
}
