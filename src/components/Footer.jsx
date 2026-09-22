import { motion } from "framer-motion";
import { footerConfig } from "../config/footer";

export default function Footer() {
  const { copyright, socials } = footerConfig;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted text-sm">
          {copyright(new Date().getFullYear())}
        </p>
        <div className="flex gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-muted hover:text-primary transition"
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}