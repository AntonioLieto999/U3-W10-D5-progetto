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
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: 400, maxWidth: "90%" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            borderRadius: 16,
            zIndex: 1,
          }}
        ></div>

        <div
          className="d-flex flex-column text-align-center"
          style={{
            padding: 24,
            borderRadius: 16,
            color: "#fff",
            position: "relative",
            zIndex: 2,
            background: "transparent",
          }}
        >
          <h2>Dettagli Meteo per {weather.name}</h2>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>Meteo: {weather.weather[0].description}</p>
          <p>Umidità: {weather.main.humidity}%</p>
          <p>Vento: {weather.wind.speed} m/s</p>
          <Link to="/" style={{ color: "#aad" }}>
            Torna alla ricerca
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Details;
