import DecryptedText from "../react-bits/decrypted-text";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({
  title,
  subtitle,
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/background.webp"
          alt=""
          className="h-full w-full scale-[1.03] object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-20 text-center sm:px-6">
        <div className="relative w-full max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-72 w-[min(92vw,54rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/58 blur-[78px] sm:h-[22rem] md:h-[26rem]"
          />
          <h1 className="font-doto text-[2.25rem] leading-[1.04] font-semibold tracking-normal text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.16)] sm:text-[3.5rem] md:text-[4.75rem] lg:text-[6rem]">
            <DecryptedText
              text={title}
              speed={96}
              sequential
              animateOn="view"
              encryptedClassName="text-white/55"
            />
          </h1>
          <p className="mt-5 font-doto text-[13px] font-medium tracking-[0.1em] text-white/90 sm:mt-6 sm:text-[18px] sm:tracking-[0.14em] md:text-[24px]">
            <DecryptedText
              text={subtitle}
              speed={74}
              sequential
              animateOn="view"
              encryptedClassName="text-white/45"
            />
          </p>
        </div>
      </div>
    </section>
  );
}
