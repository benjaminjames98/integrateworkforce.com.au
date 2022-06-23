function network_storage() {

  let timesheet_url = "/time/API/timesheet/"

  // Should function as either create or update
  async function create_record(username, action, new_state, address) {
    let response = await fetch(timesheet_url, {
      method: "PUT",
      headers: {"content-type": "json", "accept": "application/json"},
      body: JSON.stringify({username, action, new_state, address})
    });

    if (response.status !== 200) return false;
    response = await response.json();
    return response.success;
  }

  async function get_records() {
    let response = await fetch(timesheet_url, {
      method: "GET",
      headers: {"content-type": "json", "accept": "application/json"}
    });

    if (response.status !== 200) return false;
    response = await response.json();
    if (!response.success) return false;
    return JSON.parse(response["records"]);
  }


  return {create_record, get_records};
}