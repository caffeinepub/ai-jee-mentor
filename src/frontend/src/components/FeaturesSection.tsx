import { BookOpen, Brain, Calendar, Camera, Target, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Question Solver",
    description:
      "Type or upload any JEE question and receive detailed step-by-step solutions with deep conceptual explanations tailored to JEE pattern.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Camera,
    title: "Image-Based Doubt Solving",
    description:
      "Snap a photo of your textbook or worksheet. Our AI reads and solves both handwritten and printed questions instantly.",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  {
    icon: BookOpen,
    title: "Concept Explainer",
    description:
      "Understand any Physics, Chemistry, or Math concept with clear explanations, derivations, formulas, and real-world examples.",
    color: "text-chart-3",
    bg: "bg-chart-3/10 border-chart-3/20",
  },
  {
    icon: Target,
    title: "Personalized Weakness Detection",
    description:
      "AI tracks your solving patterns, identifies weak topics with precision, and recommends targeted practice to close knowledge gaps.",
    color: "text-chart-4",
    bg: "bg-chart-4/10 border-chart-4/20",
  },
  {
    icon: Zap,
    title: "Practice Question Generator",
    description:
      "Generate unlimited questions by topic, difficulty level, and exam type for laser-focused practice sessions.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Calendar,
    title: "JEE Strategy Assistant",
    description:
      "Get an AI-crafted study schedule, optimized revision cycles, and mock test strategies tailored exactly to your timeline.",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <span className="text-xs font-medium text-primary">
            Core Features
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Everything you need to{" "}
          <span className="text-gradient">crack JEE</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Six powerful AI tools designed to take you from doubt to mastery, one
          concept at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              data-ocid={`features.card.${i + 1}`}
              className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl border ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
