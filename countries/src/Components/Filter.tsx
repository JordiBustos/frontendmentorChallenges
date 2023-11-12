import HandleContinentChange from "../interfaces/fn";

export default function Filter({
  selectedContinent,
  handleContinentChange,
  setInputValue,
}: {
  selectedContinent: string;
  handleContinentChange: HandleContinentChange;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <select value={selectedContinent} onChange={handleContinentChange}>
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
