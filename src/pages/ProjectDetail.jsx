import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projectsConfig } from "../config/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsConfig.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="pt-24 max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl mb-4">Project not found</h1>
        <Link to="/projects" className="text-primary hover:underline">
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-4xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          to="/projects"
          className="text-muted hover:text-primary flex items-center gap-2 mb-8 text-sm transition"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold mb-2"
      >
        {project.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-primary mb-6 text-lg"
      >
        {project.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3 mb-12 flex-wrap"
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border hover:border-primary rounded-lg text-sm transition"
          >
            <FaGithub size={16} /> GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm transition"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </motion.div>

      <div className="space-y-10">
        <Section title="Overview" delay={0.4}>
          <p className="text-muted leading-relaxed">{project.longDescription}</p>
        </Section>
        <Section title="My Role" delay={0.5}>
          <p className="text-muted">{project.role}</p>
        </Section>
        <Section title="Tech Stack" delay={0.6}>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1 bg-surface border border-border rounded-full text-sm text-muted"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </Section>
        <Section title="Challenge" delay={0.7}>
          <p className="text-muted leading-relaxed">{project.challenge}</p>
        </Section>
        <Section title="Outcome" delay={0.8}>
          <p className="text-muted leading-relaxed">{project.outcome}</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>
      {children}
    </motion.div>
  );
}