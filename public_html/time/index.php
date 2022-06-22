<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Integrate Timesheet</title>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <style>
      body {
          font-size: 2em;
      }

      @media only screen and (max-width: 650px) {
          body {
              font-size: 4em;
          }
      }

      .state_button {
          width: 100%;
      }
  </style>
  <script src="scripts/html_navigator_facade.js"></script>
  <script src="scripts/google_configs.js"></script>
  <script src="scripts/cookie_storage.js"></script>
  <script src="scripts/network_storage.js"></script>
  <script src="scripts/html_interface.js"></script>
  <script src="scripts/state_manager.js"></script>
</head>
<body>

<div id="error_div"></div>

<div id="name_container" class="w3-container">
  <p id="name"></p>
</div>

<div id='state_button_container' class="w3-container"></div>

<script defer>
  state_manager();
</script>

</body>
</html>