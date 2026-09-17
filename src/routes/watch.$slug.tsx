import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

import { PayModal } from "@/components/PayModal";
import { getFilm } from "@/lib/films";
import { fetchTrailer } from "@/lib/streaming.functions";

const ShakaPlayer = lazy(() => import("@/components/ShakaPlayer"));

export const Route = createFileRoute("/watch/$slug")({
  validateSearch: (search) =>
    z.object({ kind: z.enum(["film", "trailer"]).default("film") }).parse(search),
  head: () => ({
    meta: [
      { title: "Watch | Mageye Streaming" },
      { name: "description", content: "Stream Mageye films. Trailers are free, pay once to watch a full film." },
      { property: "og:title", content: "Watch | Mageye Streaming" },
      { property: "og:description", content: "Stream Mageye films. Trailers are free, pay once to watch a full film." },
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

  const trailer = useServerFn(fetchTrailer);

  const [src, setSrc] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "locked">("loading");
  const [payOpen, setPayOpen] = useState(false);


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

      if (!cancelled) {
        setState("locked");
        setPayOpen(true);
      }
    }

    setState("loading");
    setSrc(null);
    run().catch(() => !cancelled && setState("locked"));
    return () => {
      cancelled = true;
    };
  }, [slug, kind]);

  return (
    <main>
      <SiteHeader />
      <section className="watch-page">
        {state === "ready" && src ? (
          <Suspense fallback={<p className="watch-note">Loading player…</p>}>
            <ShakaPlayer src={src} poster={film?.image} title={film?.name} />
          </Suspense>
        ) : (
          <div className="watch-locked-player">
            {film?.image && <img src={film.image} alt="" />}
            <div className="watch-locked-veil">
              <Lock size={26} />
              <span>{state === "loading" ? "Preparing secure playback…" : film?.name ?? "Film"}</span>
            </div>
          </div>
        )}
      </section>

      <PayModal
        open={payOpen}
        slug={slug}
        title={film?.name}
        onBack={() => navigate({ to: "/films/$slug", params: { slug } })}
        onPaid={(url) => {
          setSrc(url);
          setState("ready");
          setPayOpen(false);
        }}
      />
      <SiteFooter />
    </main>
  );
}
