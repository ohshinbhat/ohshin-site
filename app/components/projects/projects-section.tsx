import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import {
  layout,
  styleUnlessReduced,
  surfaces,
  textStyles,
} from "../../config/ui";
import type {
  SiteReachOutSection,
  ReachStat,
  SiteProjectsSection,
  SiteWorkExperienceSection,
} from "../../types";
import { cn } from "../../utils/cn";
import ProjectCard from "./project-card";
import ReachOutSection from "./reach-out-section";
import ReachStrip from "./reach-strip";
import WorkExperienceColumn from "./work-experience-column";
import WorkClock from "./work-clock";
import GlassSheen from "../ui/glass-sheen";
import SectionHeadingRow from "../ui/section-heading-row";

interface ProjectsSectionProps {
  projects: SiteProjectsSection;
  reachOut: SiteReachOutSection;
  reachStats: ReachStat[];
  workExperience: SiteWorkExperienceSection;
}

export default function ProjectsSection({
  projects,
  reachOut,
  reachStats,
  workExperience,
}: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 30,
    mass: 0.42,
    restDelta: 0.001,
  });
  const ambientY = useTransform(smoothProgress, [0, 0.5, 1], [90, 0, -110]);
  const ambientOpacity = useTransform(
    smoothProgress,
    [0, 0.45, 1],
    [0.18, 0.34, 0.14],
  );
  const headerY = useTransform(smoothProgress, [0, 0.35, 1], [28, 0, -42]);
  const headerScale = useTransform(
    smoothProgress,
    [0, 0.38, 1],
    [0.996, 1, 1.006],
  );
  const reachY = useTransform(smoothProgress, [0, 0.5, 1], [34, 0, -22]);
  const experienceY = useTransform(smoothProgress, [0, 0.58, 1], [22, 0, -14]);
  const projectsY = useTransform(smoothProgress, [0, 0.58, 1], [36, 0, -28]);
  const reachOutY = useTransform(smoothProgress, [0, 0.72, 1], [34, 0, -18]);
  const ambientReverseY = useTransform(ambientY, (value) => value * -0.52);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative isolate min-h-screen overflow-hidden bg-accent text-fog [--ledger-accent:#D3170A]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-24 -z-10 h-[34rem] w-[34rem] rounded-full bg-white/12 blur-3xl will-change-transform"
        style={styleUnlessReduced(reducedMotion, {
          opacity: ambientOpacity,
          y: ambientY,
        })}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[44rem] -z-10 h-[38rem] w-[38rem] rounded-full bg-theme-black/20 blur-3xl will-change-transform"
        style={styleUnlessReduced(reducedMotion, {
          opacity: ambientOpacity,
          y: ambientReverseY,
        })}
      />
      <div className={`${layout.pageContainer} relative z-10`}>
        <motion.div
          className="will-change-transform"
          style={styleUnlessReduced(reducedMotion, {
            scale: headerScale,
            y: headerY,
          })}
        >
          <header className={surfaces.workHeader}>
            <GlassSheen className="left-[-35%] bg-white/[0.045] motion-safe:[animation-delay:-2.4s] motion-safe:[animation-duration:10.2s]" />
            <div className={textStyles.headerMeta}>
              <p className="text-white">
                work / output
              </p>
              <p className="hidden text-center sm:block">scroll / inspect</p>
              <p className="sm:text-right">
                <WorkClock /> IST
              </p>
            </div>

            <div className="pt-16 lg:pt-20">
              <p className={textStyles.sectionKicker}>
                selected systems and shipped interfaces
              </p>
              <h1 className={textStyles.displayTitle}>
                work
              </h1>
            </div>
          </header>
        </motion.div>

        <motion.div
          className="motion-safe:animate-work-reveal py-10 will-change-transform [animation-delay:300ms] lg:py-12"
          style={styleUnlessReduced(reducedMotion, { y: reachY })}
        >
          <ReachStrip stats={reachStats} />
        </motion.div>

        <div className="grid gap-8 py-4 lg:grid-cols-[minmax(18rem,0.56fr)_minmax(0,1fr)] lg:gap-8 lg:py-6">
          <motion.aside
            className="motion-safe:animate-work-reveal min-w-0 will-change-transform [animation-delay:260ms]"
            style={styleUnlessReduced(reducedMotion, { y: experienceY })}
          >
            <WorkExperienceColumn
              title={workExperience.sectionTitle}
              items={workExperience.items}
            />
          </motion.aside>

          <motion.main
            className="motion-safe:animate-work-reveal min-w-0 will-change-transform [animation-delay:340ms]"
            style={styleUnlessReduced(reducedMotion, { y: projectsY })}
          >
            <div className={cn(surfaces.workPanel, "motion-safe:[animation-delay:-6.2s] motion-safe:[animation-duration:13.4s]")}>
              <GlassSheen className="left-[-45%] bg-white/[0.035] motion-safe:[animation-delay:-4.8s] motion-safe:[animation-duration:11.6s]" />
              <SectionHeadingRow
                label="build log"
                labelClassName={textStyles.accentLabel}
                title={projects.sectionTitle}
                titleClassName={textStyles.panelTitle}
              />

              <div className="mt-6 grid gap-3">
                {projects.items.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    revealIndex={index}
                    serial={String(index + 1).padStart(2, "0")}
                  />
                ))}
              </div>
            </div>
          </motion.main>
        </div>

        <motion.div
          className="motion-safe:animate-work-reveal py-8 will-change-transform [animation-delay:420ms] lg:py-10"
          style={styleUnlessReduced(reducedMotion, { y: reachOutY })}
        >
          <ReachOutSection content={reachOut} />
        </motion.div>
      </div>
    </section>
  );
}
