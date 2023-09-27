import axios from 'axios';

const accessKey = import.meta.env.VITE_IPAPI_KEY;
export const getLocationWithIPAddress = async () => {
  try {
    const response = await axios.get('https://api.ipgeolocation.io/ipgeo', {
      params: {
        apiKey: accessKey
      }
    });
    console.log(response);
    return { lat: response.data.latitude, lng: response.data.longitude };
  } catch (error) {
    console.log(error);
  }
};
