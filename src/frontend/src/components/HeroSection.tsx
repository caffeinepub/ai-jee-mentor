import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

const FORMULAS = [
  "∫f(x)dx",
  "E=mc²",
  "F=ma",
  "∑xᵢ",
  "H₂O",
  "∇²ψ=0",
  "PV=nRT",
  "sin²θ+cos²θ=1",
  "d/dx(eˣ)=eˣ",
  "CH₄",
  "λν=c",
  "ΔG=ΔH-TΔS",
  "v=u+at",
  "E=hν",
  "∂f/∂x",
  "det(A)",
  "lim→0",
  "NH₃",
  "∮E·dA",
  "s=½at²",
];

interface FloatingFormula {
  text: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function HeroSection() {
  const formulasRef = useRef<FloatingFormula[]>([]);

  if (formulasRef.current.length === 0) {
    formulasRef.current = FORMULAS.map((text) => ({
      text,
      left: Math.random() * 95,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 20,
      size: 0.8 + Math.random() * 0.8,
    }));
  }

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-bg">
      {/* Floating formulas */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {formulasRef.current.map((f) => (
          <span
            key={f.text}
            className="float-formula"
            style={{
              left: `${f.left}%`,
              bottom: "-5%",
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              fontSize: `${f.size}rem`,
              opacity: 0,
            }}
          >
            {f.text}
          </span>
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.28 0.04 252 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.28 0.04 252 / 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              Powered by Advanced AI · JEE Main & Advanced
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            Your Personal <span className="text-gradient">AI Mentor</span>
            <br className="hidden sm:block" /> for JEE Preparation
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            Upload questions, understand concepts, and master{" "}
            <span className="text-foreground font-medium">
              Physics, Chemistry, and Mathematics
            </span>{" "}
            with step-by-step AI guidance.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow font-semibold text-base px-8 h-12 group"
              onClick={() => scrollTo("#solver")}
            >
              Start Solving Questions
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              className="border-border/60 hover:border-primary/50 hover:bg-primary/5 text-foreground font-semibold text-base px-8 h-12"
              onClick={() => scrollTo("#features")}
            >
              Explore Features
            </Button>
          </div>

          {/* Stats */}
          <div
            className="mt-16 flex flex-wrap gap-8 animate-slide-up"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            {[
              { value: "10,000+", label: "Questions Solved" },
              { value: "3 Subjects", label: "Fully Covered" },
              { value: "98%", label: "Student Satisfaction" },
              { value: "24/7", label: "AI Availability" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
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
