function network_communicator() {

  let sos_url = "/time/API/send_sos/";

  // Should function as either create or update
  async function send_sos(username, action, address) {
    let response = await fetch(sos_url, {
      method: "POST",
      headers: {"content-type": "json", "accept": "application/json"},
      body: JSON.stringify({username, action, address})
    });

    if (response.status !== 200) return false;
    response = await response.json();
    return response.success;
  }


  return {send_sos};
}