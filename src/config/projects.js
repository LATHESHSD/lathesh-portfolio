export const projectsConfig = {
  pageTitle: "My",
  pageTitleAccent: "Projects",
  pageDescription:
    "A selection of projects I've built — from mobile apps to full-stack web platforms.",
  projects: [
    {
      id: "matru-sneh",
      title: "Matru-Sneh",
      subtitle: "Maternal Health Mobile App",
      description:
        "Cross-platform React Native app for pregnancy tracking and maternal health management.",
      longDescription:
        "Built a TypeScript mobile client connected to a Node.js + Express.js REST API backed by MongoDB. Designed for pregnant women in rural India to track pregnancy milestones and health data.",
      tech: ["React Native", "TypeScript", "Node.js", "Express.js", "MongoDB"],
      role: "Solo Full-Stack Developer",
      challenge:
        "Maintaining type safety across React Native frontend and Node.js backend while keeping the app lightweight for low-end devices.",
      outcome:
        "Working cross-platform app serving as MCA final project, supporting pregnancy milestone tracking and maternal health data management.",
      github: "https://github.com/LATHESHSD",
      demo: null,
    },
    {
      id: "vmoov",
      title: "VMOOV",
      subtitle: "Home Services Booking Platform",
      description:
        "Responsive React.js booking platform with multi-step workflows and REST API integration.",
      longDescription:
        "Internship project at Parichaya Tech Solutions. Built reusable React components with Tailwind CSS for service browsing and multi-step booking. Implemented a 5-state order workflow synced with backend.",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      role: "Frontend Developer Intern",
      challenge:
        "Keeping complex multi-step booking UI state in sync with backend transitions across 5 order states (Ordered, Confirmed, In Progress, Completed, Cancelled).",
      outcome:
        "Production-ready booking workflow that handled real user bookings during the internship period.",
      github: null,
      demo: null,
    },
    {
      id: "ai-workflow",
      title: "AI Workflow Showcase",
      subtitle: "AI-Assisted Development",
      description:
        "Open-source demo of responsible AI-assisted development with GitHub Copilot and Cursor.",
      longDescription:
        "A small React + TypeScript project demonstrating how I use AI coding assistants for scaffolding, refactoring, and debugging — with manual review and testing at every step.",
      tech: ["React", "TypeScript", "GitHub Copilot", "Cursor", "ChatGPT"],
      role: "Solo Developer",
      challenge:
        "Documenting AI prompts and showing before/after refactoring clearly while maintaining code quality.",
      outcome:
        "Public repo showing my AI-augmented development workflow — a unique angle most junior developers don't showcase.",
      github: "https://github.com/LATHESHSD",
      demo: null,
    },
  ],
};