import useApiFetch from "./hooks/useApi";
import CountriesResponse from "./interfaces/CountriesResponse";
import CountriesList from "./Components/CountriesList";
import { useState } from "react";
import "./App.css";
import Filter from "./Components/Filter";
import Navbar from "./Components/Navbar";
import HandleContinentChange from "./interfaces/fn";

const URL_ALL = "https://restcountries.com/v3.1/independent?status=true";

function App() {
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [inputValue, setInputValue] = useState("");

  const response = useApiFetch<CountriesResponse>(URL_ALL);
  const data = response?.data;
  const loading = response?.loading;
  const error = response?.error;

  const handleContinentChange: HandleContinentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedContinent(event.target.value);
  };

  return (
    <>
      <Navbar />
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {error && <p>Something went wrong</p>}
      {data && (
        <>
          <Filter
            setInputValue={setInputValue}
            selectedContinent={selectedContinent}
            handleContinentChange={handleContinentChange}
          />
          <CountriesList
            countries={
              inputValue
                ? data.filter((country) =>
                    country.name.common
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                : data
            }
            selectedContinent={selectedContinent}
          />
        </>
      )}
    </>
  );
}

export default App;
