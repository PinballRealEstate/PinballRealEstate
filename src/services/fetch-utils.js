export async function getAllHomes(query) {
  const response = await fetch(`https://us-real-estate.p.rapidapi.com/v2/for-sale?limit=20&state_code=OR&city=${query}`);
  const data = response.json();

  return data;
}