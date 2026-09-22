import { motion } from "framer-motion";
import { projectsConfig } from "../config/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { pageTitle, pageTitleAccent, pageDescription, projects } =
    projectsConfig;

  return (
    <div className="pt-24 max-w-6xl mx-auto px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        {pageTitle} <span className="gradient-text">{pageTitleAccent}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-muted mb-12 max-w-2xl"
      >
        {pageDescription}
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}