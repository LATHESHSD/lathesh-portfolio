import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/40 rounded-2xl p-6 transition-all duration-300 group overflow-hidden h-full"
      >
        {/* Top gradient accent on hover */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* Corner glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-primary transition">
              {project.title}
            </h3>
            <motion.div
              className="text-muted group-hover:text-primary transition"
              whileHover={{ x: 3, y: -3 }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>

          <p className="text-primary text-xs font-mono mb-3 tracking-wide">
            {project.subtitle}
          </p>

          <p className="text-muted text-sm mb-6 leading-relaxed flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-muted font-mono"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}