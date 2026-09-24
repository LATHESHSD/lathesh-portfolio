import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, AlertCircle, CheckCircle2, Bell } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase
      .from("subscribers")
      .insert({ email: email.toLowerCase().trim() });

    setLoading(false);

    if (insertError) {
      // Check if it's a duplicate email error
      if (insertError.code === "23505" || insertError.message.includes("duplicate")) {
        setError("This email is already subscribed!");
      } else {
        setError("Something went wrong. Please try again.");
        console.error("Subscribe error:", insertError);
      }
      return;
    }

    setSuccess("You're subscribed! You'll hear from me when I post new projects.");
    setEmail("");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Icon */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary via-purple to-accent mb-4"
          >
            <Bell size={28} className="text-white" />
          </motion.div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Get <span className="gradient-text">Updates</span>
          </h1>
          <p className="text-muted max-w-sm mx-auto">
            Want to be notified when I post new projects or write a new article? Drop your email below.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
          {/* Feedback messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm overflow-hidden"
              >
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm overflow-hidden"
              >
                <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-primary rounded-lg pl-10 pr-4 py-3 text-white outline-none transition"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </form>

          <p className="text-xs text-muted text-center mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>

        {/* Back link */}
        <p className="text-center text-sm text-muted mt-6">
          <Link to="/" className="hover:text-primary transition">
            ← Back to portfolio
          </Link>
        </p>
      </motion.div>
    </div>
  );
}