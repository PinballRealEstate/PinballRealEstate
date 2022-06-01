export async function getAllHomes(zip_code, city, state_code) {
  const response = await fetch(`/.netlify/functions/homes?city=${city}&location=${zip_code}&state_code=${state_code}`);
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