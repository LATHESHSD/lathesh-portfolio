import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { contactConfig } from "../config/contact";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const { title, titleAccent, description, contactItems, form: formCfg, emailjs: emailCfg } =
        contactConfig;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(formCfg.statusSending);

        try {
            await emailjs.send(
                emailCfg.serviceId,
                emailCfg.templateId,
                {
                    from_name: form.name,
                    from_email: form.email,
                    message: form.message,
                    name: form.name,
                    email: form.email,
                },
                emailCfg.publicKey
            );
            setStatus(formCfg.statusSuccess);
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            console.error("=== EMAILJS ERROR ===");
            console.error("Status:", err?.status);
            console.error("Text:", err?.text);
            console.error("Full error object:", err);
            setStatus(formCfg.statusError);
        }
    };

    return (
        <div className="pt-24 max-w-4xl mx-auto px-6 py-20">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4"
            >
                {title} <span className="gradient-text">{titleAccent}</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted mb-12 max-w-2xl"
            >
                {description}
            </motion.p>

            <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    {contactItems.map((item) => {
                        const Icon = item.icon;
                        const content = (
                            <>
                                <Icon size={20} /> {item.label}
                            </>
                        );
                        return item.href ? (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noreferrer" : undefined}
                                className="flex items-center gap-3 text-muted hover:text-primary transition"
                            >
                                {content}
                            </a>
                        ) : (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 text-muted"
                            >
                                {content}
                            </div>
                        );
                    })}
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder={formCfg.fields.name}
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-surface border border-border focus:border-primary rounded-lg px-4 py-3 text-white outline-none transition"
                    />
                    <input
                        type="email"
                        placeholder={formCfg.fields.email}
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-surface border border-border focus:border-primary rounded-lg px-4 py-3 text-white outline-none transition"
                    />
                    <textarea
                        placeholder={formCfg.fields.message}
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-surface border border-border focus:border-primary rounded-lg px-4 py-3 text-white outline-none transition resize-none"
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition"
                    >
                        {formCfg.submitLabel}
                    </motion.button>
                    {status && <p className="text-sm text-muted">{status}</p>}
                </motion.form>
            </div>
        </div>
    );
}