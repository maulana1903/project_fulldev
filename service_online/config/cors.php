<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    
    'allowed_headers' => ['*'],

    'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],


    'allowed_methods' => ['*'],

    'supports_credentials' => true,
];
