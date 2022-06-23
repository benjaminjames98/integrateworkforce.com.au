function password_authenticator() {

  let auth_url = "/time/API/auth";

  async function create_user(name, pass, meta) {
    let response = await fetch(`${auth_url}/admin`, {
      method: "PUT",
      headers: {"content-type": "json", "accept": "application/json"},
      body: JSON.stringify({name, pass, meta})
    });

    if (response.status !== 200) return false;
    response = await response.json();
    return response.success || response["message"];
  }

  async function ensure_logged_in() {
    if (await is_currently_logged_in()) return true;
    redirect_to_login();
  }

  async function login(name, pass) {
    if (await is_currently_logged_in()) redirect_to_admin();

    let response = await fetch(`${auth_url}/login_session/`, {
      method: "PUT",
      headers: {"content-type": "json", "accept": "application/json"},
      body: JSON.stringify({name, pass})
    });
    let json = await response.json();
    let success = json["logged_in"];

    if (success) {
      redirect_to_admin();
      return true;
    }
    return false;
  }

  return {create_user, ensure_logged_in, login};

  // Utilities

  async function is_currently_logged_in() {
    let response = await fetch(`${auth_url}/login_session/`, {
      method: "GET",
      headers: {"content-type": "json", "accept": "application/json"}
    });
    let json = await response.json();
    return json["logged_in"];
  }

  function redirect_to_login() {
    location.href = "/time/admin/login.php";
  }

  function redirect_to_admin() {
    location.href = "/time/admin/";
  }

}