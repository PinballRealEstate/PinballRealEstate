const fetch = require('node-fetch');
require('dotenv').config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};


exports.handler = async (event, context) => {
  try {
    // if it doesn't break the call (i'd have to try it out), i'd like to see query params on separate lines for readability
    const response = await fetch(`https://us-real-estate.p.rapidapi.com/v2/for-sale?
      limit=20
      &state_code=${event.queryStringParameters.state_code}
      &city=${event.queryStringParameters.city}
      &location=${event.queryStringParameters.location}
      &price_min=${event.queryStringParameters.price_min}
      &price_max=${event.queryStringParameters.price_max}`,
      {
        headers: {
          'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REAL_ESTATE_KEY
        }
      });
    
    const data = await response.json();
    const json = JSON.stringify(data);
    
    return { 
      statusCode: 200, 
      headers,
      body: json
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
