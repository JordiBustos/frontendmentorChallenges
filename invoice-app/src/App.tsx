import "./App.css";
import data from "./data.json";
import InvoicesLists from "./components/InvoicesLists";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [status, setStatus] = useState<string>("all");

  function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value);
  }

  return (
    <>
      <Navbar
        invoicesTotal={data.length}
        handleStateChange={handleStateChange}
        selectedState={status}
      />
      <InvoicesLists
        invoices={
          status === "all"
            ? data
            : data.filter((invoice) => invoice.status === status)
        }
      />
    </>
  );
}

export default App;
