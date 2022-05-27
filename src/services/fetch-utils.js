export async function getAllHomes(query) {
  const response = await fetch(`https://us-real-estate.p.rapidapi.com/v2/for-sale?limit=20&state_code=OR&city=${query}`);
  const data = await response.json();

  return data;
}

export async function getPinballMachines(query){ //eslint-disable-line
  const response = await fetch();
  const data = await response.json();

  return data;
}