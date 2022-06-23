function admin_html_interface() {

  let records_table = el("records_table");
  let date = date_facade();

  if (location.protocol === "http:")
    location.replace(location.href.replaceAll("http:", "https:"));

  let table_fields = [
    {heading: "Employee", key: "username", type: "text"},
    {heading: "Time", key: "time", type: "date"},
    {heading: "State", key: "new_state", type: "text"},
    {heading: "Button Pressed", key: "action", type: "text"},
    {heading: "Address", key: "address", type: "text"}
  ];

  function show_welcome_message(username) {
    document.getElementById("greeting_p").innerText =
      date_facade().get_greeting_string(username);
  }

  function show_record_table(records) {
    let head = get_table_head(records);
    let body = get_table_body(records);


    records_table.innerText = "";
    records_table.innerHTML = head + body;
  }

  return {show_welcome_message, show_record_table};

// Implementation Specific

  function el(n) {
    return document.getElementById(n);
  }

  function values(dataObject) {
    let dataArray = [];
    for (let o in dataObject) {
      dataArray.push(dataObject[o]);
    }
    return dataArray;
  }

  function get_table_head() {
    let ths = table_fields.reduce((p, r) => `${p}<th>${r.heading}</th>`, "");

    return `<thead><tr class="w3-green">${ths}</tr></thead>`;
  }

  function get_table_body(records) {
    let t_body = "<tbody>";
    records.forEach(r => t_body += get_table_row(r));
    return t_body + "</tbody>";
  }

  function get_table_row(record) {
    let row = "<tr>";
    table_fields.forEach(field => {
      let val = (field.type === "date") ?
        date.get_local_string(record[field.key]) :
        record[field.key];
      row += `<td>${val}</td>`;
    });
    return row + "</tr>";
  }

}