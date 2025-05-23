import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Details from "./components/Details";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    const apiKey = "5a6228bfac3093912f8b6c4dc5a06aeb";
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=it`;

    const [resWeather, resForecast] = await Promise.all([fetch(urlWeather), fetch(urlForecast)]);
    const dataWeather = await resWeather.json();
    const dataForecast = await resForecast.json();

    setWeather(dataWeather);
    setForecast(dataForecast);

    // Aggiorno la cronologia se la città non è già presente
    if (city && !history.includes(city)) {
      setHistory([city, ...history].slice(0, 10)); // Limito a 10 ricerche recenti
    }
  };

  const handleClearSearch = () => {
    setCity("");
    setWeather(null);
    setForecast(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              city={city}
              onCityChange={handleInputChange}
              onSearch={fetchWeather}
              weather={weather}
              forecast={forecast}
              history={history}
              setCity={setCity}
              onSearchHistory={fetchWeather}
              onClearSearch={handleClearSearch}
              onClearHistory={handleClearHistory}
            />
          }
        />
        <Route path="/details" element={<Details weather={weather} />} />
      </Routes>
    </Router>
  );
}

export default App;
