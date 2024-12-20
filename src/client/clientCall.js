// services/client.js
import axios from 'axios';
const clientCall = async (endpoint, method = 'GET', payload) => {
  try { 
    const config={
        url: endpoint,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: payload
    }
    const response = await axios(config);
    return response;
  } catch (error) {
    console.log('API call failed:', error.message);
    // throw new Error(`Failed to fetch: ${error.response?.statusText || error.message}`);
  }
}; 
export default clientCall
