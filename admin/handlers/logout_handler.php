<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Header: *");

/**
 *	1	login	
 */

require('../services/users_db_service.php');

$service = new UsersDbService();
$_POST = json_decode(file_get_contents('php://input'), true);

$login = $_POST;

try {
    $response = $service->logout($login);
    if ($response === 0) {
        echo $response;
    } else
        echo -1;
} catch (Exception $e) {
    echo $e->getMessage();
}