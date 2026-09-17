import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { PlayerModal } from "@/components/PlayerModal";
import { SubscribeModal } from "@/components/SubscribeModal";
import { useAuth } from "@/hooks/useAuth";
import { getFilm } from "@/lib/films";
import { fetchFilmStream, fetchTrailer } from "@/lib/streaming.functions";

const ShakaPlayer = lazy(() => import("@/components/ShakaPlayer"));

export const Route = createFileRoute("/watch/$slug")({
  validateSearch: (search) =>
    z.object({ kind: z.enum(["film", "trailer"]).default("film") }).parse(search),
  head: () => ({
    meta: [
      { title: "Watch | Mageye Streaming" },
      { name: "description", content: "Stream Mageye films. Trailers free, full films with a membership." },
      { property: "og:title", content: "Watch | Mageye Streaming" },
      { property: "og:description", content: "Stream Mageye films. Trailers free, full films with a membership." },
      { property: "og:type", content: "video.movie" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WatchPage,
});

function WatchPage() {
  const { slug } = Route.useParams();
  const { kind } = Route.useSearch();
  const film = getFilm(slug);
  const { session, loading } = useAuth();

  const trailer = useServerFn(fetchTrailer);
  const filmStream = useServerFn(fetchFilmStream);

  const [src, setSrc] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "locked">("loading");
  const [payOpen, setPayOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (kind === "trailer") {
        const source = await trailer({ data: { slug } });
        if (!cancelled) {
          setSrc(source.url);
          setState("ready");
        }
        return;
      }

      if (loading) return;
      if (!session) {
        setState("locked");
        return;
      }

      const result = await filmStream({ data: { slug } });
      if (cancelled) return;
      if (result.allowed) {
        setSrc(result.source.url);
        setState("ready");
      } else {
        setState("locked");
      }
    }

    setState("loading");
    run().catch(() => !cancelled && setState("locked"));
    return () => {
      cancelled = true;
    };
  }, [slug, kind, session, loading, reload]);

  return (
    <main>
      <SiteHeader />
      <section className="watch-page">
        <Link className="film-back" to="/films/$slug" params={{ slug }}>
          <ArrowLeft size={15} /> Back to film
        </Link>
        <h1>
          {film?.name ?? "Film"}
          {kind === "trailer" ? " — Trailer" : ""}
        </h1>

        {state === "loading" && <p className="watch-note">Preparing secure playback…</p>}

        {state === "ready" && src && (
          <Suspense fallback={<p className="watch-note">Loading player…</p>}>
            <ShakaPlayer src={src} poster={film?.image} title={film?.name} />
          </Suspense>
        )}

        {state === "locked" && (
          <div className="watch-gate">
            <Lock size={22} />
            <h2>Membership required</h2>
            <p>USD 5.99 a month for every Mageye film. Trailers stay free.</p>
            <div className="watch-gate-actions">
              <button className="pay-button" type="button" onClick={() => setPayOpen(true)}>
                Subscribe to watch
              </button>
              <button
                className="film-btn film-btn-ghost"
                type="button"
                onClick={() => setTrailerOpen(true)}
              >
                Watch trailer free
              </button>
            </div>
          </div>
        )}
      </section>

      <PlayerModal
        slug={trailerOpen ? slug : null}
        title={film?.name}
        poster={film?.image}
        onClose={() => setTrailerOpen(false)}
      />

      <SubscribeModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        onSuccess={() => setReload((value) => value + 1)}
      />
      <SiteFooter />
    </main>
  );
}
