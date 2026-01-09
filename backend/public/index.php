<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Check If The Application Is Under Maintenance
|--------------------------------------------------------------------------
|
| If the application is in maintenance / demo mode via the "down" command
| we will load this file so that any pre-rendered content can be shown
| instead of starting the framework, which could cause an exception.
|
*/

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader
| for our application. We just need to utilize it! We'll require it
| into the script here so that we do not have to worry about the
| loading of any our classes "manually". Feels great to relax.
|
*/

require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request using
| the application's HTTP kernel. Then, we will send the response back
| to this client's browser, allowing them to enjoy our application.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';

// Initialize the Laravel application
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Get the router
$router = app('router');

// Load routes
require __DIR__.'/../routes/web.php';
if (file_exists(__DIR__.'/../routes/api.php')) {
    require __DIR__.'/../routes/api.php';
}

// Handle the request
try {
    $request = \Illuminate\Http\Request::capture();
    $response = $router->dispatch($request);

    // Add CORS headers to all responses
    $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
    $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    $response->header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With');
    $response->header('Access-Control-Allow-Credentials', 'true');
    $response->header('Access-Control-Max-Age', '86400');

    $response->send();
} catch (Exception $e) {
    $response = response()->json([
        'error' => 'Laravel routing error',
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);

    // Add CORS headers to error responses too
    $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
    $response->header('Access-Control-Allow-Credentials', 'true');

    $response->send();
}
