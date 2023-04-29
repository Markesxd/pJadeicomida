<?php

namespace Rafael\PJadeicomida\Controller;

use Rafael\PJadeicomida\Database\Setup;

class Router 
{

    static private array $routes = [
        '' => ViewController::class,
        'js' => JsController::class,
        'css' => CssController::class,
        'img' => ImgController::class,
        'api' => ApiController::class,
        'setup' => Setup::class,
        'serviceWorker' => ServiceWorkerController::class,
        'manifest' => ManifestController::class
    ]; 

    public static function run(): void
    {
        self::configureEnv();
        [$params, $query] = self::getPathAndQueryParams();
        $route = $params[1];
        if(!array_key_exists($route, self::$routes)) {
            http_response_code(404);
            return;
        }
        echo (new self::$routes[$route])->handle($params, $query);
    }

    private static function getPathAndQueryParams(): array
    {
        [$stringParams, $stringQuery] = explode('?', $_SERVER['REQUEST_URI']);
        $params = explode('/', $stringParams);
        $query = explode('&', $stringQuery);
        return [$params, $query];
    }

    private static function configureEnv(): void {
        $lines = file(__DIR__ . '/../../.env');
        foreach($lines as $line) {
            [$key, $value] = explode('=', $line);
            $_ENV[$key] = trim($value);
        }
    }
}
