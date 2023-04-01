<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Header: *");

require('../services/db_service.php');


$service = new DbService();

try {
    $response = $service->get_specialisations();

    if ($response) {
        echo json_encode($response);
    } else
        echo -1;
} catch (Exception $e) {
    echo $e->getMessage();
}