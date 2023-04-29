<?php

namespace Rafael\PJadeicomida\Controller;

class ViewController implements IController
{
    public function handle(array $params, array $query): string
    {
        $content = file_get_contents(__DIR__ . '/../View/main.php');
        if($content !== false) {
            return $content;
        } else {
            http_response_code(404);
            return '';
        }
    }
}