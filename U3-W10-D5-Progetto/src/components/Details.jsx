import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

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
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Meteo attuale a {current.name}</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{current.weather[0].description}</Card.Title>
          <Card.Text>Temperatura: {current.main.temp}°C</Card.Text>
        </Card.Body>
      </Card>

      <h3>Previsioni per i prossimi 5 giorni</h3>
      {Object.keys(forecast).map((day) => (
        <div key={day} className="mb-4">
          <h5>{day}</h5>
          <Row>
            {forecast[day].map((item) => (
              <Col key={item.dt} sm={6} md={4} lg={2}>
                <Card className="mb-2">
                  <Card.Body>
                    <Card.Subtitle>{item.dt_txt.split(" ")[1]}</Card.Subtitle>
                    <Card.Text>{item.main.temp}°C</Card.Text>
                    <Card.Text>{item.weather[0].main}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default Details;
