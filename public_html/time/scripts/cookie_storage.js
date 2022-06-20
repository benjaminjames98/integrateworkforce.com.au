function cookie_storage() {
  let default_lifetime = 365; // Days
  let default_values = {state: {value: "clocked_off", lifetime: 0.6}};

  function read(key) {
    let value = get_cookie(key);
    if (!value && Object.keys(default_values).includes(key))
      value = update(
        key,
        default_values[key].value,
        default_values[key.lifetime]
      );

    return value;
  }

  // Should function as either create or update
  function update(key, val, time = undefined) {
    if (!time)
      time = Object.keys(default_values).includes(key) ?
        default_values[key].lifetime :
        default_lifetime;
    return set_cookie(key, val, time);
  }


  return {read, update};

  // Implementation Specific

  function set_cookie(cookie_name, value, cookie_lifetime = 365) {
    const d = new Date();
    d.setTime(d.getTime() + (cookie_lifetime * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookie_name + "=" + value + ";" + expires + ";path=/";
    return value;
  }

  function get_cookie(cookie_name) {
    let name = cookie_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

}