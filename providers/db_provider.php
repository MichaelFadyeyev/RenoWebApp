<?php

require('config/db_config.php');

class DbProvider {

    protected $_conn;

    public function __construct() {
        $this->_conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    }
}