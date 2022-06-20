function html_interface() {
  const state_views = {
    clocked_off: ["clock_on"],
    on_break: ["end_break"],
    clocked_on: ["begin_break", "clock_off"]
  };
  const name_field = el("name");
  const error_div = el("error_div");
  const state_button_container = el("state_button_container");

  let state_button_info = [
    {label: "Clock On", id: "clock_on", state: "clocked_on"},
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

  function show_error(msg) {
    create_error_div(error_div, msg);
  }

  return {add_state_event_handler, show_state, show_username, show_error};

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
        detail: {new_state: info.state},
        bubbles: true
      });
      this.dispatchEvent(event);
    });
    return button;
  }

  function create_error_div(parent_node, message_text) {
    let error = document.createElement("div");
    let close = document.createElement("span");
    let title = document.createElement("p");
    let msg = document.createElement("p");

    error.className = "w3-container w3-yellow w3-display-container";
    close.onclick = () => parent_node.removeChild(error);
    close.className = "w3-button w3-display-topright";
    close.innerHTML = "×";
    title.innerText = "Error:";
    title.style.fontSize = "125%";
    msg.innerText = message_text;

    error.append(close, title, msg);
    parent_node.append(error);
  }
}