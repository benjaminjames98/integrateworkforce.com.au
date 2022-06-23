function admin_html_interface() {

  if (location.protocol === "http:")
    location.replace(location.href.replaceAll("http:", "https:"));

  function show_welcome_message(username) {
    document.getElementById("greeting_p").innerText =
      date_facade().get_greeting_string(username);
  }

  return {show_welcome_message};

// Implementation Specific

  function el(n) {
    return document.getElementById(n);
  }


}