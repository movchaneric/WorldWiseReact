import styles from "./CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import { useCities } from "../../context/CitiesContext";

const CountryList = () => {
  const { cities } = useCities();
  const countries = cities.reduce((currArr, currCity) => {
    const countryExists = currArr.find(
      (item) => item.country === currCity.country
    );

    if (!countryExists) {
      return [...currArr, { country: currCity.country, emoji: currCity.emoji }];
    } else {
      return currArr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
