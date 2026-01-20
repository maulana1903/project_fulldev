import { useState } from "react";
import MapPicker from "../components/MapPicker";
import PublicLayout from "../layouts/PublicLayout";

export default function PublicMap() {
  const [data, setData] = useState({});

  return (
    <PublicLayout>
      <div className="row justify-content-center">
        <div className="col-md-8">
          
          {/* CARD ADMINLTE */}
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Pilih Lokasi
              </h3>
            </div>

            <div className="card-body">
              {/* MAP */}
              <MapPicker setData={setData} />

              {/* INFO LOKASI */}
              {data.lat && (
                <div className="mt-3">
                  <div className="alert alert-info">
                    <strong>Latitude:</strong> {data.lat} <br />
                    <strong>Longitude:</strong> {data.lng} <br />
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-primary mt-2"
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
