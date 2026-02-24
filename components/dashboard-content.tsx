"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Calendar, Clock, TrendingUp, Star, ArrowRight, Code, Palette, BarChart3 } from "lucide-react"
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations"
import { useCountUp, useScrollAnimation } from "@/hooks/use-animations"

const savedCareers = [
  { icon: Code, title: "Software Engineering", match: 94 },
  { icon: Palette, title: "UX/UI Design", match: 87 },
  { icon: BarChart3, title: "Data Science", match: 82 },
]

const upcomingSessions = [
  {
    counselor: "Dr. Sarah Mitchell",
    date: "Mar 5, 2026",
    time: "10:00 AM",
    topic: "Tech Career Strategy",
    initials: "SM",
  },
  {
    counselor: "Michael Chen",
    date: "Mar 12, 2026",
    time: "2:00 PM",
    topic: "Portfolio Review",
    initials: "MC",
  },
]

const milestones = [
  { label: "Career Quiz Completed", done: true },
  { label: "3 Career Paths Explored", done: true },
  { label: "First Counseling Session", done: true },
  { label: "Skills Assessment", done: false },
  { label: "Build Portfolio", done: false },
]

function StatCard({
  label,
  value,
  icon: Icon,
  delay = 0,
}: {
  label: string
  value: number
  icon: React.ElementType
  delay?: number
}) {
  const { ref, isInView } = useScrollAnimation()
  const count = useCountUp(value, 1500, 0, isInView)

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="rounded-2xl border border-border/50 bg-card p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-foreground">{count}</div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  )
}

export function DashboardContent() {
  const completedMilestones = milestones.filter((m) => m.done).length
  const progress = Math.round((completedMilestones / milestones.length) * 100)

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-10"
        >
          <motion.div
            className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-secondary/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              Welcome back, Alex!
            </h1>
            <p className="mt-2 max-w-lg text-sm text-primary-foreground/70">
              You are making great progress on your career journey. You have completed {completedMilestones} of {milestones.length} milestones.
              Keep exploring to find your perfect path.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard label="Careers Explored" value={12} icon={BookOpen} />
          <StatCard label="Sessions Completed" value={5} icon={Calendar} delay={0.1} />
          <StatCard label="Hours of Guidance" value={18} icon={Clock} delay={0.2} />
          <StatCard label="Skills Assessed" value={8} icon={TrendingUp} delay={0.3} />
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Progress Tracker */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl border border-border/50 bg-card p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">Your Progress</h2>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Journey completion</span>
                <span className="font-semibold text-foreground">{progress}%</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-accent">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                      milestone.done
                        ? "bg-green-100 text-green-600"
                        : "border border-border bg-accent text-muted-foreground"
                    }`}
                  >
                    {milestone.done ? (
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      milestone.done
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {milestone.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Sessions */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl border border-border/50 bg-card p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">Upcoming Sessions</h2>
            <div className="mt-4 flex flex-col gap-4">
              {upcomingSessions.map((session, i) => (
                <motion.div
                  key={session.counselor}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i }}
                  className="rounded-xl border border-border/50 bg-accent/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {session.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {session.counselor}
                      </p>
                      <p className="text-xs text-muted-foreground">{session.topic}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Saved Careers */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 rounded-2xl border border-border/50 bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Saved Career Paths</h2>
            <a
              href="/careers"
              className="group flex items-center gap-1 text-sm font-medium text-secondary"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 grid gap-4 sm:grid-cols-3"
          >
            {savedCareers.map((career) => (
              <motion.div
                key={career.title}
                variants={staggerItem}
                whileHover={{ y: -2 }}
                className="cursor-pointer rounded-xl border border-border/50 bg-accent/30 p-5 transition-shadow hover:shadow-md"
              >
                <career.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{career.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-accent">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${career.match}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full bg-secondary"
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {career.match}% match
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
