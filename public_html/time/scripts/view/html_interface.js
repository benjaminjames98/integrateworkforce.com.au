function html_interface() {

  if (location.protocol === "http:")
    location.replace(location.href.replaceAll("http:", "https:"));

  const state_views = {
    clocked_off: ["clock_on"],
    on_break: ["new_worksite", "end_break"],
    clocked_on: ["new_worksite", "begin_break", "clock_off"]
  };
  const name_field = el("name");
  const error_div = el("error_div");
  const state_button_container = el("state_button_container");

  let state_button_info = [
    {label: "Clock On", id: "clock_on", state: "clocked_on"},
    {label: "New Worksite", id: "new_worksite", state: "clocked_on"},
    {label: "Begin Lunch", id: "begin_break", state: "on_break"},
    {label: "End Lunch", id: "end_break", state: "clocked_on"},
    {label: "Clock Off", id: "clock_off", state: "clocked_off"}
  ];
  let state_buttons = state_button_info.map(create_state_button);
  state_button_container.append(...state_buttons);

  function add_state_event_handler(event_handler) {
    state_button_container.addEventListener("state_change", event_handler);
  }

  function show_username(username) {
    name_field.innerText = `Employee: ${username}`;
  }

  function show_state(state) {
    state_buttons.forEach(button => {
      if (state_views[state].includes(button.id))
        button.className += " w3-show";
      else button.className = button.className.replaceAll(" w3-show", "");
    });
  }

  function show_alert(msg, error) {
    let title = error ? "Error:" : false;
    let color = error ? "yellow" : "green";
    create_alert_div(error_div, title, msg, color);
  }

  function freeze(disable) {
    state_buttons.forEach(button => button.disabled = disable);
  }

  return {
    add_state_event_handler,
    show_state,
    show_username,
    show_alert,
    freeze
  };

// Implementation Specific

  function el(n) {
    return document.getElementById(n);
  }

  function create_state_button(info) {
    let button = document.createElement("button");
    button.id = info.id;
    button.className = "state_button "
      + "w3-button w3-green w3-padding-large w3-margin-bottom w3-hide";
    button.innerText = info.label;
    button.addEventListener("click", function () {
      let event = new CustomEvent("state_change", {
        detail: {action: info.label, new_state: info.state},
        bubbles: true
      });
      this.dispatchEvent(event);
    });
    return button;
  }

  function create_alert_div(parent_node, title_text, msg_text, color = "green") {
    let error = document.createElement("div");

    let close = document.createElement("span");
    error.className = `w3-container w3-${color} w3-display-container`;
    close.onclick = () => parent_node.removeChild(error);
    close.className = "w3-button w3-display-topright";
    close.innerHTML = "×";
    error.append(close);

    if (title_text) {
      let title = document.createElement("p");
      title.innerText = title_text;
      title.style.fontSize = "125%";
      error.append(title);
    }

    if (msg_text) {
      let msg = document.createElement("p");
      msg.innerText = msg_text;
      error.append(msg);
    }

    parent_node.innerText = '';
    parent_node.append(error);
  }
}