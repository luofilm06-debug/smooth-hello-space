import { useState } from "react";
import { X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";

import { startSubscription } from "@/lib/streaming.functions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

type Method = "mobile_money" | "card" | "paypal" | "google_pay";

const METHODS: { id: Method; label: string; currency: string; logos: string[] }[] = [
  { id: "mobile_money", label: "Mobile Money (MTN / Airtel)", currency: "UGX", logos: ["MTN", "Airtel"] },
  { id: "card", label: "Credit/debit card", currency: "USD", logos: ["VISA", "MC"] },
  { id: "paypal", label: "PayPal", currency: "USD", logos: ["PayPal"] },
  { id: "google_pay", label: "Google Pay", currency: "USD", logos: ["GPay"] },
];

export function SubscribeModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<Method>("card");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsAccount, setNeedsAccount] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const subscribe = useServerFn(startSubscription);
  const { session } = useAuth();

  if (!open) return null;

  async function activate() {
    const result = await subscribe({ data: { method } });
    if (result.ok) {
      onSuccess();
      onClose();
    } else {
      setError(result.message ?? "Payment could not be completed.");
    }
  }

  async function pay() {
    setError(null);
    if (!session) {
      // Only at this point do we ever ask for an account.
      setNeedsAccount(true);
      return;
    }
    setBusy(true);
    try {
      await activate();
    } catch {
      setError("Payment could not be completed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitAccount(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (signUpError) throw new Error(signUpError.message);
        if (!data.session) {
          setMessage("Check your email to confirm your account, then press Pay again.");
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw new Error(signInError.message);
      }
      setNeedsAccount(false);
      await activate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) setError("Google sign-in failed. Please try again.");
  }

  return (
    <div className="pay-overlay" role="dialog" aria-modal="true" aria-label="Review subscription and pay">
      <div className="pay-modal">
        <div className="pay-modal-head">
          <h2>{needsAccount ? "Almost there — confirm it's you" : "Review subscription and pay"}</h2>
          <button type="button" className="pay-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {needsAccount ? (
          <div className="pay-modal-body pay-auth">
            <div className="pay-auth-form">
              <p className="pay-label">
                {mode === "signup"
                  ? "Create your Mageye account to start the membership."
                  : "Sign in to continue your membership."}
              </p>
              <button type="button" className="auth-google" onClick={google}>
                Continue with Google
              </button>
              <div className="auth-divider"><span>or</span></div>
              <form className="auth-form" onSubmit={submitAccount}>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={6}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  />
                </label>
                <button className="pay-button" type="submit" disabled={busy}>
                  {busy ? "Please wait…" : "Continue and pay USD 5.99"}
                </button>
              </form>
              {error && <p className="pay-error">{error}</p>}
              {message && <p className="auth-message">{message}</p>}
              <button
                type="button"
                className="auth-switch"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signup"
                  ? "Already have an account? Sign in"
                  : "New here? Create an account"}
              </button>
            </div>
          </div>
        ) : (
          <div className="pay-modal-body">
            <div className="pay-methods">
              <p className="pay-label">Payment details</p>
              {METHODS.map((item) => (
                <label
                  key={item.id}
                  className={`pay-method${method === item.id ? " selected" : ""}`}
                >
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
                Billing region: <strong>International</strong> · Mobile Money is charged in
                shillings, all other methods in US dollars.
              </p>
            </div>

            <aside className="pay-summary">
              <h3>MAGEYE Streaming</h3>
              <p className="pay-summary-sub">Monthly · 1 viewer</p>
              <div className="pay-row">
                <span>1 membership</span>
                <span>USD 5.99 /month</span>
              </div>
              <div className="pay-row">
                <span>Total for 1 month</span>
                <span>USD 5.99</span>
              </div>
              <div className="pay-total">
                <span>Amount due</span>
                <strong>USD 5.99</strong>
              </div>
              <button type="button" className="pay-button" onClick={pay} disabled={busy}>
                {busy ? "Processing…" : "Pay"}
              </button>
              {error && <p className="pay-error">{error}</p>}
              <p className="pay-fineprint">
                Renews every month. Cancel any time. Streaming only — films are never
                downloadable.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
