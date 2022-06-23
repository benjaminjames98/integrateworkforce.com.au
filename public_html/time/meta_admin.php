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
  <script src="scripts/model/auth/password_authenticator.js"></script>
</head>
<body>

<div style="max-width: 80ch;">
  <div class="w3-green w3-container">
    <h1>Create Admin</h1>
  </div>
  <br>
  <form id="form" class="w3-container">
    <label> New User
      <input type="text" name="name" class="w3-input" required>
    </label>
    <label> New Password
      <input type="text" name="pass" class="w3-input" required>
    </label>
    <label> Meta Password
      <input type="password" name="meta" class="w3-input" required>
    </label>
    <br>
    <input type="submit" class="w3-button w3-green">
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
    let response = await authenticator.create_user(
      formData.get("name"),
      formData.get("pass"),
      formData.get("meta")
    );

    document.getElementById("result_p").innerText =
      typeof response === "string" ? response : "Successfully created user.";
  });
</script>

</body>
</html>