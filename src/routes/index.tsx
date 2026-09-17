import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  ChevronRight,
  MonitorPlay,
  Play,
  Video,
} from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { PlayerModal } from "@/components/PlayerModal";
import { films, getFilm } from "@/lib/films";

import contactBackground from "@/assets/hassan-mageye-coming-soon.avif.asset.json";
import hassanImage from "@/assets/hassan-mageye.png.asset.json";
import upcomingSilence from "@/assets/silence-we-flee.png.asset.json";
import upcomingBullock from "@/assets/john-bullock.png.asset.json";
import upcomingModernRoad from "@/assets/modern-road.png.asset.json";
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
import filmsBanner from "@/assets/films-banner.jpg";
import projectEvent from "@/assets/project-event.jpg";
import projectProduct from "@/assets/project-product.jpg";
import projectStudio from "@/assets/project-studio.jpg";
import projectWedding from "@/assets/project-wedding.jpg";
import upcomingLaneway from "@/assets/upcoming-laneway.jpg";
import upcomingLongway from "@/assets/upcoming-longway.jpg";
import upcomingSaltstone from "@/assets/upcoming-saltstone.jpg";
import videographerHero from "@/assets/videographer-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mageye | Films by Hassan Mageye" },
      {
        name: "description",
        content:
          "Cinematic films by Hassan Mageye, a Ugandan/American writer, director and producer telling African stories with heart.",
      },
      { property: "og:title", content: "Mageye | Films by Hassan Mageye" },
      {
        property: "og:description",
        content: "African stories, cultural identity and character-driven drama.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const heroMenu = [
  { label: "About Mageye", href: "#about" },
  { label: "Watch movies here", href: "#portfolio" },
  { label: "Upcoming projects", href: "#upcoming" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Media and news", href: "#media" },
  { label: "Contact us", href: "#contact" },
];

const services = [
  {
    icon: Building2,
    title: "Locations",
    text: "Scouting and access to filming locations across Africa and Santa Rosa, California.",
  },
  {
    icon: Video,
    title: "Local crew",
    text: "Experienced local camera, sound and production crews on the ground.",
  },
  {
    icon: MonitorPlay,
    title: "Permit coordination",
    text: "Permits, clearances and paperwork handled so your shoot runs smoothly.",
  },
  {
    icon: Play,
    title: "Production support",
    text: "Logistics, transport and on-the-ground support from prep to wrap.",
  },
];

const projects = films.map((film) => ({
  image: film.image,
  name: film.name,
  type: film.genre,
  slug: film.slug,
}));

const upcomingProjects = [
  {
    image: upcomingSilence,
    name: "The Silence We Flee",
    date: "Coming soon",
    status: "Coming soon",
  },
  {
    image: upcomingModernRoad,
    name: "Modern Road",
    date: "Coming soon",
    status: "Coming soon",
  },
  {
    image: upcomingBullock,
    name: "John Bullock",
    date: "Coming soon",
    status: "Coming soon",
  },
];

const gallery: { src: string; alt: string }[] = [
  { src: hassanImage.url, alt: "Hassan Mageye, writer, director and producer" },
  { src: directorHero.url, alt: "Hassan Mageye directing on location" },
  { src: behindDirecting.url, alt: "Behind the scenes — directing a scene" },
  { src: behindSet.url, alt: "Behind the scenes — on set" },
  { src: behindCouple.url, alt: "Behind the scenes — filming a couple" },
  { src: behindTailor.url, alt: "Behind the scenes — the tailor scene" },
  { src: behindWalk.url, alt: "Behind the scenes — a walking shot" },
  { src: kimote.url, alt: "Kimote — film still" },
  { src: galzAbout.url, alt: "Galz About — film still" },
  { src: kingsVirgin.url, alt: "The King's Virgin — film still" },
  { src: bedroomChain.url, alt: "Bedroom Chain — film still" },
  { src: devilsChestPoster.url, alt: "Devil's Chest — poster" },
  { src: devilsChestBanner.url, alt: "Devil's Chest — banner" },
  { src: tinkasStory.url, alt: "Tinka's Story — film still" },
  { src: upcomingSilence.url, alt: "The Silence We Flee — still" },
  { src: upcomingModernRoad.url, alt: "Modern Road — still" },
  { src: upcomingBullock.url, alt: "John Bullock — still" },
  { src: filmsBanner, alt: "Mageye films banner" },
  { src: videographerHero, alt: "Camera work on location" },
  { src: projectStudio, alt: "Studio production" },
  { src: projectEvent, alt: "Event coverage" },
  { src: projectProduct, alt: "Product shoot" },
  { src: projectWedding, alt: "Wedding film" },
  { src: upcomingLaneway, alt: "Laneway — production still" },
  { src: upcomingLongway, alt: "Longway — production still" },
  { src: upcomingSaltstone, alt: "Saltstone — production still" },
];

const awards = [
  {
    title: "Best Film in an Indigenous Language",
    detail: "2025 Uganda Film Festival",
  },
  {
    title: "Special Mention",
    detail: "2025 Mashariki African Film Festival",
  },
  {
    title: "Official selection",
    detail: "Silicon Valley African Film Festival",
  },
  {
    title: "Uganda's official submission",
    detail: "98th Academy Awards, Best International Feature Film",
  },
];

function ProjectCard({
  project,
  slug,
  index,
  activeIndex,
  onActivate,
  onTrailer,
}: {
  project: { image: string; name: string; type: string };
  slug: string;
  index: number;
  activeIndex: number | null;
  onActivate: (index: number) => void;
  onTrailer: (slug: string) => void;
}) {
  const active = activeIndex === index;
  return (
    <Link
      className={`project-card${active ? " is-active" : ""}`}
      to="/films/$slug"
      params={{ slug }}
      onClick={(e) => {
        if (
          typeof window !== "undefined" &&
          (window.matchMedia("(hover: none)").matches ||
            window.matchMedia("(max-width: 720px)").matches) &&
          !active
        ) {
          e.preventDefault();
          onActivate(index);
        }
      }}
    >
      <span className="project-thumb">
        <img src={project.image} alt={`${project.name} — ${project.type}`} width={900} height={506} loading="lazy" />
        <span className="project-overlay">
          <span className="project-actions">
            <span
              className="film-btn film-btn-primary"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/watch/${slug}?kind=film`;
              }}
            >
              <Play size={13} /> Watch now
            </span>
            <span
              className="film-btn film-btn-ghost"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTrailer(slug);
              }}
            >
              <Play size={13} /> Trailer
            </span>
          </span>
        </span>
      </span>
      <span className="project-label">
        <strong>{project.name}</strong>
      </span>
    </Link>
  );
}

function Index() {
  const projectRailRef = useRef<HTMLDivElement>(null);
  const upcomingRailRef = useRef<HTMLDivElement>(null);
  const [activeFilm, setActiveFilm] = useState<number | null>(null);
  const [trailerSlug, setTrailerSlug] = useState<string | null>(null);

  const scrollRail = (rail: HTMLDivElement | null, direction: -1 | 1) => {
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth, behavior: "smooth" });
  };

  const scrollProjects = (direction: -1 | 1) => scrollRail(projectRailRef.current, direction);

  return (
    <main id="home">
      <SiteHeader />

      <section className="cover" aria-labelledby="hero-title">
        <img
          className="cover-image"
          src={hassanImage.url}
          alt="Hassan Mageye, writer, director and producer"
          width={1600}
          height={1000}
        />
        <div className="cover-inner">
          <p className="eyebrow cover-eyebrow">Hi, I’m Hassan</p>
          <h1 id="hero-title">Ugandan/American writer, director and producer.</h1>
          <nav className="cover-menu" aria-label="Page sections">
            {heroMenu.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="home-about" id="about" aria-labelledby="about-title">
        <p className="eyebrow">About Mageye</p>
        <h2 id="about-title">African stories, told with heart.</h2>
        <p className="home-about-text">
          Hassan Mageye is a Ugandan/American writer, director and producer whose filmmaking career
          spans more than a decade. He studied Mass Communication at Makerere University and moved
          from an early interest in journalism toward filmmaking.
        </p>
        <p className="home-about-text">
          His work has focused on African stories, cultural identity, social themes and
          character-driven drama. Hassan currently resides in California.
        </p>
        <Link className="button button-dark" to="/about">More about Hassan</Link>
      </section>

      <section className="portfolio-section" id="portfolio">
        <h2 className="portfolio-title">Watch movies here</h2>
        <div className="project-carousel">
          <button className="carousel-arrow carousel-arrow-left" type="button" aria-label="Previous films" onClick={() => scrollProjects(-1)}>
            <ChevronLeft size={24} />
          </button>
          <div className="project-grid" id="portfolio-grid" ref={projectRailRef}>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                slug={project.slug}
                index={index}
                activeIndex={activeFilm}
                onActivate={setActiveFilm}
                onTrailer={setTrailerSlug}
              />
            ))}
            <Link className="more-card" to="/films" aria-label="See all films">
                <span className="more-thumb" aria-hidden="true">
                  <Play size={22} />
                </span>
                <span className="project-label">
                  <strong>More films</strong>
                </span>
            </Link>
          </div>
          <button className="carousel-arrow carousel-arrow-right" type="button" aria-label="Next films" onClick={() => scrollProjects(1)}>
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      <section className="upcoming-section" id="upcoming" aria-labelledby="upcoming-title">
        <p className="eyebrow">What’s next</p>
        <h2 id="upcoming-title">Upcoming projects</h2>
        <div className="upcoming-carousel">
          <button className="carousel-arrow carousel-arrow-left rail-arrow" type="button" aria-label="Previous upcoming projects" onClick={() => scrollRail(upcomingRailRef.current, -1)}>
            <ChevronLeft size={20} />
          </button>
          <div className="upcoming-grid" ref={upcomingRailRef}>
            {upcomingProjects.map((project) => (
              <article className="upcoming-card" key={project.name}>
                <span className="upcoming-thumb">
                  <img
                    src={project.image.url}
                    alt={`${project.name} — upcoming film still`}
                    width={900}
                    height={506}
                    loading="lazy"
                  />
                  <span className="upcoming-status">{project.status}</span>
                  <a className="upcoming-details" href="#contact">Details</a>
                </span>
                <span className="project-label">
                  <strong>{project.name}</strong>
                  <span className="upcoming-date">{project.date}</span>
                </span>
              </article>
            ))}
          </div>
          <button className="carousel-arrow carousel-arrow-right rail-arrow" type="button" aria-label="Next upcoming projects" onClick={() => scrollRail(upcomingRailRef.current, 1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="services-section services-intro-section" id="services">
        <div className="services-intro">
          <p className="eyebrow">What we do</p>
          <h2 id="services-title">Services</h2>
          <p className="services-lede">
            Planning to shoot a film, documentary, commercial, music video or other production in
            Africa or Santa Rosa, California? We can help coordinate the local support you need to
            get your production moving.
          </p>
          <a className="button button-dark" href="#contact">Plan your shoot</a>
        </div>
      </section>

      <section className="services-section services-cards-section">
        <div className="services">
          {services.map(({ icon: Icon, title, text }) => (
            <article className="service" key={title}>
              <Icon aria-hidden="true" size={30} strokeWidth={1.35} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
        <p className="eyebrow">In pictures</p>
        <h2 id="gallery-title">Gallery</h2>
        <div className="gallery-grid">
          {gallery.map((item) => (
            <figure className="gallery-item" key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="awards-section" id="media" aria-labelledby="media-title">
        <p className="eyebrow">Recognition</p>
        <h2 id="media-title">Media and news</h2>
        <p className="awards-text">
          Awards and winnings from festivals across Africa and the United States.
        </p>
        <div className="awards-grid">
          {awards.map((award) => (
            <article className="award-card" key={award.title}>
              <strong>{award.title}</strong>
              <span>{award.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="contact-section"
        id="contact"
        style={{ "--contact-bg": `url(${contactBackground.url})` } as React.CSSProperties}
      >
        <BriefcaseBusiness size={28} strokeWidth={1.3} aria-hidden="true" />
        <p className="eyebrow">Contact us</p>
        <h2>Let’s create something<br />that matters.</h2>
        <p className="contact-lede">
          For film screenings, distribution, press, partnerships, and production inquiries.
        </p>
        <a className="button button-light-on-dark" href="mailto:mageyeglobalworks@gmail.com">Contact us</a>
      </section>

      <PlayerModal
        slug={trailerSlug}
        title={trailerSlug ? getFilm(trailerSlug)?.name : undefined}
        poster={trailerSlug ? getFilm(trailerSlug)?.image : undefined}
        onClose={() => setTrailerSlug(null)}
      />

      <SiteFooter />
    </main>
  );
}
