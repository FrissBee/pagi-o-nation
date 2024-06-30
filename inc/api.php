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
  $limit = $received_data->limit;
  $offset = $received_data->offset;
  $fetchTotalListCount = $received_data->fetchTotalListCount;

  if ($fetchTotalListCount === true) {
    $query = "SELECT count(id) AS count FROM images";
    $statement = $db->query($query);
    $result['count'] = $statement->fetch()[0];
  }
  
  $query = "SELECT * FROM images ORDER BY id LIMIT $limit OFFSET $offset";
  $statement = $db->query($query);
  $result['data'] = $statement->fetchAll();

  echo json_encode($result);
  $db = null;

} else {
  echo json_encode('ERROR');
}
