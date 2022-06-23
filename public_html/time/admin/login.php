<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Integrate Admin Login</title>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <style>
      body {
          font-size: 1em;
      }
  </style>
  <script src="../scripts/model/auth/password_authenticator.js"></script>
</head>
<body>

<div class="w3-card" style="max-width: 80ch; margin: 2em auto 2em auto;">
  <div class="w3-green w3-container">
    <h1>Login</h1>
  </div>
  <br>
  <form id="form" class="w3-container">
    <label> Username
      <input type="text" name="name" class="w3-input" required>
    </label>
    <label> Password
      <input type="password" name="pass" class="w3-input" required>
    </label>
    <br>
    <input type="submit" value="Login" class="w3-button w3-green w3-right">
    <p id="result_p"></p>
    <br>
  </form>
</div>

<script>
  let form = document.getElementById("form");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let authenticator = password_authenticator();
    let response = await authenticator.login(
      formData.get("name"),
      formData.get("pass")
    );

    if (!response)
      document.getElementById("result_p").innerText = "Incorrect login details";
  });
</script>

</body>
</html>