<?php
session_start();

include __DIR__ . '/../../../../../db.php';
include __DIR__ . '/../../imports/utils.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'PUT': // Create New User
    $input = read_json_input();
    if (!is_meta_password($input['meta']))
      throw_error('incorrect meta password');
    $hash = password_hash($input['pass'], PASSWORD_DEFAULT);

    $db = get_db();
    $query = <<<MYSQL
INSERT INTO integrat_timesheets.administrator
    (name, password_hash)
VALUES (?, ?);
MYSQL;
    $stmt = $db->prepare($query);
    $stmt->bind_param('ss', $input['name'], $hash);
    if (!$stmt->execute()) throw_error('db failure: ' . $db->error);
    else echo json_encode(['success' => true]);
    break;
  case 'GET':
  case 'PATCH':
  case 'DELETE':
    http_response_code(405); // Method Not Allowed
    break;
}

die(0);