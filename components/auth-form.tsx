"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, Compass, ArrowRight, Loader2 } from "lucide-react"

const quotes = [
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Your work is going to fill a large part of your life. Find what you love.", author: "Steve Jobs" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
]

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const quote = quotes[mode === "login" ? 0 : 1]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      if (mode === "login") {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }, 1200)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left - Visual Panel */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 bg-primary" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, oklch(0.28 0.12 260) 0%, oklch(0.35 0.15 250) 100%)",
              "linear-gradient(135deg, oklch(0.32 0.14 255) 0%, oklch(0.28 0.12 260) 100%)",
              "linear-gradient(135deg, oklch(0.28 0.12 260) 0%, oklch(0.35 0.15 250) 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating shapes */}
        <motion.div
          className="absolute right-20 top-20 h-64 w-64 rounded-full border border-primary-foreground/10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-16 h-40 w-40 rounded-3xl border border-primary-foreground/10"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground backdrop-blur-sm">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-primary-foreground">PathFinder</span>
          </Link>

          <div className="max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="text-2xl font-light leading-relaxed text-primary-foreground/90">
                  {`"${quote.text}"`}
                </blockquote>
                <p className="mt-4 text-sm font-medium text-primary-foreground/60">
                  -- {quote.author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-xs text-primary-foreground/40">
            Trusted by 10,000+ students worldwide
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold text-foreground">PathFinder</span>
              </Link>
            </div>

            <h1 className="text-2xl font-bold text-foreground">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "login"
                ? "Enter your credentials to access your dashboard."
                : "Start your career guidance journey today."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {mode === "signup" && (
                <div className="relative">
                  <motion.label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === "name" || formData.name
                        ? "top-1 text-[10px] font-medium text-secondary"
                        : "top-3.5 text-sm text-muted-foreground"
                    }`}
                  >
                    Full Name
                  </motion.label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-5 text-sm text-foreground outline-none transition-all duration-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              )}

              <div className="relative">
                <motion.label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    focusedField === "email" || formData.email
                      ? "top-1 text-[10px] font-medium text-secondary"
                      : "top-3.5 text-sm text-muted-foreground"
                  }`}
                >
                  Email Address
                </motion.label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-5 text-sm text-foreground outline-none transition-all duration-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div className="relative">
                <motion.label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    focusedField === "password" || formData.password
                      ? "top-1 text-[10px] font-medium text-secondary"
                      : "top-3.5 text-sm text-muted-foreground"
                  }`}
                >
                  Password
                </motion.label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-5 pr-12 text-sm text-foreground outline-none transition-all duration-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {mode === "login" && (
                <div className="flex items-center justify-end">
                  <Link
                    href="/"
                    className="group text-xs font-medium text-secondary hover:text-secondary/80"
                  >
                    Forgot password?
                    <span className="block h-px w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {mode === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <Link
                href={mode === "login" ? "/signup" : "/login"}
                className="font-medium text-secondary hover:text-secondary/80 transition-colors"
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </Link>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
