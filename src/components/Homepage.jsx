import { Link } from "react-router-dom";

function Homepage({ city, onCityChange, onSearch, weather, forecast, onClearSearch }) {
  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{ minHeight: "100vh", padding: 20 }}
    >
      <div className="row w-100 justify-content-center" style={{ marginTop: "40px" }}>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 text-center">
          <h1 className="mb-4 text-primary">Cerca una città</h1>
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
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>Meteo: {weather.weather[0].description}</p>
          <Link to="/details">
            <button className="btn btn-secondary ms-4">dettagli</button>
          </Link>
        </div>
      )}
      {weather && weather.main && (
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-outline-danger me-3" onClick={onClearSearch}>
            Pulisci ricerca
          </button>
        </div>
      )}
      {forecast && forecast.list && (
        <div>
          <h3>Prossimi giorni:</h3>
          <ul>
            {forecast.list.slice(0, 3).map((item, met) => (
              <li key={met}>
                {item.dt_txt}: {item.main.temp}°C, {item.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Homepage;
