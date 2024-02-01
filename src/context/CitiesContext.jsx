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

  const createCity = async (newCity) => {
    try {
      const res = await fetch(`http://localhost:3000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cityData = await res.json();
      setCities((prevState) => [...prevState, cityData]);
      //add the data(new city) to the cities effect
    } catch (err) {
      alert("failed to fetch cities");
    }
  };

  const deleteCity = async (cityId) => {
    if (!cityId) return;

    const updatedCities = cities.filter((city) => city.id !== cityId);

    try {
      const res = await fetch(`http://localhost:3000/cities`, {
        method: "DELETE",
      });
      
      setCities(updatedCities);
    } catch (err) {
      alert("failed to delete city with the id ");
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        getCityById,
        createCity,
        deleteCity,
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
