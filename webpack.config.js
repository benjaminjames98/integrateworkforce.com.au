const path = require("path");

module.exports = {
  mode: 'production',
  entry: {
    client_state_manager_bundle:
      "./public_html/time/scripts_src/controller/client/client_state_manager.js",
    admin_state_manager_bundle:
      "./public_html/time/scripts_src/controller/admin/admin_state_manager.js",
    meta_admin_controller_bundle:
      "./public_html/time/scripts_src/controller/meta_admin/meta_admin_controller.js",
    admin_login_controller_bundle:
      "./public_html/time/scripts_src/controller/admin/login_controller.js"
  },
  // entry: './public_html/time/index.html',

  output: {
    path: path.resolve(__dirname, "public_html/time/scripts_dist/")
  },
};