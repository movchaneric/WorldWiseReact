" vlatitude=0&longitude=0";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import Message from "../Message/Message";
import { useCities } from "../../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const Form = () => {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [countryEmoji, setCountryEmoji] = useState("");
  const [geoError, setGeoError] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [searchParams] = useSearchParams();
  const { createCity } = useCities();

  const navigate = useNavigate();
  const formLat = searchParams.get("lat");
  const formLng = searchParams.get("lng");

  useEffect(() => {
    if (!formLat && !formLng)
      return <Message message={"start with clicking on a city on the map."} />;

    const fetchCityData = async () => {
      try {
        setIsLoadingGeolocation(true);
        setGeoError("");
        const res = await fetch(
          `${BASE_URL}?latitude=${formLat}&longitude=${formLng}`
        );

        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "Thats doesnt seems to be a city, please click somewhere else."
          );

        setCityName(data.city ? data.city : data.locality);
        setCountryEmoji(convertToEmoji(data.countryCode));
        setCountry(data.countryName);
      } catch (err) {
        setGeoError(err.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    };
    fetchCityData();
  }, [formLat, formLng]);

  const handleFormSumbit = (e) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji: countryEmoji,
      position: {
        lat: formLat,
        lng: formLng,
      },
    };

    createCity(newCity);
    navigate("/app/cities");
  };

  //Error if not city , display instead of a form
  if (geoError) return <Message message={geoError} />;

  return (
    <form className={styles.form} onSubmit={handleFormSumbit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{countryEmoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={formatDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault(); //added because clicking back reloaded the form
            navigate(-1); // -1 : move one page back
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
};

export default Form;
