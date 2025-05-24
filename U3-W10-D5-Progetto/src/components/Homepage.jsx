import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner, Row, Col, Card } from "react-bootstrap";
import background from "../assets/background.png";

function HomePage() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_KEY = "5a6228bfac3093912f8b6c4dc5a06aeb";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Città non trovata");
      navigate(`/details/${city}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container style={{ maxWidth: "500px" }}>
        <Card
          className="shadow-lg"
          style={{
            padding: "2rem",
            borderRadius: "1rem",
            backgroundColor: "white",
            border: "2px solid #1976d2",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4" style={{ color: "#1976d2" }}>
              🌤️ Controlla il meteo
            </h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Es. Roma, Milano..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-control-lg"
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #1976d2",
                    borderRadius: "0.5rem",
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3 btn-lg"
                disabled={loading}
                style={{
                  padding: "0.75rem",
                  border: "1px solid #1976d2",
                  borderRadius: "0.5rem",
                }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Cerca Meteo"}
              </Button>
            </Form>

            {error && (
              <Alert variant="danger" className="mt-3 text-center">
                {error}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default HomePage;
