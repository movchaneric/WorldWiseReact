import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Action type is unknown");
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, currentCity }, dispatch] = useReducer(reducer, initialState);
  // const [cities, setCities] = useState({});
  // const [currentCity, setCurrectCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:3000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(data);
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    };
    fetchCities();
  }, []);

  const getCityById = async (id) => {
    //to avoid fetching once again if the city is already selected.
    if (Number(id) === currentCity.id) return;

    try {
      const res = await fetch(`http://localhost:3000/cities/${id}`);
      const cityByIdData = await res.json();
      dispatch({ type: "city/loaded", payload: cityByIdData });
      // setCurrectCity(data);
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city with ID...",
      });
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
      const newCityData = await res.json();
      dispatch({ type: "city/created", payload: newCityData });
      //add the data(new city) to the cities current array
      // setCities((prevState) => [...prevState, cityData]);
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city with ID...",
      });
    }
  };

  const deleteCity = async (cityId) => {
    if (!cityId) return;

    try {
      await fetch(`http://localhost:3000/cities/${cityId}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: cityId });
      // setCities(updatedCities);
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city with ID...",
      });
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
