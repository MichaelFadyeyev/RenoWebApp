<?php

class User{
    private $id;
    private $name;
    private $login; // email
    private $password;
    private $phone;
    private $role_id;
    private $status_id;


    public function __construct($name, $login, $phone, $role_id, $status_id)
    {
        $this->id=0;
        $this->name = $name;
        $this->login = $login;
        $this->password = "";
        $this->phone = $phone;
        $this->role_id = $role_id;
        $this->status_id = $status_id;
    }
}