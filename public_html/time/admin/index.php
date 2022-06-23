<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Integrate Admin</title>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <style>
      body {
          font-size: 1em;
      }
  </style>
  <script src="../scripts/controller/admin_state_manager.js"></script>
  <script src="../scripts/model/auth/password_authenticator.js"></script>
</head>
<body>

<div id="error_div"></div>

<div class="w3-bar">
  <p id="greeting"></p>
  <button class="w3-bar-item w3-button w3-right w3-green"
          onclick="location.href = './logout.php'">Logout
  </button>
</div>



<div id="content_container" class="w3-container"></div>

<script defer>
  (() => admin_state_manager())();
</script>

</body>
</html>