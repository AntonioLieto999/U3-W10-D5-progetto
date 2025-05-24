import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

function DetailsPage() {
  const { city } = useParams();
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
}

const API_KEY = "5a6228bfac3093912f8b6c4dc5a06aeb";


const groupForecastByDay = 
