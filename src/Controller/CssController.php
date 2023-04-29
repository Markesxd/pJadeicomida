<?php

namespace Rafael\PJadeicomida\Controller;

class CssController implements IController
{
    public function handle(array $params, array $query): string
    {
        header("Content-Type: text/css");
        $content = file_get_contents(__DIR__ . "/../View/css/$params[2]");
        if($content !== false){
            return $content;
        } else {
            http_response_code(404);
            return '';
        }
    }
}