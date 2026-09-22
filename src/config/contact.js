import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "./site";

export const contactConfig = {
  title: "Get in",
  titleAccent: "Touch",
  description:
    "I'm open to full-time Frontend and MERN Stack Developer roles, plus freelance projects. Drop me a message.",
  contactItems: [
    {
      icon: Mail,
      label: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: siteConfig.social.linkedin,
      external: true,
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: siteConfig.social.github,
      external: true,
    },
    {
      icon: MapPin,
      label: siteConfig.location,
    },
  ],
  form: {
    fields: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
    },
    submitLabel: "Send Message",
    statusSending: "Sending...",
    statusSuccess: "Message sent! I'll get back to you soon.",
    statusError: `Something went wrong. Email me directly at ${siteConfig.email}`,
  },
  emailjs: {
    serviceId: "service_a7640hg",
    templateId: "template_9wrfujs",
    publicKey: "jST3K7mLMdrI1N3l_",
  },
};