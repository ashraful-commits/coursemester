"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Users,
  BookOpen,
  Star,
  Plus,
  Edit,
  Eye,
  TrendingUp,
  Award,
  Zap,
  MoveRight,
  ChevronRight,
  LayoutGrid,
  BarChart3,
  MousePointer2,
  Trophy,
  Activity,
  Globe,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Layers,
} from "lucide-react"

interface Analytics {
  totalRevenue: number
  totalEnrollments: number
  totalCourses: number
  averageRating: string
  courses: {
    id: string
    title: string
    description: string
    price: number
    isPublished: boolean
    _count: { enrollments: number }
  }[]
}

export default function InstructorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in")
      return
    }
    if (status === "authenticated") {
      fetchAnalytics()
    }
  }, [status, router])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/instructor/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        setAnalytics({ totalRevenue: 0, totalEnrollments: 0, totalCourses: 0, averageRating: "0", courses: [] })
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
      setAnalytics({ totalRevenue: 0, totalEnrollments: 0, totalCourses: 0, averageRating: "0", courses: [] })
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-3 border-2 border-primary/20 rounded-full" />
          </div>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Architect Uplink</p>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40 mt-1">Calibrating Command Systems</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: "Total Revenue",
      value: `$${(analytics?.totalRevenue || 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
      trend: "+24.5%",
      trendUp: true,
      desc: "Lifetime earnings",
    },
    {
      label: "Total Students",
      value: (analytics?.totalEnrollments || 0).toLocaleString(),
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
      glow: "shadow-[0_0_20px_rgba(96,165,250,0.15)]",
      trend: "+12%",
      trendUp: true,
      desc: "Enrolled globally",
    },
    {
      label: "Active Courses",
      value: analytics?.totalCourses || 0,
      icon: BookOpen,
      color: "text-violet-400",
      bg: "bg-violet-400/10",
      border: "border-violet-400/20",
      glow: "shadow-[0_0_20px_rgba(167,139,250,0.15)]",
      trend: "Stable",
      trendUp: null,
      desc: "Published modules",
    },
    {
      label: "Avg. Rating",
      value: analytics?.averageRating || "0.0",
      icon: Star,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      glow: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
      trend: "Top 5%",
      trendUp: true,
      desc: "Student satisfaction",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] bg-primary/8 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-[40%] right-[20%] w-[25%] h-[25%] bg-violet-600/5 rounded-full blur-[100px]" />
        {/* Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ─── HEADER ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 pt-12 pb-8 sm:pt-20 sm:pb-14 border-b border-white/5 bg-white/[0.01] backdrop-blur-2xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-10">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
                <LayoutGrid className="w-3 h-3 text-primary" />
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-primary">
                  Architect Command Center
                </span>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              </div>
              <h1 className="text-3xl xs:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-3 sm:mb-4">
                Your Teaching{" "}
                <span className="text-gradient">Empire</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
                Deploy knowledge at scale. Track revenue, students, and course performance
                from your command center.
              </p>
            </div>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 animate-fadeInUp delay-100 w-full lg:w-auto">
              <Button
                variant="outline"
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-white/5 hover:border-primary/30 transition-all group w-full xs:w-auto"
              >
                <BarChart3 className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                Analytics
              </Button>
              <Link href="/instructor/courses/create" className="w-full xs:w-auto">
                <Button className="w-full h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] transition-all group">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 group-hover:rotate-90 transition-transform" />
                  New Module
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-14 relative z-10">
        {/* ─── STAT NODES ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`glass-card group p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border ${stat.border} hover:${stat.glow} hover:-translate-y-2 transition-all duration-500 animate-fadeInUp relative overflow-hidden`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Background tint */}
              <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-[2rem] sm:rounded-[2.5rem]`} />
              {/* Top accent line */}
              <div className={`absolute top-0 left-6 right-6 h-px ${stat.color.replace('text-', 'bg-')} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

              <div className="flex justify-between items-start mb-6 sm:mb-8 relative z-10">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 ${stat.bg} border ${stat.border} rounded-xl sm:rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className={`flex items-center gap-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${stat.trendUp === true ? "bg-emerald-400/10 text-emerald-400" :
                  stat.trendUp === false ? "bg-red-400/10 text-red-400" :
                    "bg-white/5 text-muted-foreground"
                  }`}>
                  {stat.trendUp !== null && <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                  {stat.trend}
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-2xl sm:text-4xl font-black tracking-tighter mb-1 leading-none">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mt-1.5 sm:mt-2">
                  {stat.label}
                </div>
                <div className="text-[8px] sm:text-[9px] text-muted-foreground opacity-40 font-medium mt-1">
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── QUICK ACTIONS ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-16">
          {[
            { icon: Layers, title: "Create Course", desc: "Start a blank blueprint", href: "/instructor/courses/create", cta: "Initialize", color: "from-primary/20 to-violet-600/10" },
            { icon: Activity, title: "Analytics", desc: "Deep dive performance", href: "/instructor/analytics", cta: "Reports", color: "from-blue-500/20 to-cyan-500/10" },
            { icon: Globe, title: "Students", desc: "Connect with learners", href: "/instructor/students", cta: "Network", color: "from-emerald-500/20 to-teal-500/10" },
          ].map((action, i) => (
            <div key={i} className={`glass-card group p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden animate-fadeInUp`} style={{ animationDelay: `${400 + i * 80}ms` }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform text-primary">
                  <action.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight mb-1 group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium opacity-60 mb-4 sm:mb-5">{action.desc}</p>
                <div className="flex items-center gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {action.cta} <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── COURSES SECTION ───────────────────────────────────────────── */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">
                Production <span className="text-gradient">Modules</span>
              </h2>
              <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40 mt-1 sm:mt-2">
                {analytics?.courses.length || 0} modules deployed globally
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="glass border-white/10 rounded-xl h-10 px-5 font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:border-primary/30 transition-all w-full sm:w-auto"
            >
              <MousePointer2 className="w-3.5 h-3.5 mr-2" />
              Manage All
            </Button>
          </div>

          {!analytics?.courses || analytics.courses.length === 0 ? (
            <div className="glass-card rounded-[2.5rem] sm:rounded-[4rem] border-white/5 p-12 sm:p-24 text-center group">
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-10">
                <div className="absolute inset-0 border-2 border-primary/10 rounded-2xl sm:rounded-[2.5rem] rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl sm:rounded-[2.5rem] -rotate-12 group-hover:rotate-0 transition-transform duration-700 delay-100" />
                <div className="relative w-full h-full bg-white/5 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center text-muted-foreground/20 group-hover:text-primary transition-colors z-10">
                  <Zap className="h-8 w-8 sm:h-12 sm:w-12" />
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl font-black tracking-tighter mb-3 sm:mb-4">
                Command Ready
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground font-medium mb-8 sm:mb-12 max-w-md mx-auto leading-relaxed">
                You haven't deployed any modules yet. Start your empire by launching your first course.
              </p>
              <Link href="/instructor/courses/create">
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-8 sm:px-12 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-[11px] bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all group"
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Deploy First Module
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {analytics.courses.map((course, idx) => {
                const revenue = (course.price * course._count.enrollments).toFixed(2)
                return (
                  <div
                    key={course.id}
                    className="glass-card group rounded-[2rem] sm:rounded-[2.5rem] border-white/5 hover:border-primary/20 overflow-hidden flex flex-col h-full hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-500 animate-fadeInUp"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    {/* Card Top Accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-violet-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-6 sm:p-8 flex-grow">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4 sm:mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <Badge
                          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl font-black text-[7px] sm:text-[8px] uppercase tracking-[0.15em] border-none ${course.isPublished
                            ? "bg-emerald-400/10 text-emerald-400"
                            : "bg-amber-400/10 text-amber-400"
                            }`}
                        >
                          {course.isPublished ? "Live" : "Draft"}
                        </Badge>
                      </div>

                      {/* Title & Desc */}
                      <CardTitle className="text-lg sm:text-xl font-black tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs sm:text-[13px] leading-relaxed opacity-50 font-medium">
                        {course.description}
                      </CardDescription>

                      {/* Stats Row */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-5 sm:mt-7">
                        <div className="bg-white/[0.03] border border-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:border-primary/10 transition-colors">
                          <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.15em] text-muted-foreground opacity-50 mb-1">Rev</p>
                          <p className="text-base sm:text-lg font-black text-emerald-400 tracking-tighter leading-none">${revenue}</p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:border-primary/10 transition-colors">
                          <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.15em] text-muted-foreground opacity-50 mb-1">Students</p>
                          <p className="text-base sm:text-lg font-black text-foreground tracking-tighter leading-none">{course._count.enrollments}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-5 sm:p-6 pt-0 flex gap-2 sm:gap-3">
                      <Link href={`/instructor/courses/${course.id}/edit`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl glass border-white/10 font-black uppercase tracking-widest text-[8px] sm:text-[9px] hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button
                          variant="ghost"
                          className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl font-black uppercase tracking-widest text-[8px] sm:text-[9px] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                        >
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}

              {/* Add New Card */}
              <Link href="/instructor/courses/create">
                <div className="glass-card group rounded-[2rem] sm:rounded-[2.5rem] border-2 border-dashed border-white/10 hover:border-primary/30 flex flex-col items-center justify-center p-8 sm:p-12 min-h-[250px] sm:min-h-[300px] text-center hover:-translate-y-2 transition-all duration-500 cursor-pointer animate-fadeInUp" style={{ animationDelay: `${analytics.courses.length * 80}ms` }}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 border border-primary/20 rounded-xl sm:rounded-[1.5rem] flex items-center justify-center text-primary mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                    Deploy Module
                  </h3>
                  <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                    Initialize new course
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* ─── PERFORMANCE FOOTER ────────────────────────────────────────── */}
        <div className="mt-12 sm:mt-16 glass-card rounded-[2rem] sm:rounded-[3rem] border-white/5 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 border border-primary/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tighter">Elite Instructor</h3>
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 mt-1">
                  Top tier performance globally
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                Outstanding Rating
              </span>
            </div>
            <Link href="/instructor/courses/create" className="w-full md:w-auto">
              <Button className="w-full md:w-auto h-11 sm:h-12 px-8 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all group">
                Level Up <MoveRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}