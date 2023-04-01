<?php

require_once ('../providers/db_provider.php');
//require ('./models/user.php');


class UsersDbService extends DbProvider
{

    /* #region users clumns */
    /**
     * 	1   // id
     *	2	name	
     *	3	login	
     *	4	password
     *	5	phone
     *	6	role_id 
     *	7	status_id
     */
    /* #endregion */

    public function registry($name, $login, $password, $phone, $role_id, $status_id)
    {
        $query = 'insert into users (name, login, password, phone, role_id, status_id) ';
        $query .= 'values (?, ?, ?, ?, ?, ?)';
        $stmt = $this->_conn_0->prepare($query);
        $stmt->bind_param('ssssii', $name, $login, $password, $phone, $role_id, $status_id);
        if (!$stmt->execute()) {
            throw new Exception('Помилка виконання запиту на додавання користувача');
        }
        $stmt->close();
        $status_id = 2;
        return new User ($name, $login, $password, $phone, $role_id, $status_id);
    }

    public function check_login_unique($login)
    {
        $query = 'select login from users where login = ?';
        $stmt = $this->_conn_0->prepare($query);
        $stmt->bind_param('s', $login);
        if (!$stmt->execute()) {
            throw new Exception('Помилка входу');
        }
        $result = $stmt->get_result()->num_rows;
        $stmt->close();
        return $result === 0;
    }

    public function check_name_unique($name)
    {
        $query = 'select name from users where name = ?';
        $stmt = $this->_conn_0->prepare($query);
        $stmt->bind_param('s', $name);
        if (!$stmt->execute()) {
            throw new Exception('Помилка входу');
        }
        $result = $stmt->get_result()->num_rows;
        $stmt->close();

        return $result === 0;
    }

    public function authenticate($login, $password)
    {
        $query = 'update users ';
        $query .= 'set status_id = ? ';
        $query .= 'where login = ? and password = ?';
        $stmt = $this->_conn_0->prepare($query);
        $status_id = 2; // 1 - logged_out, 2 - logged_in;
        $stmt->bind_param('iss', $status_id, $login, $password);
        if (!$stmt->execute()) {
            throw new Exception('Помилка виконання SQL-запиту на зміну статуса');
        }
        //
        $query = 'select name, login, phone, role_id, status_id from users where login = ? and password = ?';
        $stmt = $this->_conn_0->prepare($query);
        $stmt->bind_param('ss', $login, $password);
        if (!$stmt->execute()) {
            throw new Exception('Помилка входу');
        }
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        if (isset($user)) {
            $stmt->close();
            return $user;
        }
        //
        $stmt->close();
        return 0;
    }


    public function logout($login)
    {
        $query = 'update users ';
        $query .= 'set status_id=? ';
        $query .= 'where login=?';
        $stmt = $this->_conn_0->prepare($query);
        $status_id = 1; // 1 - logged_out, 2 - logged_in;
        $stmt->bind_param('is', $status_id, $login);
        if (!$stmt->execute()) {
            throw new Exception('Помилка виконання SQL-запиту на зміну статуса');
        }
        $stmt->close();
        return 0;
    }


    
}
