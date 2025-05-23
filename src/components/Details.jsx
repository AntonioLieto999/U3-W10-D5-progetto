import { Link } from "react-router-dom";

function Details({ weather }) {
  if (!weather || !weather.main) {
    return (
      <div style={{ padding: 20 }}>
        <p>Nessuna città selezionata.</p>
        <Link to="/">Torna alla ricerca</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "30vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="d-flex flex-column text-align-center border border-primary"
        style={{ padding: 15, borderRadius: 10 }}
      >
        <h2>Dettagli Meteo per {weather.name}</h2>
        <p>Temperatura: {weather.main.temp}°C</p>
        <p>Meteo: {weather.weather[0].description}</p>
        <p>Umidità: {weather.main.humidity}%</p>
        <p>Vento: {weather.wind.speed} m/s</p>
        <Link to="/">Torna alla ricerca</Link>
      </div>
    </div>
  );
}

export default Details;
