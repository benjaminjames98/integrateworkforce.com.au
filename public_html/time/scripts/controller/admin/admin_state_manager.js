async function admin_state_manager() {

  let authenticator = password_authenticator();
  let username = await authenticator.ensure_logged_in();

  let view = admin_html_interface();
  view.show_welcome_message(username);

  let archive = network_storage();
  view.show_record_table(await archive.get_records());


}
