<?php
session_start();

include __DIR__ . '/../../../../configs.php';
include __DIR__ . '/../imports/utils.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $input = read_json_input();
    $configs = email_configs();
    $google_configs = google_configs();

    if (!$input['action'] == 'lost') throw_error('invalid reason');
    $name = filter_var($input['username'], FILTER_SANITIZE_STRING);
    $address = filter_var($input['address'], FILTER_SANITIZE_STRING);
    $google_url = "https://www.google.com/maps/search/"
      . "?api=1" . "&query=" . urlencode($address);

    $subject = "Employee Lost: $name";
    $message = "$name is lost near $address:\r\n$google_url";
    $message = wordwrap($message, 70, "\r\n");

    error_log($address);
    error_log(urlencode($address));
    $success = mail($configs['receiving_address'], $subject, $message);
    if (!$success)
      throw_error('failed to send mail: ' . error_get_last()['message']);
    else echo json_encode(['success' => true]);
    break;
  case 'GET':
  case 'PATCH':
  case 'DELETE':
    http_response_code(405); // Method Not Allowed
    break;
}

die(0);