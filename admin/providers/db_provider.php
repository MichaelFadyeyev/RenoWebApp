<?php

require('../config/db_config.php');

class DbProvider {

    protected $_conn_0;
    protected $_conn_1;

    public function __construct() {
        $this->_conn_0 = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_0_NAME);
        $this->_conn_1 = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_1_NAME);
    }
}