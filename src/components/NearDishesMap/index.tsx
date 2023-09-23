import { Container } from './styled';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import { Chef } from '../../types/Chef';
import { useTheme } from '../../contexts/themeContext';

interface NearDishesMapProps {
  chefs: Chef[];
}

//TODO alterar pras coordenadas do usuário
const center = {
  lat: -19.9511221,
  lng: -43.9214969
};

const apikey = import.meta.env.VITE_MAPS_API_KEY;
const darkMapId = import.meta.env.VITE_DARK_MAP_ID;
const lightMapId = import.meta.env.VITE_LIGHT_MAP_ID;

const containerStyle = {
  width: '100%',
  height: '300px'
};

export const NearDishesMap = ({ chefs }: NearDishesMapProps) => {
  const { theme } = useTheme();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const mapId = theme === 'dark' ? darkMapId : lightMapId;

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    map.setZoom(10);
    map.setOptions({ mapId: mapId });

    setMap(map);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apikey,
    libraries: ['geometry']
  });

  return (
    <Container>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={{ disableDefaultUI: true }}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <MarkerF
            position={center}
            icon={{
              url: window.location.origin + '/images/marker.svg',
              labelOrigin: new google.maps.Point(25, -5)
            }}
            label={{
              text: 'Casa do Jeff',
              color: theme === 'dark' ? '#FFF' : '#333',
              fontSize: '24px',
              fontWeight: '700'
            }}
          />
          {chefs.map(chef =>
            chef.address && chef.address.latitude && chef.address.longitude ? (
              <MarkerF
                position={{
                  lat: chef.address.latitude,
                  lng: chef.address.longitude
                }}
                icon={{
                  url: window.location.origin + '/images/marker.svg',
                  labelOrigin: new google.maps.Point(25, -5)
                }}
                label={{
                  text: chef.name,
                  color: '#FFF',
                  fontSize: '24px',
                  fontWeight: '700'
                }}
              />
            ) : (
              ''
            )
          )}
        </GoogleMap>
      ) : null}
    </Container>
  );
};
