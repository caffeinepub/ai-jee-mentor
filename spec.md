# AI JEE Mentor

## Current State
Full-stack JEE prep platform with animated hero, AI solver, dashboard, practice, subjects, and future sections. Heavy CSS animations (word-reveal with clip-path, magnetic buttons, backdrop-filter blur on glass cards), no lazy loading of sections, AdSense loaded synchronously, scroll progress bar running on every scroll event.

## Requested Changes (Diff)

### Add
- React.lazy + Suspense for all non-critical sections (DashboardSection, SubjectsSection, FeaturesSection, PracticeSection, FutureSection, MarqueeStrip)
- `loading="lazy"` on all img tags
- "Generating..." label on AI solve button during processing

### Modify
- Remove MagneticButton (expensive mousemove tracking) → plain Button
- Remove word-reveal clip-path animation → simple fade-in
- Remove count-up number animations → static display
- Remove backdrop-filter: blur() from glass-card and nav-blur (expensive on low-end mobile)
- Remove blur filter from FutureSection decorative elements
- Simplify index.css: remove heavy keyframes (word-reveal clip-path, solution-step delays)
- Remove scrollProgress bar from Navbar (reduces per-frame work on scroll)
- Change button label from "Solving..." to "Generating..."
- Ensure AdSense script stays async/non-blocking
- Add descriptive page title to index.html

### Remove
- useCountUp hook and count-up animation from HeroSection
- MagneticButton component
- Heavy clip-path animation from word-reveal
- backdrop-filter: blur from glass-card (replace with solid semi-transparent bg)
- scrollProgress state and tracking from Navbar

## Implementation Plan
1. Update index.css: simplify animations, remove backdrop-filter, remove heavy keyframes
2. Update App.tsx: add React.lazy + Suspense for non-critical sections
3. Update HeroSection.tsx: remove MagneticButton and count-up, simplify to static stats
4. Update Navbar.tsx: remove scroll progress bar
5. Update SolverSection.tsx: change label to "Generating..."
6. Update FutureSection.tsx: remove blur filter
7. Update index.html: add page title
