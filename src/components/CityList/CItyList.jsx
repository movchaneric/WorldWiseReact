import styles from "./CItyList.module.css";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import { Fragment } from "react";
import { useCities } from "../../context/CitiesContext";

const CityList = () => {
  const {cities} = useCities();
  
  if (!cities.length) return <Message />;

  return (
    <Fragment>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    </Fragment>
  );
};

export default CityList;
