import "./App.css";
import { useState } from "react";

import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
      .then((response) => {
        setResponseData(response.data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setResponseData(null);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your query"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p>Error: {error.message}</p>}

      {responseData && (
        <div>
          <h1>Response Data</h1>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
