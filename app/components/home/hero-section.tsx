import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { styleUnlessReduced, textStyles } from "../../config/ui";
import DecryptedText from "../react-bits/decrypted-text";

// React 18 forwards this browser hint as a lowercase HTML attribute.
const heroImagePriority = { fetchpriority: "high" } as const;

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({
  title,
  subtitle,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const textY = useTransform(scrollYProgress, [0, 0.82], [0, -96]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.68], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <picture>
        <source srcSet="/background-v2.avif" type="image/avif" />
        <motion.img
          {...heroImagePriority}
          src="/background-v2.jpg"
          alt=""
          width={1672}
          height={941}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-[42%_center] motion-safe:will-change-transform sm:object-center"
          style={styleUnlessReduced(reducedMotion, {
            scale: imageScale,
            y: imageY,
          })}
        />
      </picture>
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-20 text-center sm:px-6">
        <div className="w-full max-w-5xl -translate-y-10 sm:-translate-y-20 lg:-translate-y-24">
          <motion.div
            className="relative isolate mx-auto w-fit max-w-full [text-shadow:0_1px_2px_#000,0_2px_8px_#000,0_0_20px_#000]"
            style={styleUnlessReduced(reducedMotion, {
              opacity: textOpacity,
              y: textY,
            })}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-20 -inset-y-24 -z-10 [background-image:radial-gradient(ellipse_closest-side,rgb(0_0_0_/_0.62),rgb(0_0_0_/_0.49)_35%,rgb(0_0_0_/_0.21)_66%,rgb(0_0_0_/_0.04)_88%,transparent)] sm:-inset-x-44 sm:-inset-y-28"
            />
            <h1 className={textStyles.heroTitle}>
              <DecryptedText
                text={title}
                speed={96}
                sequential
                animateOn="view"
                encryptedClassName="text-white/55"
              />
            </h1>
            <p className={textStyles.heroSubtitle}>
              <DecryptedText
                text={subtitle}
                speed={74}
                sequential
                animateOn="view"
                encryptedClassName="text-white/45"
              />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
