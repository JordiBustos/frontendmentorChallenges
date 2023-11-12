import { InvoiceType } from "../types";

export default function Invoice({ invoice }: { invoice: InvoiceType }) {
  return (
    <li>
      <div>
        <span className="id-hashtag">#</span>
        <span className="invoice-id">{invoice.id}</span>
      </div>
      <span className="invoice-date">{invoice.createdAt}</span>
      <span className="invoice-name">{invoice.clientName}</span>
      <span className="invoice-total">${invoice.total}</span>
      <span className={`invoice-status ${invoice.status}`}>{invoice.status}</span>
    </li>
  );
}
