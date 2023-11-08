import { Left, Right } from "./either.js";

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return Left(`Network response was not OK (${response.status})`);
    }

    const data = await response.json();
    return Right(data);
  } catch (error) {
    return Left(`Fetch error: ${error.message}`);
  }
}

export { fetchData };