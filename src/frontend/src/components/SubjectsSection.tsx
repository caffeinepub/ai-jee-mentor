import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const subjects = {
  physics: [
    {
      category: "Mechanics",
      topics: [
        "Kinematics",
        "Laws of Motion",
        "Work, Energy & Power",
        "Rotational Mechanics",
        "Gravitation",
      ],
    },
    {
      category: "Waves & Oscillations",
      topics: [
        "Simple Harmonic Motion",
        "Wave Motion",
        "Sound Waves",
        "Standing Waves",
      ],
    },
    {
      category: "Thermodynamics",
      topics: [
        "Kinetic Theory",
        "Laws of Thermodynamics",
        "Heat Transfer",
        "Thermal Expansion",
      ],
    },
    {
      category: "Electromagnetism",
      topics: [
        "Electrostatics",
        "Current Electricity",
        "Magnetic Effects",
        "Electromagnetic Induction",
        "AC Circuits",
      ],
    },
    {
      category: "Optics",
      topics: ["Ray Optics", "Wave Optics", "Interference", "Diffraction"],
    },
    {
      category: "Modern Physics",
      topics: [
        "Photoelectric Effect",
        "Atomic Models",
        "Nuclear Physics",
        "Semiconductors",
      ],
    },
  ],
  chemistry: [
    {
      category: "Physical Chemistry",
      topics: [
        "Atomic Structure",
        "Chemical Bonding",
        "Thermodynamics",
        "Equilibrium",
        "Electrochemistry",
        "Chemical Kinetics",
        "Solutions",
      ],
    },
    {
      category: "Organic Chemistry",
      topics: [
        "Hydrocarbons",
        "Haloalkanes",
        "Alcohols & Ethers",
        "Carbonyl Compounds",
        "Reactions & Mechanisms",
        "Biomolecules",
        "Polymers",
      ],
    },
    {
      category: "Inorganic Chemistry",
      topics: [
        "Periodic Table",
        "s-Block Elements",
        "p-Block Elements",
        "d-Block Elements",
        "Coordination Chemistry",
        "Metallurgy",
      ],
    },
  ],
  mathematics: [
    {
      category: "Algebra",
      topics: [
        "Complex Numbers",
        "Matrices & Determinants",
        "Sequences & Series",
        "Permutation & Combination",
        "Probability",
        "Quadratic Equations",
      ],
    },
    {
      category: "Calculus",
      topics: [
        "Limits & Continuity",
        "Differentiation",
        "Applications of Derivatives",
        "Integration",
        "Definite Integrals",
        "Differential Equations",
      ],
    },
    {
      category: "Coordinate Geometry",
      topics: ["Straight Lines", "Circles", "Parabola", "Ellipse", "Hyperbola"],
    },
    {
      category: "Trigonometry",
      topics: [
        "Trigonometric Identities",
        "Inverse Trig Functions",
        "Height & Distance",
      ],
    },
    {
      category: "Vectors & 3D Geometry",
      topics: ["Vectors", "3D Coordinates", "Lines & Planes in 3D"],
    },
  ],
};

export default function SubjectsSection() {
  return (
    <section id="subjects" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <span className="text-xs font-medium text-primary">
              Complete Syllabus
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            All Subjects <span className="text-gradient">Fully Covered</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every topic from JEE Main and Advanced syllabus, organised for
            systematic preparation.
          </p>
        </div>

        <Tabs defaultValue="physics">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-10 bg-muted/50">
            <TabsTrigger data-ocid="subjects.tab.1" value="physics">
              ⚡ Physics
            </TabsTrigger>
            <TabsTrigger data-ocid="subjects.tab.2" value="chemistry">
              🧪 Chemistry
            </TabsTrigger>
            <TabsTrigger data-ocid="subjects.tab.3" value="mathematics">
              📐 Mathematics
            </TabsTrigger>
          </TabsList>

          {(["physics", "chemistry", "mathematics"] as const).map((subject) => (
            <TabsContent key={subject} value={subject}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects[subject].map((group) => (
                  <div
                    key={group.category}
                    className="glass-card rounded-xl p-5"
                  >
                    <h3 className="font-display font-bold text-base text-primary mb-3">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-xs bg-secondary/60 text-secondary-foreground hover:bg-primary/20 hover:text-primary cursor-default transition-colors"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
