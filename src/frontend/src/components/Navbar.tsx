import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Subjects", href: "#subjects" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Solver", href: "#solver" },
  { label: "Practice", href: "#practice" },
  { label: "Future", href: "#future" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur" : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[1px] transition-all duration-150 ease-out pointer-events-none"
        style={{
          width: `${scrollProgress}%`,
          background: "oklch(0.85 0.008 250)",
        }}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 flex-shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 rounded-sm bg-white/8 border border-white/10 flex items-center justify-center">
            <Brain className="w-4 h-4 text-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            AI JEE Mentor
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <button
              type="button"
              key={link.href}
              data-ocid={`nav.link.${i + 1}`}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side: status pill + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="status-pill hidden sm:flex">
            <span className="status-dot" />
            AI · Online
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden nav-blur border-t border-border/50 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <button
              type="button"
              key={link.href}
              data-ocid={`nav.link.${i + 1}`}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 px-3">
            <div className="status-pill inline-flex">
              <span className="status-dot" />
              AI · Online
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
