import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState({});
  const [currentCity, setCurrectCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:3000/cities");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("failed to fetch cities");
      }
    };
    fetchCities();
  }, []);

  const getCityById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/cities/${id}`);
      const data = await res.json();
      setCurrectCity(data);
    } catch (err) {
      alert("failed to fetch cities");
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        getCityById,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is been used out CitiesProvider scope");
  return context;
};

export { CitiesProvider, useCities };
