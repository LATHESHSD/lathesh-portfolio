import { Download } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend & APIs",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    title: "Tools & AI",
    skills: [
      "Git",
      "VS Code",
      "Postman",
      "GitHub Copilot",
      "Cursor",
      "ChatGPT",
    ],
  },
];

export default function About() {
  return (
    <div className="pt-24 max-w-4xl mx-auto px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-8"
      >
        About <span className="gradient-text">Me</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-6 text-muted leading-relaxed mb-16"
      >
        <p>
          I'm a MERN stack developer based in Bengaluru, India, with 4+ months
          of full-stack internship experience focused on frontend development.
        </p>
        <p>
          I specialize in building responsive React.js and React Native
          interfaces backed by Node.js, Express.js, and MongoDB. I integrate AI
          coding assistants like GitHub Copilot and Cursor into my daily
          workflow — for scaffolding, refactoring, and debugging — while
          reviewing and testing every generated change.
        </p>
        <p>
          I'm currently looking for full-time Frontend or MERN Stack Developer
          roles where I can contribute to real-world products and grow with a
          strong team.
        </p>
      </motion.div>

      {/* Education */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-6"
      >
        Education
      </motion.h2>
      <div className="space-y-4 mb-16">
        {[
          {
            degree: "Master of Computer Applications (MCA)",
            school: "University of Mysore · CGPA 8.60/10",
          },
          {
            degree: "Bachelor of Science (B.Sc.)",
            school: "Government Science College, Hassan · CGPA 8.27/10",
          },
        ].map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border-l-2 border-primary pl-6"
          >
            <h3 className="text-white font-semibold">{edu.degree}</h3>
            <p className="text-muted text-sm">{edu.school}</p>
          </motion.div>
        ))}
      </div>

      {/* Skills */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-6"
      >
        Skills
      </motion.h2>
      <div className="space-y-6 mb-16">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
          >
            <h3 className="text-white font-medium mb-3">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -3, borderColor: "#3B82F6" }}
                  className="px-3 py-1 bg-surface border border-border rounded-full text-sm text-muted cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resume CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <MagneticButton className="inline-block">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition glow-hover"
          >
            <Download size={18} /> Download Resume
          </a>
        </MagneticButton>
      </motion.div>
    </div>
  );
}