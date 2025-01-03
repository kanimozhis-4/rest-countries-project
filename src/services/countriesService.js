import  clientCall  from '../client/clientCall';

export const fetchCountries = async (payload = null) => {
  try { 

    const url='https://restcountries.com/v3.1/all'
    const method='GET'
    const response = await clientCall(url, method, payload);
    return response.data
  } catch (err) {
    console.log('Error fetching countries:', err.message);
  }
}; 
export const fetchCountryById = async (id) => {
  try {
    const url=`https://restcountries.com/v3.1/alpha/${id}`
    const method='GET'
    const response = await clientCall(url, method, null);
    return response.data
   
  } catch (error) {
    console.error("Error fetching country details:", error);
  }
};