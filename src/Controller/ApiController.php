<?php

namespace Rafael\PJadeicomida\Controller;

use DateTimeImmutable;
use Rafael\PJadeicomida\Database\Connection;

class ApiController implements IController
{
    private Connection $db;

    public function __construct()
    {
        $this->db = new Connection();
    }

    public function handle(array $params, array $query): string
    {
        switch($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                return $this->getTodaysInfo();
            case 'POST': 
                return $this->postTodaysInfo();
        }
    }

    private function getTodaysInfo(): string
    {
        $today = new DateTimeImmutable('today');
        $info = $this->db->find('food', ['data' => $today->format('Y-m-d')]);
        if($info === false) {
            $info = ['manha' => 0, 'tarde' => 0, 'noite' => 0, 'pate' => 0];
        }
        foreach($info as &$field) {
            $field = intval($field);
        }
        header("Content-Type: application/json");
        return json_encode($info);
    }

    private function postTodaysInfo(): string
    {
        $today = new DateTimeImmutable('today');
        $info = json_decode(file_get_contents('php://input'), true);
        foreach($info as &$field) {
            $field = intval($field);
        }
        $info['data'] = $today->format('Y-m-d');
        $registeredInfo = $this->db->find('food', ['data' => $today->format('Y-m-d')]);
        if($registeredInfo === false) {
            $this->db->create('food', $info);
        } else {
            $this->db->put('food', $registeredInfo['id'], $info);
        }
        return '';
    }
}