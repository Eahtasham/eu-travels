"use client";

import {
  ArrowUpRight,
  Compass,
  Globe,
  Plane,
  Shield,
  Headphones,
  Calendar,
} from 'lucide-react';
import ScrollVideo from '../components/ScrollVideo';
import Reveal from '../components/Reveal';

const services = [
  {
    icon: Compass,
    title: 'Customized packages',
    body: 'Trips designed completely around your personal interests and travel preferences.',
  },
  {
    icon: Plane,
    title: 'Flight & hotel booking',
    body: 'Seamless, hassle-free reservations at top-rated hotels and major airlines worldwide.',
  },
  {
    icon: Globe,
    title: 'Guided tours',
    body: 'Explore breathtaking locations alongside friendly, local expert guides.',
  },
  {
    icon: Shield,
    title: 'Visa assistance',
    body: 'Smooth, stress-free documentation and application support for any destination.',
  },
  {
    icon: Headphones,
    title: '24/7 support',
    body: "We're with you at every step, ensuring safe and worry-free travels.",
  },
];

const destinations = [
  {
    country: 'France',
    title: 'Romantic city of love and lights',
    body: 'Explore iconic landmarks, elegant fashion, and historic streets.',
    hue: 'from-rose-300/40',
  },
  {
    country: 'Indonesia',
    title: 'Serene tropical beach paradise',
    body: 'Relax by pristine turquoise waters, surf, and discover ancient temples.',
    hue: 'from-emerald-300/40',
  },
  {
    country: 'UAE',
    title: 'Futuristic luxury & desert gold',
    body: 'Experience high-rise architecture, luxury shopping, and desert dunes.',
    hue: 'from-amber-300/40',
  },
  {
    country: 'Switzerland',
    title: 'Alpine heights and scenic peaks',
    body: 'Travel through scenic railway lines and hike across majestic ranges.',
    hue: 'from-sky-300/40',
  },
  {
    country: 'Asia',
    title: 'Vibrant land of heritage & colors',
    body: 'Discover historical forts, spiritual landmarks, and rich cultural traditions.',
    hue: 'from-orange-300/40',
  },
];

