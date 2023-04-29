<?php

namespace Rafael\PJadeicomida\Controller;

class ServiceWorkerController implements IController
{
    public function handle(array $params, array $query): string
    {
        header("Content-Type: application/javascript");
        return file_get_contents(__DIR__ . '/../../serviceWorker.js');
    }
}