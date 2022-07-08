export function date_facade() {

  function get_greeting_string(name) {
    let today = new Date();
    let curHr = today.getHours();

    if (curHr < 12) return `Good Morning: ${name}`;
    else if (curHr < 18) return `Good Afternoon: ${name}`;
    else return `Good Evening: ${name}`;
  }

  function get_local_string(utc_string) {
    if (!utc_string.includes('UTC')) utc_string += ' UTC';
    utc_string = utc_string.replaceAll('-', '/')
    let date = new Date(utc_string);
    return date.toLocaleString();
  }

  return {get_greeting_string, get_local_string};

}