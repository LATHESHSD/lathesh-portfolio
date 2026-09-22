import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { siteConfig } from "./site";

export const footerConfig = {
  copyright: (year) =>
    `© ${year} ${siteConfig.name}. Built with React + Tailwind.`,
  socials: [
    {
      icon: FaGithub,
      href: siteConfig.social.github,
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: siteConfig.social.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: `mailto:${siteConfig.email}`,
      label: "Email",
    },
  ],
};