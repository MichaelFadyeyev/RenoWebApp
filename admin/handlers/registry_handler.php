<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Header: *");

/* #region users clumns */

/**
 * 	1   id
 *	2	name	
 *	3	login	
 *	4	password
 *	5	phone
 *	6	role_id 
 *	7	status_id
 */
/* #endregion */

require('../services/users_db_service.php');

$service = new UsersDbService();
$_POST = json_decode(file_get_contents('php://input'), true);

$name = $_POST['name'];
$login = $_POST['login'];
$password1 = $_POST['password1'];
$password1 = $_POST['password2'];
$phone = $_POST['phone'];

try {
    $password = md5($password1);
    $role_id = 1;
    $status_id = 1;
    $service->registry($name, $login, $password, $phone, $role_id, $status_id);
    if ($response) {
        echo json_encode($response);
    } else
        echo -1;
} catch (Exception $e) {
    echo json_encode($e->getMessage());
}
