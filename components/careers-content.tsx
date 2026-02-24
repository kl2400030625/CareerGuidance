"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { X, TrendingUp, BookOpen, Code, Briefcase, Palette, HeartPulse, Scale, BarChart3, Cpu, Building2, Megaphone, GraduationCap } from "lucide-react"
import { springModal, staggerContainer, staggerItem, fadeInUp } from "@/lib/animations"

const careers = [
  {
    icon: Code,
    title: "Software Engineering",
    category: "Technology",
    color: "from-blue-500/10 to-cyan-500/10",
    overview: "Design, develop, and maintain software systems that power modern applications. Work with cutting-edge technologies across web, mobile, cloud, and AI platforms.",
    skills: ["JavaScript/TypeScript", "Python", "System Design", "Data Structures", "Cloud Architecture", "Git & CI/CD"],
    futureScope: "AI-augmented development, quantum computing, and edge computing will drive massive growth. Expected 25% job growth by 2032.",
    courses: ["CS50 - Harvard", "Full Stack Open", "System Design Primer", "AWS Solutions Architect"],
  },
  {
    icon: Palette,
    title: "UX/UI Design",
    category: "Design",
    color: "from-pink-500/10 to-rose-500/10",
    overview: "Create intuitive, delightful digital experiences by combining user research, interaction design, and visual aesthetics to solve real problems.",
    skills: ["Figma & Sketch", "User Research", "Prototyping", "Design Systems", "Accessibility", "Motion Design"],
    futureScope: "Spatial computing, voice UI, and AI-powered design tools are creating new frontiers. Growing demand across all industries.",
    courses: ["Google UX Certificate", "Interaction Design Foundation", "Nielsen Norman Group UX", "Figma Masterclass"],
  },
  {
    icon: BarChart3,
    title: "Data Science",
    category: "Technology",
    color: "from-emerald-500/10 to-teal-500/10",
    overview: "Extract insights from complex data using statistical analysis, machine learning, and visualization to drive business decisions.",
    skills: ["Python & R", "Machine Learning", "SQL", "Statistical Analysis", "Data Visualization", "Deep Learning"],
    futureScope: "Generative AI, automated ML, and real-time analytics will expand opportunities. One of the fastest-growing fields globally.",
    courses: ["Andrew Ng's ML Course", "IBM Data Science Professional", "Kaggle Competitions", "Fast.ai"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare Management",
    category: "Healthcare",
    color: "from-red-500/10 to-orange-500/10",
    overview: "Manage healthcare organizations, improve patient outcomes, and optimize operations in hospitals, clinics, and health systems.",
    skills: ["Health Informatics", "Policy Analysis", "Financial Management", "Quality Improvement", "Leadership", "Regulatory Compliance"],
    futureScope: "Telemedicine, AI diagnostics, and personalized medicine are transforming healthcare delivery and management roles.",
    courses: ["MHA Programs", "Healthcare Analytics", "HIMSS Certifications", "Lean Six Sigma Healthcare"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    category: "Business",
    color: "from-amber-500/10 to-yellow-500/10",
    overview: "Drive brand awareness and customer acquisition through SEO, social media, content marketing, paid advertising, and analytics.",
    skills: ["SEO & SEM", "Content Strategy", "Social Media", "Analytics", "Email Marketing", "Conversion Optimization"],
    futureScope: "AI-powered personalization, voice search, and immersive advertising formats will reshape the marketing landscape.",
    courses: ["Google Digital Marketing", "HubSpot Certifications", "Meta Blueprint", "Content Marketing Institute"],
  },
  {
    icon: Scale,
    title: "Corporate Law",
    category: "Legal",
    color: "from-indigo-500/10 to-violet-500/10",
    overview: "Advise businesses on legal matters including contracts, mergers, intellectual property, compliance, and corporate governance.",
    skills: ["Contract Law", "Legal Research", "Negotiation", "Regulatory Compliance", "Due Diligence", "Corporate Governance"],
    futureScope: "Legal tech, smart contracts, and AI-assisted research are modernizing the profession. Global demand remains strong.",
    courses: ["JD Programs", "Contract Drafting", "Legal Tech Bootcamps", "Bar Exam Prep"],
  },
  {
    icon: Building2,
    title: "Product Management",
    category: "Business",
    color: "from-sky-500/10 to-blue-500/10",
    overview: "Define product strategy, collaborate with engineering and design teams, and deliver products that users love and businesses need.",
    skills: ["Product Strategy", "User Stories", "Agile & Scrum", "Data-Driven Decisions", "Roadmapping", "Stakeholder Management"],
    futureScope: "AI product management, PLG strategies, and cross-functional leadership skills will define the next generation of PMs.",
    courses: ["Reforge Programs", "Product School", "Pragmatic Institute", "SVPG Inspired"],
  },
  {
    icon: Cpu,
    title: "Cybersecurity",
    category: "Technology",
    color: "from-slate-500/10 to-zinc-500/10",
    overview: "Protect organizations from cyber threats by designing secure systems, monitoring vulnerabilities, and responding to incidents.",
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Incident Response", "Cloud Security", "Risk Assessment"],
    futureScope: "Zero trust architecture, AI threat detection, and IoT security are driving unprecedented demand for cybersecurity professionals.",
    courses: ["CompTIA Security+", "CISSP", "CEH Certification", "SANS Institute Courses"],
  },
  {
    icon: GraduationCap,
    title: "Education Technology",
    category: "Education",
    color: "from-teal-500/10 to-emerald-500/10",
    overview: "Transform learning experiences through technology, building platforms and tools that make education more accessible and effective.",
    skills: ["Instructional Design", "Learning Analytics", "LMS Platforms", "Content Development", "Assessment Design", "EdTech Tools"],
    futureScope: "Adaptive learning, AI tutoring, VR classrooms, and micro-credentials will reshape education globally.",
    courses: ["Instructional Design MasterTrack", "Google for Education", "edX MicroMasters", "Learning Engineering"],
  },
]

function TiltCard({
  career,
  onClick,
}: {
  career: (typeof careers)[0]
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  function handleMouse(e: React.MouseEvent) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group cursor-pointer rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-secondary/5 via-transparent to-transparent" />

      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${career.color}`}>
          <career.icon className="h-6 w-6 text-foreground" />
        </div>
        <span className="mb-2 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-muted-foreground">
          {career.category}
        </span>
        <h3 className="text-lg font-semibold text-foreground">{career.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {career.overview}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-secondary">
          <TrendingUp className="h-3.5 w-3.5" />
          View Details
        </div>
      </div>
    </motion.div>
  )
}

function CareerModal({
  career,
  onClose,
}: {
  career: (typeof careers)[0]
  onClose: () => void
}) {
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
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/60 bg-card p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${career.color}`}>
          <career.icon className="h-7 w-7 text-foreground" />
        </div>

        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-muted-foreground">
          {career.category}
        </span>
        <h2 className="mt-3 text-2xl font-bold text-foreground">{career.title}</h2>

        <div className="mt-6 flex flex-col gap-6">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Briefcase className="h-4 w-4" /> Overview
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{career.overview}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Code className="h-4 w-4" /> Skills Required
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {career.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border/60 bg-accent px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> Future Scope
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{career.futureScope}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <BookOpen className="h-4 w-4" /> Suggested Courses
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {career.courses.map((course) => (
                <li
                  key={course}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CareersContent() {
  const [selectedCareer, setSelectedCareer] = useState<(typeof careers)[0] | null>(null)
  const [filter, setFilter] = useState("All")

  const categories = ["All", ...Array.from(new Set(careers.map((c) => c.category)))]
  const filtered = filter === "All" ? careers : careers.filter((c) => c.category === filter)

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
            Explore Careers
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Find the career path that fits you
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse detailed career profiles. Click any card to explore skills, future scope, and recommended courses.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Career grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={filter}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((career) => (
            <TiltCard
              key={career.title}
              career={career}
              onClick={() => setSelectedCareer(career)}
            />
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <CareerModal
            career={selectedCareer}
            onClose={() => setSelectedCareer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
