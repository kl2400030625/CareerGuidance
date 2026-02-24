"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts"
import {
  LayoutDashboard, Users, Calendar, Compass, TrendingUp,
  Settings, LogOut, Menu, X, ChevronRight, Eye,
} from "lucide-react"
import { useCountUp, useScrollAnimation } from "@/hooks/use-animations"
import { slideInFromLeft, staggerContainer, staggerItem } from "@/lib/animations"

const monthlyUsers = [
  { month: "Sep", users: 320 },
  { month: "Oct", users: 480 },
  { month: "Nov", users: 590 },
  { month: "Dec", users: 710 },
  { month: "Jan", users: 860 },
  { month: "Feb", users: 1020 },
]

const sessionsData = [
  { month: "Sep", sessions: 85 },
  { month: "Oct", sessions: 120 },
  { month: "Nov", sessions: 150 },
  { month: "Dec", sessions: 180 },
  { month: "Jan", sessions: 220 },
  { month: "Feb", sessions: 275 },
]

const careerViews = [
  { name: "Software Eng.", value: 340, color: "oklch(0.28 0.12 260)" },
  { name: "Data Science", value: 260, color: "oklch(0.65 0.15 245)" },
  { name: "UX Design", value: 200, color: "oklch(0.55 0.10 260)" },
  { name: "Product Mgmt", value: 150, color: "oklch(0.75 0.12 245)" },
  { name: "Cybersecurity", value: 120, color: "oklch(0.40 0.08 260)" },
]

const recentUsers = [
  { name: "Alex Johnson", email: "alex@email.com", date: "Feb 24, 2026", career: "Software Engineering" },
  { name: "Priya Sharma", email: "priya@email.com", date: "Feb 23, 2026", career: "Data Science" },
  { name: "James Wilson", email: "james@email.com", date: "Feb 23, 2026", career: "UX Design" },
  { name: "Maria Garcia", email: "maria@email.com", date: "Feb 22, 2026", career: "Product Management" },
  { name: "David Lee", email: "david@email.com", date: "Feb 22, 2026", career: "Cybersecurity" },
]

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Users" },
  { icon: Calendar, label: "Sessions" },
  { icon: Compass, label: "Careers" },
  { icon: TrendingUp, label: "Analytics" },
  { icon: Settings, label: "Settings" },
]

function AdminStatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string
  value: number
  icon: React.ElementType
  trend: string
}) {
  const { ref, isInView } = useScrollAnimation()
  const count = useCountUp(value, 1500, 0, isInView)

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="rounded-2xl border border-border/50 bg-card p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          {trend}
        </span>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-foreground">
          {count.toLocaleString()}
        </div>
        <div className="mt-0.5 text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  )
}

export function AdminContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-accent/30">
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="hidden w-[260px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex"
      >
        <div className="flex items-center gap-2.5 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-semibold text-sidebar-foreground">PathFinder</span>
            <p className="text-xs text-sidebar-foreground/50">Admin Panel</p>
          </div>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                link.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <link.icon className="h-4.5 w-4.5" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4.5 w-4.5" />
            Back to Site
          </Link>
        </div>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed left-0 top-0 z-50 flex h-full w-[260px] flex-col border-r border-sidebar-border bg-sidebar lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                    <Compass className="h-5 w-5" />
                  </div>
                  <span className="text-base font-semibold text-sidebar-foreground">Admin</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-sidebar-foreground/60"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.label}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      link.active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <link.icon className="h-4.5 w-4.5" />
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border/50 bg-card px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-accent lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Overview of your platform</p>
            </div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            A
          </div>
        </div>

        <div className="p-6">
          {/* Stat cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AdminStatCard label="Total Users" value={1020} icon={Users} trend="+18%" />
            <AdminStatCard label="Sessions Booked" value={275} icon={Calendar} trend="+25%" />
            <AdminStatCard label="Career Views" value={3480} icon={Eye} trend="+12%" />
            <AdminStatCard label="Active Counselors" value={12} icon={TrendingUp} trend="+2" />
          </motion.div>

          {/* Charts row */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* User Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <h3 className="text-base font-semibold text-foreground">User Growth</h3>
              <p className="text-sm text-muted-foreground">Monthly registered users</p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyUsers}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 250)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.45 0.03 260)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.45 0.03 260)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(1 0 0)",
                        border: "1px solid oklch(0.90 0.02 250)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="users" fill="oklch(0.28 0.12 260)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Sessions Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <h3 className="text-base font-semibold text-foreground">Sessions Booked</h3>
              <p className="text-sm text-muted-foreground">Monthly counseling sessions</p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sessionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 250)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.45 0.03 260)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.45 0.03 260)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(1 0 0)",
                        border: "1px solid oklch(0.90 0.02 250)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sessions"
                      stroke="oklch(0.65 0.15 245)"
                      strokeWidth={2.5}
                      dot={{ fill: "oklch(0.65 0.15 245)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Most Viewed Careers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <h3 className="text-base font-semibold text-foreground">Most Viewed Careers</h3>
              <p className="mb-4 text-sm text-muted-foreground">Top explored paths</p>
              <div className="flex justify-center">
                <div className="h-52 w-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={careerViews}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {careerViews.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1 0 0)",
                          border: "1px solid oklch(0.90 0.02 250)",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {careerViews.map((career) => (
                  <div key={career.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: career.color }}
                      />
                      <span className="text-muted-foreground">{career.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{career.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2 rounded-2xl border border-border/50 bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Recent Users</h3>
                  <p className="text-sm text-muted-foreground">Latest registrations</p>
                </div>
                <button className="group flex items-center gap-1 text-sm font-medium text-secondary">
                  View all
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="pb-3 text-left font-medium text-muted-foreground">Name</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground hidden md:table-cell">Date</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, i) => (
                      <motion.tr
                        key={user.email}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.08 }}
                        className="border-b border-border/30 last:border-0"
                      >
                        <td className="py-3 font-medium text-foreground">{user.name}</td>
                        <td className="py-3 text-muted-foreground hidden sm:table-cell">{user.email}</td>
                        <td className="py-3 text-muted-foreground hidden md:table-cell">{user.date}</td>
                        <td className="py-3">
                          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            {user.career}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
