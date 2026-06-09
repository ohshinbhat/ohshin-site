import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  aboutProfileTags,
  layout,
  styleUnlessReduced,
  surfaces,
  textStyles,
} from "../../config/ui";
import type { SpotifyPlaylist } from "../../types";
import AboutCopy from "../about/about-copy";
import AboutPortrait from "../about/about-portrait";
import SpotifyShelf from "../about/spotify-shelf";
import GlassSheen from "../ui/glass-sheen";

interface AboutSectionProps {
  paragraphs: string[];
  playlists: SpotifyPlaylist[];
  booksContent: ReactNode;
}

export default function AboutSection({
  paragraphs,
  playlists,
  booksContent,
}: AboutSectionProps) {
  const aboutRef = useRef<HTMLElement | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const reducedMotion = useReducedMotion();
  const shouldDisableParallax = reducedMotion || isMobileViewport;
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 0.42, 1], [80, 0, -120]);
  const headerX = useTransform(scrollYProgress, [0, 0.65, 1], [-32, 0, 42]);
  const copyY = useTransform(scrollYProgress, [0, 0.45, 1], [90, 0, -70]);
  const portraitY = useTransform(scrollYProgress, [0, 0.5, 1], [-70, 0, 112]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.04, 1.12]);
  const portraitRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2.5, 0, 2.5]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative isolate min-h-screen-nav overflow-hidden bg-ink font-mono text-fog"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-10 [background-image:radial-gradient(rgba(255,255,255,0.52)_0.62px,transparent_0.62px)] [background-size:6px_6px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_12%,rgba(211,23,10,0.12),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.055),transparent_30%)]"
      />
      <div className={`${layout.homeContainer} relative z-10`}>
        <motion.div
          className="will-change-transform"
          style={styleUnlessReduced(shouldDisableParallax, { x: headerX, y: headerY })}
        >
          <header className={surfaces.aboutHeader}>
            <GlassSheen className="left-[-35%] bg-white/[0.045] motion-safe:[animation-delay:-5.5s] motion-safe:[animation-duration:10.8s]" />
            <div className={textStyles.headerMeta}>
              <p className="text-white/78">profile / ohshin</p>
              <p className="sm:text-right">mumbai / bengaluru, india</p>
            </div>

            <div className="pt-12 sm:pt-16 lg:pt-20">
              <h2 className={textStyles.displayTitleStandalone}>
                about
              </h2>
            </div>
          </header>
        </motion.div>

        <div className="grid gap-8 py-10 lg:py-12">
          <main className="relative isolate left-1/2 min-w-0 w-[calc(100vw-1.5rem)] max-w-[1840px] -translate-x-1/2 overflow-hidden rounded-[1.5rem] bg-white/[0.07] shadow-[0_24px_100px_rgba(0,0,0,0.42),0_0_64px_rgba(211,23,10,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/12 backdrop-blur-2xl motion-safe:animate-glass-breathe motion-safe:[animation-delay:-2.8s] motion-safe:[animation-duration:12.2s] sm:w-[calc(100vw-4rem)] sm:rounded-[2rem] lg:w-[calc(100vw-5rem)] lg:rounded-[2.35rem]">
            <GlassSheen className="left-[-42%] bg-white/[0.035] motion-safe:[animation-delay:-3.9s] motion-safe:[animation-duration:12.4s]" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 opacity-[0.08] mix-blend-screen [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <div className="grid gap-6 lg:min-h-[44rem] lg:grid-cols-[minmax(0,1fr)_minmax(26rem,0.82fr)] lg:gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(34rem,0.88fr)] xl:gap-10">
              <motion.div
                className="flex min-w-0 flex-col justify-center p-4 sm:p-7 lg:p-9 xl:p-12"
                style={styleUnlessReduced(shouldDisableParallax, { y: copyY })}
              >
                <div className="max-w-[54rem]">
                  <div className="mb-8 flex flex-wrap gap-2 font-mono text-[0.56rem] uppercase tracking-[0.22em] text-white/46">
                    {aboutProfileTags.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/[0.055] px-3 py-1 ring-1 ring-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="max-w-[72ch] text-[0.92rem] leading-[1.85] text-white/90 sm:text-[1rem]">
                    <AboutCopy paragraphs={paragraphs} />
                  </div>
                </div>
              </motion.div>

              <motion.aside
                className="order-first min-h-[22rem] sm:min-h-[34rem] lg:order-none lg:min-h-full"
                style={styleUnlessReduced(shouldDisableParallax, {
                  rotate: portraitRotate,
                  scale: portraitScale,
                  y: portraitY,
                })}
              >
                <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.25rem] bg-black/35 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:min-h-[34rem] sm:rounded-[1.65rem] lg:min-h-full">
                  <AboutPortrait />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_32%,rgba(0,0,0,0.18))]"
                  />
                </div>
              </motion.aside>
            </div>
          </main>

          <footer className="order-4 grid gap-8 lg:col-span-2 lg:grid-cols-2">
            <div className={`${surfaces.aboutFooterCard} motion-safe:[animation-delay:-5.6s] motion-safe:[animation-duration:13.1s]`}>
              <GlassSheen className="left-[-42%] bg-white/[0.032] motion-safe:[animation-delay:-7.4s] motion-safe:[animation-duration:14.2s]" />
              <SpotifyShelf playlists={playlists} />
            </div>

            <div className={`${surfaces.aboutFooterCard} motion-safe:[animation-delay:-8.2s] motion-safe:[animation-duration:12.6s]`}>
              <GlassSheen className="left-[-42%] bg-white/[0.03] motion-safe:[animation-delay:-2.2s] motion-safe:[animation-duration:13.7s]" />
              {booksContent}
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
