import { Link, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

import logoAsset from "@/assets/sanyuka-logo.png.asset.json";

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Mageye home">
      <img src={logoAsset.url} alt="Mageye logo" className="brand-logo" />
      <span>Mageye</span>
    </Link>
  );
}

function NavLinks() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/films">Movies</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </>
  );
}

export function SiteHeader() {
  const { session } = useAuth();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        <NavLinks />
      </nav>
      {session ? (
        <button type="button" className="button button-dark header-cta" onClick={signOut}>
          Sign out
        </button>
      ) : null}
      <details className="mobile-nav">
        <summary aria-label="Open menu"><Menu size={22} /></summary>
        <nav aria-label="Mobile navigation">
          <NavLinks />
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Brand />
      <p>California, USA · Available worldwide</p>
      <p>© 2026 Mageye</p>
    </footer>
  );
}
