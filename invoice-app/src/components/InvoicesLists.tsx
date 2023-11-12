import { InvoiceType } from "../types";
import Invoice from "./Invoice";

export default function InvoicesLists({
  invoices,
}: {
  invoices: InvoiceType[];
}) {
  return invoices.map((invoice) => {
    return (
      <ul key={invoice.id} className="invoice-container">
        <Invoice invoice={invoice} />
      </ul>
    );
  });
}
