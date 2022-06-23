<?php

include __DIR__ . '/configs.php';

function get_db() {
  $cfg = get_db_configs();
  $db = mysqli_connect($cfg['host'], $cfg['user'], $cfg['pass'], $cfg['db']);

  if (!$db) die(mysqli_connect_error());
  else return $db;
}