"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useTypewriter } from "@/hooks/use-animations"
import { fadeInUp, staggerContainer } from "@/lib/animations"

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  )
}

export function HeroSection() {
  const { displayText, isComplete } = useTypewriter(
    "Shape Your Future with Expert Career Guidance",
    40,
    600
  )

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <FloatingOrb
          className="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-3xl"
          delay={2}
        />
        <FloatingOrb
          className="absolute -bottom-20 left-1/3 h-[350px] w-[350px] rounded-full bg-secondary/6 blur-3xl"
          delay={4}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-6 pt-32 pb-20"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">
              Trusted by 10,000+ students worldwide
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-balance">{displayText}</span>
            <span
              className={`inline-block w-[3px] h-[1em] ml-1 bg-secondary align-middle ${
                isComplete ? "animate-pulse" : ""
              }`}
            />
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Discover your ideal career path with personalized mentorship, in-depth exploration tools, 
            and one-on-one guidance from industry professionals.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/careers"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Explore Careers
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/counseling"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-card hover:-translate-y-0.5"
            >
              Book a Session
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 grid grid-cols-3 gap-8 md:gap-16"
          >
            {[
              { value: "10K+", label: "Students Guided" },
              { value: "150+", label: "Career Paths" },
              { value: "50+", label: "Expert Counselors" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
