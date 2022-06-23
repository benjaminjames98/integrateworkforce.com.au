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
  <script src="../scripts/controller/admin/admin_state_manager.js?v=1"></script>
  <script src="../scripts/model/auth/password_authenticator.js?v=2"></script>
  <script src="../scripts/model/local/date_facade.js?v=1"></script>
  <script src="../scripts/model/network/network_storage.js?v=1"></script>
  <script src="../scripts/view/admin/admin_html_interface.js?v=1"></script>
</head>
<body>

<div id="error_div"></div>

<div class="w3-bar w3-responsive">
  <p id="greeting_p" class="w3-bar-item"></p>
  <button class="w3-bar-item w3-button w3-right w3-green">Logout</button>
</div>


<div id="content_container" class="w3-container w3-responsive">
  <table id="records_table"
         class="w3-table-all w3-bordered w3-striped w3-border w3-hoverable">
  </table>
</div>

<script defer>
  (() => admin_state_manager())();
</script>

</body>
</html>