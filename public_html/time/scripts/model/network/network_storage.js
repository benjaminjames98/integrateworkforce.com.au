function network_storage() {

  // Should function as either create or update
  async function create_record(username, action, new_state, address) {
    let response = await fetch("./API/timesheet/", {
      method: "PUT",
      headers: {"content-type": "json", "accept": "application/json"},
      body: JSON.stringify({username, action, new_state, address})
    });

    if (response.status !== 200) return false;
    response = await response.json();
    return response.success;
  }


  return {create_record};
}