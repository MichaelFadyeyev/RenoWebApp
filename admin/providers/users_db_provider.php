<?php

require('../config/users_db_config.php');

class UsersDbProvider {

    protected $_users_conn;

    public function __construct() {
        $this->_users_conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    }
}