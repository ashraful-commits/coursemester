"use client"

import { useState } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen, Clock, Award, TrendingUp, PlayCircle, CheckCircle,
  Target, Star, Calendar, Download, ArrowRight, ChevronRight, Trophy, Zap, BarChart3
} from "lucide-react"

const mockEnrolledCourses = [
  {
    id: "1",
    title: "The Ultimate React Bootcamp 2024",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    instructor: { name: "John Doe" },
    category: "Web Systems",
    progress: 68,
    totalLessons: 42,
    completedLessons: 28,
    totalHours: 52,
    lastAccessed: "2 hours ago",
    nextLesson: "Advanced Hooks Patterns",
    certificateEarned: false,
    rating: 4.9,
  },
  {
    id: "2",
    title: "Python for Data Science and AI",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    instructor: { name: "Jane Smith" },
    category: "Intelligence",
    progress: 100,
    totalLessons: 60,
    completedLessons: 60,
    totalHours: 42,
    lastAccessed: "3 days ago",
    nextLesson: null,
    certificateEarned: true,
    rating: 4.9,
  },
  {
    id: "4",
    title: "Docker & Kubernetes: The Complete Guide",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    instructor: { name: "Aisha Khan" },
    category: "Infrastructure",
    progress: 23,
    totalLessons: 55,
    completedLessons: 13,
    totalHours: 38,
    lastAccessed: "1 week ago",
    nextLesson: "Container Networking Deep Dive",
    certificateEarned: false,
    rating: 4.8,
  },
]

