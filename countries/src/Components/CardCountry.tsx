import Country from "../interfaces/Country";

export default function CardCountry({
  country,
}: {
  country: Country;
}): JSX.Element {
  return (
    <article className="card-country">
      <img src={country.flags.png} alt={country.flags.alt} />
      <div>
        <h2>{country.name.common}</h2>
        <p>
          <strong>Population:</strong> {country.population}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Capital:</strong>{" "}
          {country.capital.length > 0 ? country.capital : "N/A"}
        </p>
      </div>
    </article>
  );
}
