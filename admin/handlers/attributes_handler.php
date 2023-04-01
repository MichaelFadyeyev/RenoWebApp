<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Header: *");

require_once('../services/db_service.php');

if (isset($_GET["action"])) {
    $context = $_GET["context"];
    $action = $_GET["action"];
    switch ($action) {
        case "load":
            load($context);
            break;
        case "add":
            add($context);
            break;
        case "update":
            update($context);
            break;
        case "delete":
            delete($context);
            break;
    }
}

function load($context)
{
    $service = new DbService();
    $service->set_context($context);

    try {
        $response = $service->get_attributes();

        if ($response) {
            echo json_encode($response);
        } else
            echo -1;
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

function add($context)
{
    $service = new DbService();
    $service->set_context($context);

    try {
        $_POST = json_decode(file_get_contents('php://input'), true);
        $name = $_POST["name"];
        $details =  $_POST["details"];
        $service->add_attribute($name, $details);
        echo 0;
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

function update($context)
{
    $service = new DbService();
    $service->set_context($context);

    try {
        $_POST = json_decode(file_get_contents('php://input'), true);
        $id = $_POST["id"];
        $name = $_POST["name"];
        $details =  $_POST["details"];
        $service->update_attribute($id, $name, $details);
    } catch (Exception $e) {
        echo -1;
    }
}

function delete($context)
{
    $service = new DbService();
    $service->set_context($context);

    try {
        $_POST = json_decode(file_get_contents('php://input'), true);
        $id = $_POST["id"];
        $service->delete_attribute($id);
    } catch (Exception $e) {
        echo -1;
    }
}
