import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Word-by-word headline split
const HEADLINE_WORDS = [
  "Your",
  "Personal",
  "AI",
  "Mentor",
  "for",
  "JEE",
  "Preparation",
];

// Stats that count up
const STATS = [
  {
    raw: 10000,
    display: "10,000+",
    label: "Questions Solved",
    countable: true,
  },
  { raw: 3, display: "3 Subjects", label: "Fully Covered", countable: false },
  {
    raw: 98,
    display: "98%",
    label: "Student Satisfaction",
    countable: true,
    suffix: "%",
  },
  { raw: 0, display: "24/7", label: "AI Availability", countable: false },
];

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return count;
}

function StatItem({
  stat,
  statsVisible,
}: {
  stat: (typeof STATS)[0];
  statsVisible: boolean;
}) {
  const count = useCountUp(stat.raw, 1400, statsVisible && stat.countable);

  let display: string;
  if (stat.countable && statsVisible) {
    if (stat.raw === 10000) {
      display = count >= 10000 ? "10,000+" : count.toLocaleString();
    } else {
      display = `${count}${stat.suffix ?? ""}`;
    }
  } else {
    display = stat.display;
  }

  return (
    <div
      className="transition-all duration-700"
      style={{
        opacity: statsVisible ? 1 : 0,
        transform: statsVisible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <div className="text-2xl font-display font-bold text-foreground">
        {display}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5 font-mono">
        {stat.label}
      </div>
    </div>
  );
}

function MagneticButton({
  children,
  className,
  onClick,
  variant,
  "data-ocid": dataOcid,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  "data-ocid"?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
  };

  return (
    <div
      ref={ref}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.1s ease" }}
    >
      <Button
        data-ocid={dataOcid}
        size="lg"
        variant={variant}
        className={className}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
}

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.18 0.01 250 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.18 0.01 250 / 0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Powered by Advanced AI · JEE Main &amp; Advanced
            </span>
          </div>

          {/* Headline — word-by-word reveal */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground">
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={word}
                className="word-reveal inline-block mr-[0.25em]"
                style={{ animationDelay: `${0.08 * i + 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            Upload questions, understand concepts, and master{" "}
            <span className="text-foreground font-medium">
              Physics, Chemistry, and Mathematics
            </span>{" "}
            with step-by-step AI guidance.
          </p>

          {/* CTAs — Magnetic */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: "0.9s", opacity: 0 }}
          >
            <MagneticButton
              data-ocid="hero.primary_button"
              className="bg-foreground text-background hover:bg-foreground/90 font-semibold text-base px-8 h-12 group"
              onClick={() => scrollTo("#solver")}
            >
              Start Solving Questions
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              data-ocid="hero.secondary_button"
              variant="outline"
              className="border-border hover:border-white/40 hover:bg-white/5 text-foreground font-semibold text-base px-8 h-12"
              onClick={() => scrollTo("#features")}
            >
              Explore Features
            </MagneticButton>
          </div>

          {/* Stats with count-up */}
          <div
            ref={statsRef}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-border"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} style={{ transitionDelay: `${i * 120}ms` }}>
                <StatItem stat={stat} statsVisible={statsVisible} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
