import { Link } from "react-router-dom";

function Homepage({ city, onCityChange, onSearch, weather, forecast, onClearSearch }) {
  return (
    <div
      className="container d-flex flex-column align-items-center position-relative"
      style={{ minHeight: "100vh", padding: 20 }}
    >
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 600, marginTop: 40 }}>
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

        <div style={{ position: "relative", zIndex: 2, padding: 32 }}>
          <div className="row w-100 justify-content-center">
            <div className="col-12 text-center">
              <h1 className="mb-4 text-primary" style={{ color: "#fff" }}>
                Cerca una città
              </h1>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cerca una città"
                  value={city}
                  onChange={onCityChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSearch();
                    }
                  }}
                />
                <button className="btn btn-primary rounded-end-pill" onClick={onSearch}>
                  Cerca
                </button>
              </div>
            </div>
          </div>

          {weather && weather.main && (
            <div style={{ color: "#fff" }}>
              <h2>{weather.name}</h2>
              <p>Temperatura: {weather.main.temp}°C</p>
              <p>Meteo: {weather.weather[0].description}</p>
              <Link to="/details">
                <button className="btn btn-secondary ms-3">dettagli</button>
              </Link>
            </div>
          )}
          {weather && weather.main && (
            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-outline-success me-3" onClick={onClearSearch}>
                Pulisci ricerca
              </button>
            </div>
          )}
          {forecast && forecast.list && (
            <div style={{ color: "#fff" }}>
              <h3>Prossime ore:</h3>
              <ul>
                {forecast.list.slice(0, 7).map((item, met) => (
                  <li key={met}>
                    {item.dt_txt}: {item.main.temp}°C, {item.weather[0].description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
