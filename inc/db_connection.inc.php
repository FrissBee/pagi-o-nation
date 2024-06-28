<?php

// // TODO: Enter here your own  access data here:
define('DB_HOST', 'localhost');
define('DB_NAME', 'pagi-o-nation');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

// define('DB_ERRMODE', PDO::ERRMODE_SILENT);  // for production
define('DB_ERRMODE', PDO::ERRMODE_EXCEPTION); // for development
define('DB_FETCH_MODE', PDO::FETCH_ASSOC);

$optionen = [
  PDO::ATTR_ERRMODE => DB_ERRMODE,
  PDO::ATTR_DEFAULT_FETCH_MODE => DB_FETCH_MODE,
  PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
];

try {
  $db = new PDO(
    'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME,
    DB_USER,
    DB_PASSWORD,
    $optionen
  );
} catch (PDOException $e) {
  echo json_encode([0, "ERROR IN THE DATABASE CONNECTION: " . $e->getMessage()]);
  die();
}

$db->query('SET NAMES utf8');
