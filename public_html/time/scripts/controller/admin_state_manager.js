async function admin_state_manager() {

  let authenticator = password_authenticator();

  await authenticator.ensure_logged_in();

}
