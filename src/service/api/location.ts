import axios from 'axios';

const accessKey = import.meta.env.VITE_IPAPI_KEY;
export const getLocationWithIPAddress = async () => {
  try {
    const response = await axios.get('http://api.ipapi.com/api/check', {
      params: {
        access_key: accessKey
      }
    });

    return { lat: response.data.latitude, lng: response.data.longitude };
  } catch (error) {
    console.log(error);
  }
};
