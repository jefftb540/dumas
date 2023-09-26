import { api } from '../service/api';

export const getLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      api
        .get(
          `/get-location-details?latitude=${latitude}&longitude=${longitude}`
        )

        .catch(error => {
          console.error('Erro ao obter detalhes da localização:', error);
        });
    });
  } else {
    console.error('Geolocalização não suportada pelo navegador.');
  }
};
