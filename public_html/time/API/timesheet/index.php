<?php
session_start();

include __DIR__ . '/../../../../db.php';
include __DIR__ . '/../imports/utils.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'PUT':
    $input = read_json_input();
    $db = get_db();

    $query = <<<MYSQL
INSERT INTO integrat_timesheets.record
    (username, new_state, action, address)
VALUES (?, ?, ?, ?);
MYSQL;
    $stmt = $db->prepare($query);
    $stmt->bind_param('ssss',
      $input['username'],
      $input['new_state'],
      $input['action'],
      $input['address']
    );
    if (!$stmt->execute()) throw_error('db failure: ' . $db->error);
    else echo json_encode(['success' => true, 'id' => $db->insert_id,]);
    break;
  case 'GET':
    if (!is_logged_in()) throw_error('Not Authorised');

    $db = get_db();
    $query = <<<MYSQL
SELECT username, time, new_state, action, address
FROM integrat_timesheets.record
ORDER BY time DESC 
LIMIT 100;
MYSQL;
    $stmt = $db->prepare($query);
    if (!$stmt->execute()) throw_error('db failure: ' . $db->error);
    else {
      $records = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
      $records = json_encode($records);
      echo json_encode(['success' => true, 'records' => $records]);
    }
    break;
  case 'PATCH':
  case 'DELETE':
    http_response_code(405); // Method Not Allowed
    break;
}

die(0);