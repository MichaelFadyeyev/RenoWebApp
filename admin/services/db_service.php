<?php

require_once("../providers/db_provider.php");


class DbService extends DbProvider
{
    /* #region DbProvider fields */
    protected $_context;

    public function get_context()
    {
        return $this->_context;
    }

    public function set_context($context)
    {
        $this->_context = $context;
    }
    /* #endregion */

    /* #region Attributes */
    public function get_specialisations()
    {
        $news = [];
        $query = "select * from specialisations";
        $query .= " order by id";
        $result = $this->_conn_1->query($query);

        if (!$result) {
            throw new Exception("Помилка виконання SQL-запиту на отримання атрибуту");
        } elseif ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $news[] = $row;
            }
        }
        return $news;
    }

    public function get_attributes()
    {
        $news = [];
        $query = "select * from ";
        $query .= $this->_context;
        $query .= " order by id";
        $stmt = $this->_conn_1->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$result) {
            throw new Exception("Помилка виконання SQL-запиту на отримання атрибуту");
        } elseif ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $news[] = $row;
            }
        }
        return $news;
    }

    public function add_attribute($name, $details)
    {
        $query = "insert into ";
        $query .= $this->get_context();
        $query .= " (name, details)";
        $query .= " values (?, ?)";
        $stmt = $this->_conn_1->prepare($query);
        $stmt->bind_param("ss", $name, $details);
        if (!$stmt->execute()) {
            throw new Exception("Помилка виконання SQL-запиту на додавання атрибуту");
        }
    }

    public function update_attribute($id, $name, $details)
    {
        $query = "update ";
        $query .= $this->get_context();
        $query .= " set name=?, details=?";
        $query .= " where id=?";
        $stmt = $this->_conn_1->prepare($query);
        $stmt->bind_param("ssi", $name, $details, $id);
        if (!$stmt->execute()) {
            throw new Exception("Помилка виконання SQL-запиту на редагування атрибуту");
        }
    }

    public function delete_attribute($id)
    {
        $query = "delete from ";
        $query .= $this->get_context();
        $query .= " where id=?";
        $stmt = $this->_conn_1->prepare($query);
        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            throw new Exception("Помилка виконання SQL-запиту на видалення атрибуту");
        }
    }
    /* #endregion */
}
