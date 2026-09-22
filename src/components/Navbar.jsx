import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarConfig } from "../config/navbar";
import { siteConfig } from "../config/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { links } = navbarConfig;
  const { logo, avatar, name } = siteConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/60 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Avatar */}
        <Link
          to="/"
          className="group relative flex items-center gap-3"
          aria-label="Home"
        >
          {/* Avatar with initial */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="relative w-10 h-10 rounded-full border-2 border-primary/40 group-hover:border-primary transition-colors bg-gradient-to-br from-primary via-purple to-accent flex items-center justify-center"
          >
            <span className="text-white font-serif italic font-black text-lg leading-none">
              {avatar.initial}
            </span>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-bg" />
          </motion.div>

          {/* Animated logo text */}
          <motion.div
            className="hidden sm:flex items-baseline text-xl font-serif tracking-tight"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            {logo.text.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  rest: { y: 0, color: "#FFFFFF" },
                  hover: {
                    y: [0, -5, 0],
                    color: ["#FFFFFF", "#3B82F6", "#FFFFFF"],
                  },
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block italic font-bold"
              >
                {char}
              </motion.span>
            ))}

            <motion.span
              variants={{
                rest: { scale: 1 },
                hover: { scale: [1, 1.15, 1] },
              }}
              transition={{ duration: 0.5 }}
              className="inline-block not-italic font-black bg-gradient-to-r from-primary via-purple to-accent bg-clip-text text-transparent"
            >
              {logo.accent}
            </motion.span>
          </motion.div>

          {/* Animated underline */}
          <motion.div
            className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-primary via-purple to-accent hidden sm:block"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative px-4 py-2 text-sm transition-colors group"
            >
              <span
                className={
                  pathname === link.path
                    ? "text-primary"
                    : "text-muted group-hover:text-white"
                }
              >
                {link.name}
              </span>
              {pathname === link.path && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-bg/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-lg transition ${
                    pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}