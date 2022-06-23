function password_authenticator() {

  async function create_user(name, password, meta) {
    let response = await fetch("./API/auth/", {
      method: "PUT",
      headers: {"content-type": "json", "accept": "application/json"},
      body: JSON.stringify({name, password, meta})
    });

    if (response.status !== 200) return false;
    response = await response.json();
    return response.success || response["message"];
  }

  async function get_auth_code() {

  }

  return {create_user};

}