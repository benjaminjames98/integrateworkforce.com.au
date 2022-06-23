<?php
session_start();

include __DIR__ . '/../../../../../db.php';
include __DIR__ . '/../../imports/utils.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $logged_in = is_logged_in();
    echo json_encode(['success' => true,
      'logged_in' => $logged_in,
      'name' => $_SESSION['user']]);
    break;
  case 'PUT':
    $input = read_json_input();
    $db = get_db();

    $query = <<<MYSQL
SELECT name, password_hash FROM integrat_timesheets.administrator WHERE name = ?;
MYSQL;
    $stmt = $db->prepare($query);
    $stmt->bind_param('s', $input['name']);
    if (!$stmt->execute()) throw_error('db failure: ' . $db->error);
    $stmt->bind_result($name, $hash);
    $stmt->fetch();


    $auth_success = password_verify($input['pass'], $hash);
    if ($auth_success) $_SESSION['user'] = $name;

    echo json_encode(['success' => true, 'logged_in' => $auth_success]);
    break;
  case 'PATCH':
  case 'DELETE':
    http_response_code(405); // Method Not Allowed
    break;
}

die(0);