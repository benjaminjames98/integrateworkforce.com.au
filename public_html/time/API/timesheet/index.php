<?php

include __DIR__ . '/../../../../db.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'PUT':
    $input = read_json_input();
    $db = get_db();

    $query = "INSERT INTO integrat_timesheets.record (username, state) VALUES (?, ?)";
    $stmt = $db->prepare($query);
    $stmt->bind_param('ss', $input['username'], $input['state']);
    if (!$stmt->execute()) throw_error('db failure: ' . $db->error);
    else echo json_encode(['success' => true, 'id' => $db->insert_id,]);
    break;
  case 'PATCH':
  case 'DELETE':
  case 'GET':
    http_response_code(405); // Method Not Allowed
    break;
}

die(0);

// Utilities

function read_json_input() {
  $json = file_get_contents('php://input');
  return json_decode($json, true);
}

function throw_error($msg = "") {
  echo json_encode(['success' => false, 'message' => $msg]);
  die();
}