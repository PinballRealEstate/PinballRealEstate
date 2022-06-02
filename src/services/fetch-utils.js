export async function getAllHomes(zip_code, city, state_code, price_max, price_min) {
  const response = await fetch(`/.netlify/functions/homes?city=${city}&location=${zip_code}&state_code=${state_code}&price_min=${price_min}&price_max=${price_max}`);
  const { data } = await response.json();
  return data;
}

export async function getPinballMachines(query){ //eslint-disable-line
  const response = await fetch();
  const data = await response.json();

  return data;
}

export async function geoCode(zip_code) {
  const response = await fetch(`/.netlify/functions/geocode?zip_code=${zip_code}`);
  const data = await response.json();
          
  return data;
}

export async function getSingleHome(property_id) {
  const response = await fetch(`/.netlify/functions/property?property_id=${property_id}`);
  const { data } = await response.json();

  return data;
}