function date_facade() {

  function get_greeting_string(name) {
    let today = new Date();
    let curHr = today.getHours();

    if (curHr < 12) return `Good Morning: ${name}`;
    else if (curHr < 18) return `Good Afternoon: ${name}`;
    else return `Good Evening: ${name}`;
  }

  return {
    get_greeting_string
  };

}