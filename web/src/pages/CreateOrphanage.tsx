import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import "../styles/pages/create-orphanage.css";
import { FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { type LatLngExpression, type LeafletMouseEvent } from "leaflet";
import { useEffect, useState, type ChangeEvent } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function LocationMarker({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(event: LeafletMouseEvent) {
      onSelect(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

export default function CreateOrphanage() {
  const history = useNavigate();
  const [position, setPosition] = useState<LatLngExpression>([
    -23.7556107, -46.5768819,
  ]); // fallback

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [latitude, longitude] = position as [number, number];
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        setPosition([
          geoPosition.coords.latitude,
          geoPosition.coords.longitude,
        ]);
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      },
    );
  }, []);

  function handleMapClick(lat: number, lng: number) {
    setPosition([lat, lng]);
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) =>
      URL.createObjectURL(image),
    );
    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", openingHours);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("open_on_weekends", String(openOnWeekends));

    images.forEach((image) => {
      data.append("images", image);
    });

    await api.post("orphanages", data);
    alert("Cadastro realizado com sucesso!");
    history("/app");
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={position}
              style={{ width: "100%", height: 280 }}
              zoom={15}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <LocationMarker onSelect={handleMapClick} />

              <Marker interactive={true} icon={mapIcon} position={position} />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} alt={name} />;
                })}
                <label htmlFor="image[0]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                name="images"
                id="image[0]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
