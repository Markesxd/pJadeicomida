<?php

namespace Rafael\PJadeicomida\Controller;

class JsController implements IController
{
    public function handle(array $params, array $query): string
    {
        header("Content-Type: application/javascript");
        $content = file_get_contents(__DIR__ . "/../View/js/$params[2]");
        if($content !== false){
            return $content;
        } else {
            http_response_code(404);
            return '';
        }
    }
}