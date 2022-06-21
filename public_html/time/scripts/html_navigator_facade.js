function html_navigator_facade() {

  async function get_address_string() {
    let coords = await get_coords();
    return (coords.err) ? coords.err :
      await get_address_from_coords(coords.lat, coords.long);
  }

  return {get_address_string};

  // Implementation Specific

  async function get_coords() {
    return new Promise((resolve) =>
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({
          lat: pos.coords.latitude,
          long: pos.coords.longitude
        }),
        (err) => resolve({err: err.message}),
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
      )
    );
  }

  async function get_address_from_coords(lat, long) {
    let url = "https://maps.googleapis.com/maps/api/geocode/json"
      + `?latlng=${lat},${long}`
      + "&location_type=ROOFTOP"
      + "&result_type=street_address"
      + `&key=${google_configs["API-KEY"]}`;

    let result = await fetch(url);
    result = await result.json();

    return result.status === "OK" ?
      result["results"][0]["formatted_address"] : "";
  }

}