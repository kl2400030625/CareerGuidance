"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Calendar, Clock, X, Loader2, CheckCircle2, Briefcase } from "lucide-react"
import { staggerContainer, staggerItem, fadeInUp, springModal } from "@/lib/animations"

const counselors = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "Technology & Engineering",
    experience: "12 years",
    rating: 4.9,
    sessions: 1240,
    bio: "Former Google engineering lead turned career counselor. Specializes in helping students break into top tech companies with practical guidance on interviews, portfolios, and career strategy.",
    availability: ["Mon", "Wed", "Fri"],
    initials: "SM",
  },
  {
    name: "Prof. James Rodriguez",
    specialty: "Business & Finance",
    experience: "15 years",
    rating: 4.8,
    sessions: 980,
    bio: "MBA from Wharton with extensive experience in investment banking and consulting. Guides students through business career paths, MBA prep, and networking strategies.",
    availability: ["Tue", "Thu", "Sat"],
    initials: "JR",
  },
  {
    name: "Dr. Anika Patel",
    specialty: "Healthcare & Life Sciences",
    experience: "10 years",
    rating: 4.9,
    sessions: 870,
    bio: "Physician and academic advisor who helps pre-med and healthcare students navigate the complex path from education to practice, including residency matching and specialization.",
    availability: ["Mon", "Tue", "Thu"],
    initials: "AP",
  },
  {
    name: "Michael Chen",
    specialty: "Design & Creative Arts",
    experience: "8 years",
    rating: 4.7,
    sessions: 650,
    bio: "Former design director at IDEO. Passionate about helping creative students build portfolios, develop their design thinking, and land roles at top design-driven companies.",
    availability: ["Wed", "Fri", "Sat"],
    initials: "MC",
  },
  {
    name: "Dr. Emily Okafor",
    specialty: "Data Science & AI",
    experience: "9 years",
    rating: 4.8,
    sessions: 720,
    bio: "AI researcher and educator with publications in top conferences. Helps students navigate the rapidly evolving landscape of data science, ML engineering, and AI research careers.",
    availability: ["Mon", "Wed", "Sat"],
    initials: "EO",
  },
  {
    name: "Robert Kim",
    specialty: "Law & Public Policy",
    experience: "14 years",
    rating: 4.9,
    sessions: 1100,
    bio: "Harvard Law alumnus and former federal attorney. Guides aspiring lawyers through law school admissions, bar prep, and career placement in various legal specializations.",
    availability: ["Tue", "Thu", "Fri"],
    initials: "RK",
  },
]

function BookingModal({
  counselor,
  onClose,
}: {
  counselor: (typeof counselors)[0]
  onClose: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(onClose, 2000)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
      <motion.div
        variants={springModal}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border/60 bg-card p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">Session Booked!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your session with {counselor.name} has been confirmed.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                {counselor.initials}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{counselor.name}</h3>
                <p className="text-sm text-muted-foreground">{counselor.specialty}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    focusedField === "date"
                      ? "top-1 text-[10px] font-medium text-secondary"
                      : "top-3.5 text-sm text-muted-foreground"
                  }`}
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  onFocus={() => setFocusedField("date")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-5 text-sm text-foreground outline-none transition-all duration-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    focusedField === "time"
                      ? "top-1 text-[10px] font-medium text-secondary"
                      : "top-3.5 text-sm text-muted-foreground"
                  }`}
                >
                  Preferred Time
                </label>
                <select
                  required
                  onFocus={() => setFocusedField("time")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-5 text-sm text-foreground outline-none transition-all duration-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 appearance-none"
                >
                  <option value="">Select a time</option>
                  <option value="9:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>

              <div className="relative">
                <label
                  className={`absolute left-4 top-1 text-[10px] font-medium ${
                    focusedField === "topic" ? "text-secondary" : "text-muted-foreground"
                  } transition-colors duration-200 pointer-events-none`}
                >
                  Topic / Message
                </label>
                <textarea
                  rows={3}
                  placeholder="What would you like to discuss?"
                  onFocus={() => setFocusedField("topic")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-border bg-card px-4 pb-3 pt-5 text-sm text-foreground outline-none transition-all duration-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none placeholder:text-muted-foreground/50"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    Confirm Booking
                  </>
                )}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export function CounselingContent() {
  const [selectedCounselor, setSelectedCounselor] = useState<(typeof counselors)[0] | null>(null)

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Expert Counselors
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Get personalized career guidance
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Book one-on-one sessions with experienced professionals who understand your field of interest.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {counselors.map((counselor) => (
            <motion.div
              key={counselor.name}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-border/50 bg-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                  {counselor.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{counselor.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" />
                    {counselor.specialty}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {counselor.bio}
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {counselor.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {counselor.experience}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {counselor.sessions} sessions
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {counselor.availability.map((day) => (
                  <span
                    key={day}
                    className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-muted-foreground"
                  >
                    {day}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCounselor(counselor)}
                className="mt-5 w-full rounded-xl bg-primary/10 py-2.5 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                Book Session
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCounselor && (
          <BookingModal
            counselor={selectedCounselor}
            onClose={() => setSelectedCounselor(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
