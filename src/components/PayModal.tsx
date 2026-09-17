import { useState } from "react";
import { X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";

import { payForFilm } from "@/lib/streaming.functions";

type Method = "mobile_money" | "card" | "paypal" | "google_pay";

const METHODS: { id: Method; label: string; currency: string; logos: string[] }[] = [
  { id: "mobile_money", label: "Mobile Money (MTN / Airtel)", currency: "UGX", logos: ["MTN", "Airtel"] },
  { id: "card", label: "Credit/debit card", currency: "USD", logos: ["VISA", "MC"] },
  { id: "paypal", label: "PayPal", currency: "USD", logos: ["PayPal"] },
  { id: "google_pay", label: "Google Pay", currency: "USD", logos: ["GPay"] },
];

export function PayModal({
  open,
  slug,
  title,
  onBack,
  onPaid,
}: {
  open: boolean;
  slug: string;
  title?: string | undefined;
  onBack: () => void;
  onPaid: (url: string) => void;
}) {
  const [method, setMethod] = useState<Method>("card");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = useServerFn(payForFilm);

  if (!open) return null;

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const result = await pay({ data: { slug, method } });
      if (result.ok) {
        onPaid(result.source.url);
      } else {
        setError("Payment could not be completed. Please try again.");
      }
    } catch {
      setError("Payment could not be completed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pay-overlay" role="dialog" aria-modal="true" aria-label="Pay to watch">
      <div className="pay-modal">
        <div className="pay-modal-head">
          <h2>Pay to watch</h2>
          <button type="button" className="pay-close" onClick={onBack}>
            <ArrowLeft size={16} /> Go back
          </button>
        </div>

        <div className="pay-modal-body">
          <div className="pay-methods">
            <p className="pay-label">Payment details</p>
            {METHODS.map((item) => (
              <label key={item.id} className={`pay-method${method === item.id ? " selected" : ""}`}>
                <input
                  type="radio"
                  name="payment-method"
                  checked={method === item.id}
                  onChange={() => setMethod(item.id)}
                />
                <span className="pay-logos">
                  {item.logos.map((logo) => (
                    <span className="pay-logo" key={logo}>{logo}</span>
                  ))}
                </span>
                <span className="pay-method-name">{item.label}</span>
                <span className="pay-currency">{item.currency}</span>
              </label>
            ))}
            <p className="pay-note">
              No account needed. Mobile Money is charged in shillings, all other methods in US
              dollars.
            </p>
          </div>

          <aside className="pay-summary">
            <h3>{title ?? "Mageye film"}</h3>
            <p className="pay-summary-sub">One film · watch now</p>
            <div className="pay-row">
              <span>1 film</span>
              <span>USD 5.99</span>
            </div>
            <div className="pay-total">
              <span>Amount due</span>
              <strong>USD 5.99</strong>
            </div>
            <button type="button" className="pay-button" onClick={submit} disabled={busy}>
              {busy ? "Processing…" : "Pay USD 5.99"}
            </button>
            {error && <p className="pay-error">{error}</p>}
            <p className="pay-fineprint">
              One-time payment for this film. Streaming only — films are never downloadable.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
