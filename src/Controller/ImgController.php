<?php

namespace Rafael\PJadeicomida\Controller;

class ImgController implements IController
{
    public function handle(array $params, array $query): string
    {
        $imageFile = $params[2];
        $imageExtention = explode('.', $imageFile)[1];
        $imagePath = __DIR__ . "/../View/img/$imageFile";
        $image = fopen($imagePath, 'rb');
        if($image === false){
            http_response_code(404);
            return '';
        }
        header("Content-Type: image/$imageExtention", true);
        header("Content-Length: " . filesize($imagePath), true);
        fpassthru($image);
        return '';
    }
}