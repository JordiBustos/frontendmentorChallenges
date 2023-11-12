export default function Navbar({
  invoicesTotal,
  selectedState,
  handleStateChange,
}: {
  invoicesTotal: number;
  handleStateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedState: string;
}) {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <h1>Invoices</h1>
          <p>There are {invoicesTotal} total invoices</p>
        </div>
        <div className="nav-right">
          <select value={selectedState} onChange={(e) => handleStateChange(e)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="draft">Draft</option>
          </select>
          <button className="new-invoice-button">
            <span className="plus-icon">+</span>
            New Invoice
          </button>
        </div>
      </div>
    </nav>
  );
}