const learningStats = [
  { label: "Days Streak", value: "14", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  { label: "Hours Learned", value: "87", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { label: "Courses Active", value: "3", icon: BookOpen, color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20" },
  { label: "Certificates", value: "1", icon: Award, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
]

export default function MyLearningPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "completed">("all")

  const filtered = mockEnrolledCourses.filter((c) => {
    if (activeFilter === "active") return c.progress < 100
    if (activeFilter === "completed") return c.progress === 100
    return true
  })

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-5%] w-[45%] h-[45%] bg-primary/8 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-[-5%] w-[35%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-32 pb-14 border-b border-white/5 bg-white/[0.01] backdrop-blur-2xl">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Target className="w-3 h-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary">Learning Command Center</span>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-4">
            My <span className="text-gradient">Learning</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl">
            Track your progress, continue learning, and earn certificates.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {learningStats.map((stat, i) => (
            <div
              key={i}
              className={`glass-card group p-7 rounded-[2.5rem] border ${stat.border} hover:-translate-y-2 transition-all duration-500 animate-fadeInUp`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-12 h-12 ${stat.bg} border ${stat.border} rounded-2xl flex items-center justify-center ${stat.color} mb-5 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black tracking-tighter mb-1 leading-none">{stat.value}</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning Banner — last accessed */}
        {mockEnrolledCourses.find(c => c.progress < 100) && (
          <div className="glass-card rounded-[3rem] border-primary/20 p-8 mb-12 relative overflow-hidden animate-fadeInUp delay-200">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/60 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                  <NextImage
                    src={mockEnrolledCourses[0].imageUrl}
                    alt={mockEnrolledCourses[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-1.5">
                    Continue Where You Left Off
                  </p>
                  <h3 className="text-xl font-black tracking-tight">{mockEnrolledCourses[0].title}</h3>
                  <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mt-1">
                    Next: {mockEnrolledCourses[0].nextLesson} • Accessed {mockEnrolledCourses[0].lastAccessed}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-48">
                      <div
                        className="h-full bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                        style={{ width: `${mockEnrolledCourses[0].progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-primary">{mockEnrolledCourses[0].progress}%</span>
                  </div>
                </div>
              </div>
              <Link href={`/courses/${mockEnrolledCourses[0].id}/learn`}>
                <Button className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)] group transition-all shrink-0">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Resume Learning
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-2 p-1.5 glass rounded-2xl border-white/5">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {f === "all" ? `All (${mockEnrolledCourses.length})` :
                  f === "active" ? `In Progress (${mockEnrolledCourses.filter(c => c.progress < 100).length})` :
                    `Completed (${mockEnrolledCourses.filter(c => c.progress === 100).length})`}
              </button>
            ))}
          </div>
          <Link href="/courses">
            <Button variant="outline" size="sm" className="glass border-white/10 h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:border-primary/30 transition-all">
              + Enroll More
            </Button>
          </Link>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          {filtered.map((course, i) => (
            <div
              key={course.id}
              className="glass-card group rounded-[2.5rem] border-white/5 hover:border-primary/20 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="p-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col lg:flex-row gap-0">
                {/* Thumbnail */}
                <div className="relative lg:w-72 h-44 lg:h-auto shrink-0 overflow-hidden rounded-t-[2.5rem] lg:rounded-l-[2.5rem] lg:rounded-tr-none">
                  <NextImage
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30" />
                  {course.progress === 100 && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-emerald-400 shadow-2xl">
                        <CheckCircle className="w-8 h-8 fill-emerald-400/20" />
                      </div>
                    </div>
                  )}
                  {/* Progress bar overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${course.progress === 100
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                        : "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                        }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8">
                  <div className="flex flex-col lg:flex-row gap-6 h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="glass border-white/10 text-[8px] font-black uppercase tracking-widest">
                          {course.category}
                        </Badge>
                        {course.certificateEarned && (
                          <Badge className="bg-amber-400/10 text-amber-400 border-none text-[8px] font-black uppercase tracking-widest">
                            <Award className="w-2.5 h-2.5 mr-1" />
                            Certified
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-2xl font-black tracking-tight mb-1 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-5">
                        by {course.instructor.name}
                      </p>

                      {/* Progress */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                            {course.completedLessons}/{course.totalLessons} lessons completed
                          </span>
                          <span className={`text-[10px] font-black ${course.progress === 100 ? "text-emerald-400" : "text-primary"}`}>
                            {course.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden ring-1 ring-white/5">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${course.progress === 100
                              ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                              : "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
                              }`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-5 text-[10px] font-black uppercase tracking-wider text-muted-foreground opacity-50">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> {course.totalHours}h total
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" /> {course.lastAccessed}
                        </div>
                        {course.nextLesson && (
                          <div className="flex items-center gap-1.5">
                            <PlayCircle className="w-3 h-3 text-primary opacity-100" />
                            <span className="text-primary opacity-100">Next: {course.nextLesson}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-row lg:flex-col gap-3 items-start lg:items-end justify-start lg:justify-center lg:min-w-[180px] lg:pl-6 lg:border-l border-white/5">
                      {course.progress === 100 ? (
                        <>
                          <Link href={`/courses/${course.id}/learn`} className="w-full lg:w-auto">
                            <Button variant="outline" className="w-full h-12 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[9px] hover:border-primary/30 transition-all">
                              <PlayCircle className="w-3.5 h-3.5 mr-2" />
                              Review
                            </Button>
                          </Link>
                          <Link href={`/courses/${course.id}/certificate`} className="w-full lg:w-auto">
                            <Button className="h-12 px-6 rounded-2xl glass border-amber-400/20 bg-amber-400/10 text-amber-400 font-black uppercase tracking-widest text-[9px] hover:bg-amber-400/20 transition-all w-full lg:w-auto">
                              <Award className="w-3.5 h-3.5 mr-2" />
                              Certificate
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <Link href={`/courses/${course.id}/learn`} className="w-full lg:w-auto">
                          <Button className="w-full h-12 px-6 rounded-2xl font-black uppercase tracking-widest text-[9px] bg-primary hover:bg-primary/90 shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all group">
                            <PlayCircle className="w-3.5 h-3.5 mr-2" />
                            Continue
                            <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/courses/${course.id}`} className="w-full lg:w-auto">
                        <Button variant="ghost" className="w-full h-12 px-5 rounded-2xl font-black uppercase tracking-widest text-[9px] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                          <BarChart3 className="w-3.5 h-3.5 mr-2" />
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass-card rounded-[4rem] border-white/5 p-24 text-center animate-fadeInUp">
            <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-muted-foreground/20">
              <BookOpen className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4">No courses here yet</h3>
            <p className="text-muted-foreground font-medium mb-10">
              {activeFilter === "completed" ? "Complete a course to see it here." : "Enroll in a course to get started."}
            </p>
            <Link href="/courses">
              <Button className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-primary hover:bg-primary/90">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}

        {/* Achievement Banner */}
        {mockEnrolledCourses.some(c => c.certificateEarned) && (
          <div className="glass-card rounded-[3rem] border-amber-400/20 p-10 mt-12 relative overflow-hidden animate-fadeInUp">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/8 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center text-amber-400">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">You've Earned a Certificate!</h3>
                  <p className="text-sm text-muted-foreground font-medium opacity-60">
                    Python for Data Science and AI • Completed with distinction
                  </p>
                </div>
              </div>
              <Link href="/courses/2/certificate">
                <Button className="h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-amber-400 hover:bg-amber-400/90 text-black shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all group shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
