const fetch = require('node-fetch');
require('dotenv').config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};


exports.handler = async (event, context) => {
  try {
    const apiCall = `https://us-real-estate.p.rapidapi.com/v2/for-sale?limit=20&state_code=${event.queryStringParameters.state_code}&city=Portland&location=97202
    `;
    console.log('apiCall', apiCall);
    const response = await fetch(`https://us-real-estate.p.rapidapi.com/v2/for-sale?limit=20&state_code=
    ${event.queryStringParameters.state_code}&city=${event.queryStringParameters.city}&location=${event.queryStringParameters.location}
    `, {
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
