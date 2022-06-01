export async function getAllHomes(query) {
  const response = await fetch(`/.netlify/functions/homes?city=${query}`);
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