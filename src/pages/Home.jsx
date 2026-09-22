import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { projectsConfig } from "../config/projects";
import { homeConfig } from "../config/home";
import { siteConfig } from "../config/site";
import ProjectCard from "../components/ProjectCard";
import MagneticButton from "../components/MagneticButton";

export default function Home() {
  const { hero, techStack, featured, cta } = homeConfig;
  const featuredProjects = projectsConfig.projects.slice(0, featured.count);

  return (
    <div className="pt-24 overflow-hidden">
      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-purple/20 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="relative z-10"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-primary text-sm mb-4 flex items-center gap-2"
          >
            <motion.span
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ duration: 1.5, delay: 1, repeat: 0 }}
              className="inline-block"
            >
              {hero.greetingEmoji}
            </motion.span>
            {hero.greeting}
          </motion.p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            {hero.titleWords.map((word, i) => (
              <motion.span
                key={word}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="inline-block mr-3"
              >
                {i === hero.gradientWordIndex ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-muted text-lg mb-8 leading-relaxed"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="flex gap-4 flex-wrap"
          >
            <MagneticButton>
              <Link
                to={hero.primaryCta.path}
                className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition glow-hover"
              >
                {hero.primaryCta.label} <ArrowRight size={18} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href={hero.secondaryCta.href}
                download={hero.secondaryCta.download}
                className="border border-border hover:border-primary text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition"
              >
                <Download size={18} /> {hero.secondaryCta.label}
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center relative z-10"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 overflow-hidden glow"
          >
            <img
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* TECH STACK */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-12 border-y border-border"
      >
        <p className="text-muted text-sm text-center mb-6">{techStack.label}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.items.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, borderColor: "#3B82F6" }}
              className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-muted cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-12"
        >
          {featured.title}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="text-primary hover:underline inline-flex items-center gap-1 group"
          >
            {featured.viewAllLabel}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-purple/5 to-accent/5 blur-3xl" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          {cta.title} <span className="gradient-text">{cta.titleAccent}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted mb-8"
        >
          {cta.description}
        </motion.p>
        <MagneticButton className="inline-block">
          <Link
            to="/contact"
            className="inline-block bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition glow-hover"
          >
            {cta.buttonLabel}
          </Link>
        </MagneticButton>
      </section>
    </div>
  );
}