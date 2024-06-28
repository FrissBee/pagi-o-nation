<?php

// TODO: Change the database you want to use here
$SQLite_or_MySQL = true;

if($SQLite_or_MySQL === true) {
  $db = new PDO('sqlite:./inc/pagi-o-nation.db');
  
} else {
  require_once __DIR__ . '/inc/db_connection.inc.php';
}

$limit = 16;
$pageNumber = 1;

$query = "SELECT count(id) AS count FROM images";
$statement = $db->query($query);
$resultCount = $statement->fetch();

if ($_GET && isset($_GET['site'])) {

  $pageNumber = (int)$_GET['site'];

  $offset = ($pageNumber - 1) * $limit;

  $query = "SELECT * FROM images ORDER BY id LIMIT $limit OFFSET $offset";
  $statement = $db->query($query);
  $result = $statement->fetchAll();

} else {
  $query = "SELECT * FROM images ORDER BY id LIMIT $limit OFFSET 0";
  $statement = $db->query($query);
  $result = $statement->fetchAll();
}

require_once __DIR__ . '/tbl/home.tbl.php';
