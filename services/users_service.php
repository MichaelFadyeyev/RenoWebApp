<?php

require_once('providers/db_provider.php');


class UsersService extends DbUsersProvider
{

    /* #region users clumns */
    /**
     * 	1   // id
     *	2	name	
     *	3	login	
     *	4	password
     *	5	phone
     *	6	email
     *	7	role_id 
     *	8	status_id
     */
    /* #endregion */

    public function registry($name, $login, $password, $email, $phone, $role_id, $status_id)
    {
        $query = 'insert into users (name, login, password, email, phone, role_id, status_id) ';
        $query .= 'values (?, ?, ?, ?, ?, ?, ?)';
        $stmt = $this->_conn->prepare($query);
        $stmt->bind_param('sssssii', $name, $login, $password, $email, $phone, $role_id, $status_id);
        if (!$stmt->execute()) {
            throw new Exception('Помилка виконання запиту на додавання користувача');
        }
        $stmt->close();
        echo 0;
    }

    public function check_login_unique($login)
    {
        $query = 'select login from users where login = ?';
        $stmt = $this->_conn->prepare($query);
        $stmt->bind_param('s', $login);
        if (!$stmt->execute()) {
            throw new Exception('Помилка входу');
        }
        $result = $stmt->get_result()->num_rows;
        $stmt->close();
        return $result === 0;
    }

    public function check_email_unique($email)
    {
        $query = 'select email from users where email = ?';
        $stmt = $this->_conn->prepare($query);
        $stmt->bind_param('s', $email);
        if (!$stmt->execute()) {
            throw new Exception('Помилка входу');
        }
        $result = $stmt->get_result()->num_rows;
        $stmt->close();
        return $result === 0;
    }

    public function authenticate($login, $passw)
    {
        $query = 'select login, role_id, email, regdate, role_id, status_id from users where login = ? and passw = ?';
        $stmt = $this->_conn->prepare($query);
        $stmt->bind_param('ss', $login, $passw);
        if (!$stmt->execute()) {
            throw new Exception('Помилка входу');
        }
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        if (isset($user)) {
            $stmt->close();
            return $user;
        }

        $stmt->close();
        return false;
    }
}
