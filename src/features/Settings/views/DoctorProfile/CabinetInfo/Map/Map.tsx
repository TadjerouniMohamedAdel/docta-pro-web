import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker from '../../../../../../assets/svg/marker.svg';
import { Text } from '../../../../../../components';
import { Location } from '../../types';

type Props = {
  location: Location;
};

const Map: React.FC<Props> = ({ location }) => {
  const { t } = useTranslation('translation');

  const initMap = () => {
    let { lat, lng } = location;
    let zoom = 13;

    if (lat === 0 && lng === 0) {
      lat = 36.751189;
      lng = 3.086532;
      zoom = 10;
    }

    const map = L.map('map-id').setView([lat, lng], zoom);

    // google maps
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    const markerIcon = L.icon({
      iconUrl: marker,
    });

    if (lat !== 0 && lng !== 0) {
      L.marker([lat, lng], { icon: markerIcon }).addTo(map);
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div>
      <Text> {t('cabinet on map')} </Text>
      <div id="map-id" style={{ height: 300, background: '#eceef1', overflow: 'hidden' }} />
    </div>
  );
};

export default Map;
