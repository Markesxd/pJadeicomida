<?php

namespace Rafael\PJadeicomida\Controller;

class ManifestController implements IController
{
    public function handle(array $params, array $query): string
    {
        header("Content-Type: application/json");
        return file_get_contents(__DIR__ . '/../../manifest.json');
    }
}