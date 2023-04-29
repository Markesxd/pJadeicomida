<?php

namespace Rafael\PJadeicomida\Database;

use PDO;

class Connection
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = new PDO("mysql:dbname={$_ENV['DB_NAME']};host={$_ENV['DB_HOST']}", $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function create(string $table, array $properties){
        foreach($properties as &$property){
            if($property === ''){
                $property = null;
            }
        }
        $keys = array_keys($properties);
        $propertyNames = '(' . implode(', ', $keys) . ')';
        foreach($keys as &$key){
            $key = ':' . $key;
        }
        $values = '(' . implode(', ', $keys) . ')';
        $sql = "INSERT INTO $table $propertyNames VALUES $values";
        $statement = $this->pdo->prepare($sql,[]);
        $statement->execute($properties);
    }

    public function find(string $table, ?array $params = null, $sel = '*')
    {
        $where = '';
        if($params !== null) {
            $args = [];
            foreach($params as $key => $value){
                if(is_string($value))
                    $args[] = "$table.$key='$value'";
                else
                    $args[] = "$table.$key=$value";
            }
            $where = 'WHERE ' . implode(' and ', $args);
        }
        $sql = "SELECT $sel FROM $table $where";
        return $this->pdo->query($sql)->fetch(PDO::FETCH_ASSOC);
    }

    public function findAll(string $table, ?array $params = null, ?int $page = 1, $sel = '*', $orderBy = '', ?int $retrieve = 10)
    {
        $where = '';
        if($params !== null){
            $args = [];
            foreach($params as $key => $value){
                if(is_string($value))
                    if($value[0] === '<' || $value[0] === '>'){
                        $args[] = "$table.$key$value";
                    } else {
                        $args[] = "$table.$key='$value'";
                    }
                else
                    $args[] = "$table.$key=$value";
            }
            $where = 'WHERE ' . implode(' AND ', $args);
        }

        $limit = '';
        if($page !== null){
            $offset = $retrieve * ($page - 1);
            $limit = "LIMIT $offset,$retrieve";
        }

        if($orderBy !== ''){
            $orderBy = "ORDER BY $orderBy";
        }
        
        $sql = "SELECT $sel FROM $table $where $orderBy $limit";
        return $this->pdo->query($sql, PDO::FETCH_ASSOC)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function put(string $table, $id, array $params)
    {
        $arrNames = [];
        foreach($params as $name => &$value){
            $arrNames[] = "$name=:$name";
            if($value === '') $value = null;
        }
        $names = implode(', ', $arrNames);
        $sql = "UPDATE $table SET $names WHERE id=:id";
        $statement = $this->pdo->prepare($sql);
        $params['id'] = $id;
        $statement->execute($params);
    }

    public function delete(string $table, $id)
    {
        $sql = "DELETE FROM $table WHERE id='$id'";
        $this->pdo->query($sql);
    }

    public function count(string $table, ?string $where = null, ?string $equals = null)
    {
        $whereClause = '';
        if($where !== null && $equals !== null){
            $whereClause = "WHERE $where='$equals'";
        }
        $sql = "SELECT COUNT(id) as 'count' FROM $table $whereClause";
        return $this->pdo->query($sql)->fetch(PDO::FETCH_ASSOC);
    }

    public function query(string $sql)
    {
        return $this->pdo->exec($sql);
    }
}