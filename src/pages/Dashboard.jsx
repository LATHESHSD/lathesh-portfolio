import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, User, Mail, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, signOut, isAdmin } = useAuth();

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 flex-wrap gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">
                Welcome, <span className="gradient-text">Admin</span>
              </h1>
              {isAdmin && (
                <span className="flex items-center gap-1 px-3 py-1 bg-accent/10 border border-accent/30 text-accent rounded-full text-xs font-medium">
                  <Shield size={12} /> ADMIN
                </span>
              )}
            </div>
            <p className="text-muted text-sm">
              Private dashboard — only you can see this
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded-lg transition text-sm"
          >
            <LogOut size={16} /> Sign out
          </button>
        </motion.div>

        {/* User info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-semibold mb-4">Your Account</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted">
              <User size={18} />
              <span>{user?.user_metadata?.full_name || "Admin"}</span>
            </div>
            <div className="flex items-center gap-3 text-muted">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>
          </div>
        </motion.div>

        {/* Placeholder for stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Visitor Analytics</h2>
          <p className="text-muted text-sm">
            Coming soon — Total visits, top pages, countries, and more.
          </p>
        </motion.div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-muted hover:text-primary transition text-sm"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}