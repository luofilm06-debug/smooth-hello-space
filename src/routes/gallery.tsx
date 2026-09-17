import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

import hassanImage from "@/assets/hassan-mageye.png.asset.json";
import directorHero from "@/assets/director-hero-2.png.asset.json";
import behindCouple from "@/assets/behind-scene-couple.jpg.asset.json";
import behindDirecting from "@/assets/behind-scene-directing.jpg.asset.json";
import behindSet from "@/assets/behind-scene-set.jpg.asset.json";
import behindTailor from "@/assets/behind-scene-tailor.jpg.asset.json";
import behindWalk from "@/assets/behind-scene-walk.jpg.asset.json";
import bedroomChain from "@/assets/bedroom-chain.jpg.asset.json";
import devilsChestBanner from "@/assets/devils-chest-banner.png.asset.json";
import devilsChestPoster from "@/assets/devils-chest-poster.jpg.asset.json";
import galzAbout from "@/assets/galz-about.jpg.asset.json";
import kimote from "@/assets/kimote.jpg.asset.json";
import kingsVirgin from "@/assets/kings-virgin.jpg.asset.json";
import tinkasStory from "@/assets/tinkas-story.jpg.asset.json";
import upcomingSilence from "@/assets/silence-we-flee.png.asset.json";
import upcomingBullock from "@/assets/john-bullock.png.asset.json";
import upcomingModernRoad from "@/assets/modern-road.png.asset.json";
import filmsBanner from "@/assets/films-banner.jpg";
import projectEvent from "@/assets/project-event.jpg";
import projectProduct from "@/assets/project-product.jpg";
import projectStudio from "@/assets/project-studio.jpg";
import projectWedding from "@/assets/project-wedding.jpg";
import upcomingLaneway from "@/assets/upcoming-laneway.jpg";
import upcomingLongway from "@/assets/upcoming-longway.jpg";
import upcomingSaltstone from "@/assets/upcoming-saltstone.jpg";
import videographerHero from "@/assets/videographer-hero.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Mageye" },
      {
        name: "description",
        content: "Photos, film stills, posters, production moments and upcoming-project images from Mageye.",
      },
      { property: "og:title", content: "Gallery | Mageye" },
      {
        property: "og:description",
        content: "Browse Mageye film stills, posters and production photography.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

const gallery: { src: string; alt: string; title: string }[] = [
  { src: hassanImage.url, alt: "Hassan Mageye, writer, director and producer", title: "Hassan Mageye" },
  { src: directorHero.url, alt: "Hassan Mageye directing on location", title: "On location" },
  { src: behindDirecting.url, alt: "Behind the scenes — directing a scene", title: "Directing" },
  { src: behindSet.url, alt: "Behind the scenes — on set", title: "On set" },
  { src: behindCouple.url, alt: "Behind the scenes — filming a couple", title: "Behind the scenes" },
  { src: behindTailor.url, alt: "Behind the scenes — the tailor scene", title: "The tailor scene" },
  { src: behindWalk.url, alt: "Behind the scenes — a walking shot", title: "Walking shot" },
  { src: kimote.url, alt: "Kimote — film still", title: "Kimote" },
  { src: galzAbout.url, alt: "Galz About — film still", title: "Galz About" },
  { src: kingsVirgin.url, alt: "The King's Virgin — film still", title: "King's Virgin" },
  { src: bedroomChain.url, alt: "Bedroom Chain — film still", title: "Bedroom Chain" },
  { src: devilsChestPoster.url, alt: "Devil's Chest — poster", title: "Devil's Chest" },
  { src: devilsChestBanner.url, alt: "Devil's Chest — banner", title: "Devil's Chest" },
  { src: tinkasStory.url, alt: "Tinka's Story — film still", title: "Tinka's Story" },
  { src: upcomingSilence.url, alt: "The Silence We Flee — still", title: "The Silence We Flee" },
  { src: upcomingModernRoad.url, alt: "Modern Road — still", title: "Modern Road" },
  { src: upcomingBullock.url, alt: "John Bullock — still", title: "John Bullock" },
  { src: filmsBanner, alt: "Mageye films banner", title: "Films" },
  { src: videographerHero, alt: "Camera work on location", title: "Production" },
  { src: projectStudio, alt: "Studio production", title: "Studio" },
  { src: projectEvent, alt: "Event coverage", title: "Events" },
  { src: projectProduct, alt: "Product shoot", title: "Product shoot" },
  { src: projectWedding, alt: "Wedding film", title: "Wedding film" },
  { src: upcomingLaneway, alt: "Laneway — production still", title: "Laneway" },
  { src: upcomingLongway, alt: "Longway — production still", title: "Longway" },
  { src: upcomingSaltstone, alt: "Saltstone — production still", title: "Saltstone" },
];

function GalleryPage() {
  return (
    <main>
      <SiteHeader />

      <section className="gallery-page-hero" aria-labelledby="gallery-page-title">
        <p className="eyebrow">In pictures</p>
        <h1 id="gallery-page-title">Gallery</h1>
        <p>Film stills, behind-the-scenes moments, posters and production images from Mageye.</p>
      </section>

      <section className="gallery-page-grid" aria-label="All gallery pictures">
        {gallery.map((item, index) => (
          <figure className="gallery-page-item" key={`${item.src}-${index}`}>
            <img src={item.src} alt={item.alt} loading={index < 8 ? "eager" : "lazy"} />
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
