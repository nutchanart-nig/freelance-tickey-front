<?php

// Test Laravel bootstrap
try {
    require __DIR__.'/../vendor/autoload.php';

    $app = require_once __DIR__.'/../bootstrap/app.php';

    echo json_encode([
        'status' => 'success',
        'message' => 'Laravel bootstrap successful',
        'version' => app()->version()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
}
