"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Computer Science Student",
    quote: "PathFinder completely changed how I approached my career. The counseling sessions helped me realize my passion for UX design, and now I'm interning at a top tech company.",
  },
  {
    name: "James Chen",
    role: "Business Graduate",
    quote: "I was confused between finance and marketing. My PathFinder counselor helped me explore both paths thoroughly, and I made a confident decision that I'm thriving in today.",
  },
  {
    name: "Aisha Patel",
    role: "Pre-Med Student",
    quote: "The career exploration tools are incredible. I discovered healthcare administration as an alternative path, and the progress tracker kept me motivated throughout my journey.",
  },
  {
    name: "Marcus Williams",
    role: "Engineering Student",
    quote: "What sets PathFinder apart is the quality of counselors. My mentor had 15 years of industry experience and gave me advice I couldn't find anywhere else.",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  }

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
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Hear from our students
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          <div className="rounded-2xl border border-border/50 bg-card p-8 md:p-12">
            <Quote className="mb-6 h-10 w-10 text-secondary/30" />

            <div className="relative min-h-[160px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-lg leading-relaxed text-foreground md:text-xl">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>
                  <div className="mt-8">
                    <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1)
                      setCurrent(i)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-secondary"
                        : "w-2 bg-border hover:bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
