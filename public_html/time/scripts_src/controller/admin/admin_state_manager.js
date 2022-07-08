import {password_authenticator} from "../../model/auth/password_authenticator";
import {admin_html_interface} from "../../view/admin/admin_html_interface";
import {network_storage} from "../../model/network/network_storage";

async function admin_state_manager() {

  let authenticator = password_authenticator();
  let username = await authenticator.ensure_logged_in();

  let view = admin_html_interface();
  view.show_welcome_message(username);

  let archive = network_storage();
  view.show_record_table(await archive.get_records());


}


(async () => await admin_state_manager())();