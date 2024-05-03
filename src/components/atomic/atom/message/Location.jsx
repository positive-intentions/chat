import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// maps styles and market icon
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

const MapComponent = ({ position: initialPosition }) => {
  const position = [
    initialPosition?.latitude ?? 0,
    initialPosition?.longitude ?? 0,
  ];
  return (
    <MapContainer
      center={position || initialPosition}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "300px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {position && (
        <Marker
          position={position}
          icon={L.icon({
            iconUrl: icon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
