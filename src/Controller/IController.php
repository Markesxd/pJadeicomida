<?php

namespace Rafael\PJadeicomida\Controller;

use Rafael\PJadeicomida\Database\Connection;

interface IController
{
    public function handle(array $params, array $query): string;
}