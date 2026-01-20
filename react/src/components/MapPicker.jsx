import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
import Swal from "sweetalert2";

// FIX icon Leaflet (WAJIB di React)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon2x,
  iconUrl: icon,
  shadowUrl: shadow,
});

// ================= KONFIG =================
const CENTER = [-7.719126, 110.746628];
const MAX_RADIUS = 20; // km

// ================= HITUNG JARAK =================
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ================= KOMPONEN CLICK =================
function LocationMarker({ setData }) {
  const [markerData, setMarkerData] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      const jarak = getDistanceFromLatLon(
        CENTER[0],
        CENTER[1],
        lat,
        lng
      );

      if (jarak > MAX_RADIUS) {
        Swal.fire({
          icon: "error",
          title: "Di luar jangkauan",
          html: `
            ❌ Jarak <b>${jarak.toFixed(2)} km</b><br/>
            Melebihi <b>${MAX_RADIUS} km</b>!
          `,
          confirmButtonText: "OK",
        });
        return;
      }

      const newData = {
        position: [lat, lng],
        distance: jarak,
      };

      setMarkerData(newData);

      setData({
        lat,
        lng,
        distance: jarak,
        link: `https://www.google.com/maps?q=${lat},${lng}`,
      });
    },
  });

  if (!markerData) return null;

  return (
    <Marker position={markerData.position}>
      <Popup autoOpen>
        📍 Lokasi dipilih <br />
        🧭 Jarak: <b>{markerData.distance.toFixed(2)} km</b>
      </Popup>
    </Marker>
  );
}

// ================= MAIN MAP =================
export default function MapPicker({ setData }) {
  return (
    <MapContainer
      center={CENTER}
      zoom={11}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marker pusat */}
      <Marker position={CENTER}>
        <Popup>📍 Pusat Layanan</Popup>
      </Marker>

      {/* Circle radius layanan */}
      <Circle
        center={CENTER}
        radius={MAX_RADIUS * 1000}
        pathOptions={{
          color: "blue",
          fillColor: "#3b82f6",
          fillOpacity: 0.15,
        }}
      />

      {/* Klik lokasi */}
      <LocationMarker setData={setData} />
    </MapContainer>
  );
}
