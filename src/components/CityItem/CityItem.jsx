import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const CityItem = ({ city }) => {
  const dateToFormat = new Date(city.date);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract day, month, and year components from the date object
  const day = dateToFormat.getDate();
  const monthIndex = dateToFormat.getMonth();
  const year = dateToFormat.getFullYear();

  // Get the month name from the monthNames array
  const monthName = monthNames[monthIndex];

  // Construct the reformatted date string
  const reformattedDate = `(${monthName} ${day}, ${year})`;

  //destruct city object for easier use
  const { cityName, emoji, id, position } = city;

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{reformattedDate}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
