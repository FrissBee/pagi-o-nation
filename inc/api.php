<?php

// TODO: Change the database you want to use here
$SQLite_or_MySQL = true;

if($SQLite_or_MySQL === true) {
  $db = new PDO('sqlite:pagi-o-nation.db');
  
} else {
  require_once __DIR__ . '/db_connection.inc.php';
}

$received_data = json_decode(file_get_contents("php://input"));

if ($received_data->action == 'load-data') {
  
  $query = "SELECT * FROM images ORDER BY id";
  $statement = $db->query($query);
  $result = $statement->fetchAll();

  echo json_encode($result);
  $db = null;

} else {
  echo json_encode('ERROR');
}
