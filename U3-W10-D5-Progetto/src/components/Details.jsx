import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import background from "../assets/background.png";

function Details() {
  const { city } = useParams();
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "5a6228bfac3093912f8b6c4dc5a06aeb";

  const groupForecastByDay = (list) => {
    return list.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  };

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);
      setError(null);

      try {
        const resCurrent = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!resCurrent.ok) throw new Error("Errore nel recupero del meteo attuale");
        const dataCurrent = await resCurrent.json();
        setCurrent(dataCurrent);

        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!resForecast.ok) throw new Error("Errore nel recupero delle previsioni");
        const dataForecast = await resForecast.json();
        setForecast(groupForecastByDay(dataForecast.list));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadWeather();
  }, [city]);

  if (loading) {
    return (
      <Container
        className="text-center"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="text-center"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <Container style={{ maxWidth: "900px" }}>
        <Card
          className="mb-4 shadow text-center"
          style={{
            backgroundColor: "#bbdefb",
            borderRadius: "1rem",
            border: "2px solid #1976d2",
            padding: "1rem",
          }}
        >
          <Card.Body>
            <h2 style={{ color: "#1565c0" }}>☀️ Meteo attuale a {current.name}</h2>
            <p className="fs-5 text-capitalize mt-3">
              <strong>Condizioni:</strong> {current.weather[0].description}
            </p>
            <p className="fs-5">
              <strong>Temperatura:</strong> {current.main.temp}°C
            </p>
            <p className="fs-5">
              <strong>Umidità:</strong> {current.main.humidity}%
            </p>
          </Card.Body>
        </Card>

        <h3 className="text-center mb-4 text-secondary">📅 Previsioni prossimi 5 giorni</h3>

        {Object.entries(forecast).map(([date, items]) => (
          <Card
            key={date}
            className="mb-4 shadow"
            style={{
              backgroundColor: "#f1f8e9",
              borderRadius: "0.75rem",
              border: "2px solid #4caf50",
              padding: "1rem",
            }}
          >
            <Card.Body>
              <h5 className="text-success text-center mb-3">📆 Giorno: {date}</h5>
              <Row className="justify-content-center">
                <Col md={10}>
                  <ul className="list-unstyled mb-0">
                    {items.map((item) => (
                      <li
                        key={item.dt}
                        className="border-bottom py-2"
                        style={{
                          fontSize: "1rem",
                          borderBottom: "1px solid #c8e6c9",
                          paddingBottom: "0.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <strong>Orario:</strong> {item.dt_txt.split(" ")[1].slice(0, 5)} |{" "}
                        <strong>Temperatura:</strong> {item.main.temp}°C |{" "}
                        <strong>Condizioni:</strong> {item.weather[0].main}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}
export default Details;
