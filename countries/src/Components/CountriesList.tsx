import Country from "../interfaces/Country";
import CardCountry from "./CardCountry";

export default function CountriesList({
  countries,
  selectedContinent,
}: {
  countries: Country[];
  selectedContinent: string;
}): JSX.Element {
  return (
    <ul className="countries-container">
      {createCountriesList(countries, selectedContinent)}
    </ul>
  );
}

function createCountriesList(
  countries: Country[],
  selectedContinent: string
): JSX.Element[] {
  return selectedContinent === "All"
    ? countries.map((country) => (
        <CardCountry key={country.cca3} country={country} />
      ))
    : countries
        .filter((country) =>
          country.region?.includes(selectedContinent as never)
        )
        .map((country) => <CardCountry key={country.cca3} country={country} />);
}