const testimonials = [
  {
    quote: 'An absolutely seamless experience! Everything was perfectly planned from start to finish.',
    name: 'Aisha Khan',
    role: 'Adventure Traveler',
    initials: 'AK',
  },
  {
    quote: "The best travel company I've ever used. Highly recommended for custom individual itineraries.",
    name: 'Rahul Sharma',
    role: 'Family Explorer',
    initials: 'RS',
  },
  {
    quote: 'From booking to return, everything was smooth and stress-free. Support was active even at midnight!',
    name: 'Emily Watson',
    role: 'Luxury Escapist',
    initials: 'EW',
  },
  {
    quote: 'Unforgettable adventures and absolute luxury. Their attention to detail and curated spots are unmatched.',
    name: 'Marcus Vance',
    role: 'Luxury Voyager',
    initials: 'MV',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-black/10 selection:text-black">
      {/* Scroll-scrubbed video background (crisp, full-res, 30fps grid) */}
      <ScrollVideo />

      {/* Top scrim — keeps the header legible across every frame of the sequence
          (dark cabin at the hero, bright clouds mid-scroll). */}
      <div
        aria-hidden
        className="header-scrim pointer-events-none fixed inset-x-0 top-0 z-40 h-28 md:h-32"
      />

      {/* Fixed sticky header navigation */}
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-400 items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#hero"
          aria-label="EU Travels — back to top"
          className="focus-ring group flex select-none items-center gap-2.5 rounded-full text-lg font-bold tracking-[0.16em] text-white text-glow md:text-xl"
        >
          <Compass className="h-5 w-5 animate-spin-slow text-white/90 md:h-6 md:w-6" />
          <span>EU TRAVELS</span>
        </a>

        {/* Center: frosted-glass nav. Light surface + dark text stays legible on
            any frame behind it, no matter how the sky shifts. */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/50 bg-white/70 p-1.5 shadow-[0_10px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl md:flex">
          <a
            href="#hero"
            aria-current="page"
            className="focus-ring rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="focus-ring rounded-full px-5 py-2 text-sm font-medium text-black/70 transition-colors duration-300 hover:bg-black/5 hover:text-black"
          >
            About
          </a>
          <a
            href="#services"
            className="focus-ring rounded-full px-5 py-2 text-sm font-medium text-black/70 transition-colors duration-300 hover:bg-black/5 hover:text-black"
          >
            Services
          </a>
          <a
            href="#destinations"
            className="focus-ring rounded-full px-5 py-2 text-sm font-medium text-black/70 transition-colors duration-300 hover:bg-black/5 hover:text-black"
          >
            Destinations
          </a>
          <a
            href="#testimonials"
            className="focus-ring rounded-full px-5 py-2 text-sm font-medium text-black/70 transition-colors duration-300 hover:bg-black/5 hover:text-black"
          >
            Testimonials
          </a>
        </nav>

        {/* Primary action — self-contained dark pill, legible on every frame. */}
        <a
          href="#services"
          className="focus-ring group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-neutral-900 hover:shadow-[0_14px_34px_rgba(0,0,0,0.4)] md:px-5 md:py-2.5"
        >
          <span>Plan your journey</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </header>

      {/* Main Sections Wrapper */}
      <main className="relative w-full z-10">

        {/* SECTION 1: HERO — the view from the window. Serene, elevated,
            first-class. Black copy over the bright sky, lifted by an owned
            luminous scrim so it stays legible on every frame. */}
        <section
          id="hero"
          className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-24 md:px-12"
        >
          {/* Luminous scrim behind the copy: light streaming through the window. */}
          <div
            aria-hidden
            className="hero-halo pointer-events-none absolute left-1/2 top-1/2 h-[min(660px,74vh)] w-[min(900px,92vw)] -translate-x-1/2 -translate-y-[54%]"
          />

          <div className="relative z-10 mx-auto flex max-w-[30rem] flex-col items-center text-center sm:max-w-[34rem]">
            {/* One deliberate kicker — not a per-section eyebrow. */}
            <div
              className="hero-reveal mb-7 flex items-center gap-3 text-black/65 text-glow-light"
              style={{ animationDelay: '60ms' }}
            >
              <span aria-hidden className="h-px w-8 bg-black/25" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] md:text-xs">
                The art of elevated travel
              </span>
              <span aria-hidden className="h-px w-8 bg-black/25" />
            </div>

            {/* Narrow, stacked column — reads inside the window opening rather
                than spanning past its edges onto the cabin wall. */}
            <h1
              className="hero-reveal-headline mx-auto max-w-[13ch] font-display text-balance text-[clamp(2.5rem,7.5vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.01em] text-black text-glow-light sm:max-w-[15ch]"
              style={{ animationDelay: '140ms' }}
            >
              Explore the world, beyond limits
            </h1>

            <p
              className="hero-reveal mt-7 max-w-[24rem] text-pretty text-base leading-relaxed text-black/80 text-glow-light sm:max-w-[26rem] md:text-lg"
              style={{ animationDelay: '340ms' }}
            >
              Discover breathtaking destinations, seamless journeys, and
              unforgettable experiences — crafted just for you.
            </p>

            <div
              className="hero-reveal mt-10 flex flex-col items-center gap-4 sm:flex-row"
              style={{ animationDelay: '480ms' }}
            >
              <a
                href="#services"
                className="focus-ring group inline-flex items-center justify-center gap-2.5 rounded-full bg-black px-8 py-4 text-base font-semibold text-white shadow-[0_16px_44px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-neutral-900 hover:shadow-[0_20px_52px_rgba(0,0,0,0.45)] active:translate-y-0"
              >
                <span>Plan your journey</span>
                <Calendar className="h-[18px] w-[18px]" />
              </a>
              <a
                href="#destinations"
                className="focus-ring group inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-black/85 transition-colors duration-300 hover:text-black"
              >
                <span className="relative">
                  Explore destinations
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-black/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </span>
                <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Distilled proof — replaces the two magic-transform glass cards. */}
            <dl
              className="hero-reveal mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-black text-glow-light max-w-[25rem]"
              style={{ animationDelay: '640ms' }}
            >
              <div className="flex items-baseline gap-2">
                <dd className="font-display text-2xl leading-none md:text-[26px]">120+</dd>
                <dt className="text-xs font-medium tracking-wide text-black/60 md:text-sm">countries</dt>
              </div>
              <span aria-hidden className="hidden h-7 w-px bg-black/15 sm:block" />
              <div className="flex items-baseline gap-2">
                <dd className="font-display text-2xl leading-none md:text-[26px]">75K+</dd>
                <dt className="text-xs font-medium tracking-wide text-black/60 md:text-sm">travelers</dt>
              </div>
            </dl>
          </div>

          {/* Scroll cue — a gentle drifting mark. Reduced-motion safe. */}
          <a
            href="#about"
            aria-label="Scroll to explore"
            className="focus-ring hero-reveal group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-black/55 transition-colors duration-300 hover:text-black/80"
            style={{ animationDelay: '900ms' }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-glow-light">
              Scroll
            </span>
            <span aria-hidden className="relative block h-9 w-px overflow-hidden bg-black/15">
              <span className="scroll-cue-dot absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-black/70" />
            </span>
          </a>
        </section>


        {/* SECTION 2: ABOUT — no eyebrow (the hero already owns that motif);
            this section signals itself with the divider rule instead. */}
        <section id="about" className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
          <div className="grid w-full max-w-350 grid-cols-1 items-center gap-y-14 gap-x-12 lg:grid-cols-12">
            <Reveal className="flex flex-col items-start text-left text-black lg:col-span-5">
              <h2 className="font-display text-balance text-[clamp(2.1rem,4.4vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.01em] text-glow-light">
                Who we are
              </h2>
              <span aria-hidden className="mt-6 mb-6 h-1 w-16 rounded-full bg-black" />
              <p className="max-w-[38ch] text-base leading-relaxed text-black/75 text-glow-light md:text-lg">
                We design premium travel experiences tailored to the modern
                explorer. From our airplane window to your next bucket-list
                destination, we&rsquo;re with you all the way.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-7">
              <div className="glass-panel flex flex-col gap-6 rounded-[28px] p-8 text-black transition-transform duration-300 ease-out hover:-translate-y-1 md:p-10">
                <p className="text-lg leading-relaxed font-medium text-glow-light md:text-xl">
                  &ldquo;We are passionate travel creators dedicated to turning
                  your journeys into unforgettable stories. With years of
                  experience and a deep love for exploration, we design
                  travel experiences that combine comfort, adventure, and
                  authenticity.&rdquo;
                </p>
                <p className="border-t border-black/10 pt-6 text-base leading-relaxed text-black/75 text-glow-light md:text-lg">
                  From luxury escapes to budget-friendly adventures, our
                  mission is simple: help you see the world in the most
                  inspiring way possible.
                </p>
              </div>
            </Reveal>
          </div>
        </section>


        {/* SECTION 3: SERVICES — identity carried by the heading + dek,
            no repeated eyebrow. Auto-fit grid: 5 cards reflow cleanly at any
            width instead of stranding an orphan card on a fixed breakpoint. */}
        <section id="services" className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
          <div className="w-full max-w-350">
            <Reveal className="mb-14 max-w-[46ch] text-black md:mb-16">
              <h2 className="font-display text-balance text-[clamp(2.1rem,4.4vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.01em] text-glow-light">
                What we offer
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/75 text-glow-light md:text-lg">
                Every journey starts with the right support — from the first
                itinerary sketch to the moment you land back home.
              </p>
            </Reveal>

            <Reveal
              stagger
              className="grid gap-6 text-black"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
            >
              {services.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="glass-panel-tight flex flex-col justify-between rounded-3xl p-6 transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/25 text-black">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-glow-light">{title}</h3>
                    <p className="text-sm leading-relaxed text-black/75 text-glow-light">{body}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Learn more about ${title}`}
                    className="focus-ring mt-6 flex w-fit items-center gap-1 rounded-full text-xs font-semibold uppercase tracking-wider text-black/55 transition-colors hover:text-black"
                  >
                    <span>Learn more</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* SECTION 4: DESTINATIONS — per-card hue is a corner glow now, not
            an opaque wash, so the video reads through the rest of the card. */}
        <section id="destinations" className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 pb-32">
          <div className="w-full max-w-350">
            <Reveal className="mb-14 text-center text-black md:mb-16">
              <h2 className="mx-auto font-display text-balance text-[clamp(2.1rem,4.4vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.01em] text-glow-light">
                Top destinations
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black/75 text-glow-light md:text-lg">
                From iconic landmarks to hidden gems, explore destinations
                that inspire wanderlust.
              </p>
            </Reveal>

            <Reveal
              stagger
              className="grid gap-6 text-black lg:[&>*:nth-child(even)]:mt-10"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
            >
              {destinations.map(({ country, title, body, hue }) => (
                <div
                  key={country}
                  className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl glass-panel-tight p-8 transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-linear-to-br ${hue} to-transparent opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-90`}
                  />
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="mb-6 rounded-full border border-black/10 bg-white/35 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-black/70 text-glow-light">
                      {country}
                    </span>
                    <h3 className="mb-3 font-display text-xl leading-tight text-black text-glow-light md:text-2xl">
                      {title}
                    </h3>
                  </div>
                  <p className="relative z-10 text-sm leading-relaxed text-black/75 text-glow-light">
                    {body}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>


        {/* SECTION 5: TESTIMONIALS — the quote glyph is the section's motif
            instead of an eyebrow. Avatars are solid black, not gradients. */}
        <section id="testimonials" className="relative w-full min-h-screen flex flex-col justify-between px-6 md:px-12 py-24">
          <div className="mx-auto flex w-full max-w-350 flex-1 flex-col justify-center">
            <Reveal className="mb-14 text-center text-black md:mb-16">
              <h2 className="mx-auto font-display text-balance text-[clamp(2.1rem,4.4vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.01em] text-glow-light">
                What our travelers say
              </h2>
            </Reveal>

            <Reveal
              stagger
              className="mx-auto grid w-full max-w-350 grid-cols-1 gap-y-10 text-black sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:gap-x-12 lg:gap-y-24"
            >
              {testimonials.map(({ quote, name, role, initials }, i) => (
                <div
                  key={name}
                  className={`glass-panel-tight flex w-full flex-col justify-between rounded-3xl p-6 transition-transform duration-300 ease-out hover:-translate-y-1 sm:max-w-[min(340px,42vw)] ${
                    i % 2 === 0 ? 'sm:justify-self-start' : 'sm:justify-self-end'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <span aria-hidden className="font-display text-4xl leading-none text-black/25">
                      &ldquo;
                    </span>
                    <p className="text-base leading-relaxed text-black/85 text-glow-light">
                      {quote}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 border-t border-black/10 pt-4">
                    <div
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white"
                    >
                      {initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-black text-glow-light">{name}</h4>
                      <span className="text-xs text-black/60 text-glow-light">{role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Footer — black text + halo, robust against the bright end-of-scroll
              frames (clouds / Taj Mahal), not tuned to a single dark assumption. */}
          <footer className="mx-auto mt-16 flex w-full max-w-350 flex-col items-center gap-4 border-t border-black/10 pt-8 pb-4 text-xs text-black/60 text-glow-light md:flex-row md:justify-between">
            <div>© {new Date().getFullYear()} EU Travels. All rights reserved.</div>
            <div className="flex gap-6">
              <button type="button" className="focus-ring rounded transition-colors hover:text-black">
                Privacy Policy
              </button>
              <button type="button" className="focus-ring rounded transition-colors hover:text-black">
                Terms of Service
              </button>
              <button type="button" className="focus-ring rounded transition-colors hover:text-black">
                Cookies
              </button>
            </div>
          </footer>
        </section>

      </main>
    </div>
  );
}
