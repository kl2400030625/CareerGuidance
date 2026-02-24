"use client"

import { motion } from "framer-motion"
import { Compass, Users, LineChart, BookOpen, Lightbulb, Shield } from "lucide-react"
import { staggerContainer, staggerItem } from "@/lib/animations"

const features = [
  {
    icon: Compass,
    title: "Career Exploration",
    description: "Browse 150+ career paths with detailed insights on skills, salaries, and growth potential.",
  },
  {
    icon: Users,
    title: "Expert Counselors",
    description: "Connect with industry professionals who provide personalized guidance for your unique journey.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Monitor your career exploration journey with an intuitive dashboard and personalized milestones.",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Access curated courses, articles, and tools tailored to your chosen career path.",
  },
  {
    icon: Lightbulb,
    title: "Skills Assessment",
    description: "Identify your strengths and areas for growth with our comprehensive assessment tools.",
  },
  {
    icon: Shield,
    title: "Trusted Community",
    description: "Join a supportive network of students and mentors committed to professional development.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Why PathFinder
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Everything you need to navigate your career
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our platform combines expert guidance with powerful tools to help you make confident career decisions.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Glow effect on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-secondary/5 via-transparent to-transparent" />
              
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
