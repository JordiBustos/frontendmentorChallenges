import { fetchData } from "./api.js";

const word = "keyword"; // Replace with the word you want to look up
const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

(async () => {
  const result = await fetchData(apiUrl);

  result.fold(
    (error) => {
      console.error(error);
    },
    (data) => {
      console.log(data);
    }
  );
})();