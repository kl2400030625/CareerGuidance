"use client"

import { motion } from "framer-motion"
import { Search, Calendar, TrendingUp } from "lucide-react"
import { staggerContainer, staggerItem } from "@/lib/animations"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Explore Career Paths",
    description: "Browse our comprehensive library of career options. Filter by industry, skills, and interests to find paths that resonate with you.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Book a Counselor",
    description: "Schedule a personalized session with an expert counselor who specializes in your area of interest.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Track Your Progress",
    description: "Use your personal dashboard to monitor your exploration journey, save favorite careers, and track milestones.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-accent/50">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Three simple steps to your dream career
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-16"
        >
          {/* Connecting line */}
          <div className="absolute top-24 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                variants={staggerItem}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number badge */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-sm"
                  >
                    <item.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
