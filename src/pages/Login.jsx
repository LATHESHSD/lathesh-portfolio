import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { authConfig } from "../config/auth";
import NightSky from "../components/NightSky";
import Moon from "../components/Moon";

export default function Login() {
  const [isAwake, setIsAwake] = useState(false);
  const [method, setMethod] = useState("email");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const config = authConfig.login;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn({
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <NightSky isAwake={isAwake} />

      {!isAwake && (
        <button
          onClick={() => setIsAwake(true)}
          className="fixed inset-0 w-full h-full cursor-pointer z-10"
          aria-label="Turn on the lights"
        />
      )}

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-start pt-20 md:pt-16 px-6 pointer-events-none">
        <div className="pointer-events-none">
          <Moon isAwake={isAwake} />
        </div>

        <AnimatePresence>
          {!isAwake && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-muted text-xs mt-32 mb-4 animate-pulse pointer-events-none"
            >
              {authConfig.hint.off}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAwake && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-md mt-32 mb-12 pointer-events-auto"
            >
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {config.title}
                </h1>
                <p className="text-muted text-sm">{config.subtitle}</p>
              </div>

              <div
                className="rounded-2xl p-6 md:p-8 backdrop-blur-md"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(200, 220, 255, 0.15)",
                  boxShadow: "0 0 40px rgba(200, 220, 255, 0.1)",
                }}
              >
                <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-lg">
                  <button
                    onClick={() => setMethod("email")}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                      method === "email"
                        ? "bg-primary text-white"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setMethod("google")}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                      method === "google"
                        ? "bg-primary text-white"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    Google
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                    >
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {method === "email" && (
                    <motion.form
                      key="email"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                        />
                        <input
                          type="email"
                          placeholder="Email address"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="w-full bg-white/5 border border-white/10 focus:border-primary rounded-lg pl-10 pr-4 py-3 text-white outline-none transition"
                        />
                      </div>
                      <div className="relative">
                        <Lock
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          required
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          className="w-full bg-white/5 border border-white/10 focus:border-primary rounded-lg pl-10 pr-4 py-3 text-white outline-none transition"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-blue-600 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition"
                      >
                        {loading ? config.loadingLabel : config.submitLabel}
                      </button>
                    </motion.form>
                  )}

                  {method === "google" && (
                    <motion.div
                      key="google"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={handleGoogle}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 py-3 rounded-lg font-medium transition disabled:opacity-50"
                      >
                        <FcGoogle size={22} />
                        {loading ? "Redirecting..." : config.googleLabel}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-center text-sm text-muted mt-6">
                  {config.switchPrompt}{" "}
                  <Link
                    to={config.switchLinkPath}
                    className="text-primary hover:underline"
                  >
                    {config.switchLink}
                  </Link>
                </p>
              </div>

              <p className="text-center text-sm text-muted mt-6">
                <Link to="/" className="hover:text-primary transition">
                  ← Back to portfolio
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}