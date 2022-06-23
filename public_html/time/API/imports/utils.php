<?php

function read_json_input() {
  $json = file_get_contents('php://input');
  return json_decode($json, true);
}

function throw_error($msg = "") {
  echo json_encode(['success' => false, 'message' => $msg]);
  die();
}

function is_meta_password($pass): bool {
  include_once __DIR__ . '/../../../../configs.php';
  $auth_configs = auth_configs();

  return strcmp($pass, $auth_configs['meta_admin_pass']) == 0;
}