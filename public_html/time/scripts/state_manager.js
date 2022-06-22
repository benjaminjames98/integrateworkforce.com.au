function state_manager() {
  let storage = cookie_storage();
  let archive = network_storage();
  let view = html_interface();
  let navigator = html_navigator_facade();

  let username = storage.read("username");
  if (username === "") {
    while (username === "")
      username = prompt("Please enter your full name:", "").trim();
    storage.update("username", username);
  }
  let current_state = storage.read("state");

  view.show_username(username);
  view.add_state_event_handler(event_handler);
  view.show_state(current_state);

  // This is used to parse events from the interface
  async function event_handler(e) {
    e.preventDefault();
    view.freeze(true);

    let address = await navigator.get_address_string();
    if (address.err) {
      return view.show_alert(`That didn't work.\n${address.err}`, true);
      view.freeze(false);
    }

    if (!await archive.create_record(
      username,
      e.detail.action,
      e.detail.new_state,
      address
    )) {
      return view.show_alert("That didn't work."
        + " Are you connected to the internet? If so, please try again", true);
      view.freeze(false);
    }

    view.show_alert(`Successful: ${e.detail.action}`, false);
    storage.update("state", e.detail.new_state);
    view.show_state(e.detail.new_state);
    view.freeze(false);
  }
}