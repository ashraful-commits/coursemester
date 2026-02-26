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
      <div className="relative z-10 pt-24 pb-8 sm:pt-32 sm:pb-14 border-b border-white/5 bg-white/[0.01] backdrop-blur-2xl">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
            <Target className="w-3 h-3 text-primary" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-primary">Learning Command Center</span>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          </div>
          <h1 className="text-3xl xs:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-3 sm:mb-4">
            My <span className="text-gradient">Learning</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-xl">
            Track your progress, continue learning, and earn certificates.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-14 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-16">
          {learningStats.map((stat, i) => (
            <div
              key={i}
              className={`glass-card group p-5 sm:p-7 rounded-[2rem] sm:rounded-[2.5rem] border ${stat.border} hover:-translate-y-2 transition-all duration-500 animate-fadeInUp`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bg} border ${stat.border} rounded-xl sm:rounded-2xl flex items-center justify-center ${stat.color} mb-4 sm:mb-5 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tighter mb-1 leading-none">{stat.value}</div>
              <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mt-1.5 sm:mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning Banner — last accessed */}
        {mockEnrolledCourses.find(c => c.progress < 100) && (
          <div className="glass-card rounded-[2rem] sm:rounded-[3rem] border-primary/20 p-6 sm:p-8 mb-8 sm:mb-12 relative overflow-hidden animate-fadeInUp delay-200">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/60 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-white/10">
                  <NextImage
                    src={mockEnrolledCourses[0].imageUrl}
                    alt={mockEnrolledCourses[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-1 sm:mb-1.5">
                    Continue Where You Left Off
                  </p>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">{mockEnrolledCourses[0].title}</h3>
                  <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mt-1">
                    Next: {mockEnrolledCourses[0].nextLesson}
                  </p>
                  <div className="flex items-center gap-3 mt-2 sm:mt-3">
                    <div className="flex-1 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden w-24 sm:w-48">
                      <div
                        className="h-full bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                        style={{ width: `${mockEnrolledCourses[0].progress}%` }}
                      />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black text-primary">{mockEnrolledCourses[0].progress}%</span>
                  </div>
                </div>
              </div>
              <Link href={`/courses/${mockEnrolledCourses[0].id}/learn`} className="w-full md:w-auto">
                <Button className="w-full md:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)] group transition-all shrink-0">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Resume
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex gap-1.5 p-1 glass rounded-xl sm:rounded-2xl border-white/5 w-full sm:w-auto">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-1 sm:flex-none px-3 xs:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {f === "all" ? `All (${mockEnrolledCourses.length})` :
                  f === "active" ? `Active (${mockEnrolledCourses.filter(c => c.progress < 100).length})` :
                    `Done (${mockEnrolledCourses.filter(c => c.progress === 100).length})`}
              </button>
            ))}
          </div>
          <Link href="/courses" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto glass border-white/10 h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:border-primary/30 transition-all">
              + Enroll More
            </Button>
          </Link>
        </div>

        {/* Course Cards */}
        <div className="space-y-4 sm:space-y-6">
          {filtered.map((course, i) => (
            <div
              key={course.id}
              className="glass-card group rounded-[2rem] sm:rounded-[2.5rem] border-white/5 hover:border-primary/20 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] animate-fadeInUp"
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
                      <div className="w-12 h-12 sm:w-16 sm:h-16 glass rounded-full flex items-center justify-center text-emerald-400 shadow-2xl">
                        <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 fill-emerald-400/20" />
                      </div>
                    </div>
                  )}
                  {/* Progress bar overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-black/40">
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
                <div className="flex-1 p-5 sm:p-8">
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <Badge className="glass border-white/10 text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                          {course.category}
                        </Badge>
                        {course.certificateEarned && (
                          <Badge className="bg-amber-400/10 text-amber-400 border-none text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                            <Award className="w-2.5 h-2.5 mr-1" />
                            Certified
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-3 sm:mb-5">
                        by {course.instructor.name}
                      </p>

                      {/* Progress */}
                      <div className="mb-4 sm:mb-5">
                        <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                            {course.completedLessons}/{course.totalLessons} modules
                          </span>
                          <span className={`text-[9px] sm:text-[10px] font-black ${course.progress === 100 ? "text-emerald-400" : "text-primary"}`}>
                            {course.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden ring-1 ring-white/5">
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
                      <div className="flex flex-wrap gap-3 sm:gap-5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground opacity-50">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> {course.totalHours}h
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" /> {course.lastAccessed}
                        </div>
                        {course.nextLesson && (
                          <div className="flex items-center gap-1.5">
                            <PlayCircle className="w-3 h-3 text-primary opacity-100" />
                            <span className="text-primary opacity-100">Next: {course.nextLesson.slice(0, 20)}...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 items-center sm:items-start lg:items-end justify-start sm:justify-start lg:justify-center lg:min-w-[180px] lg:pl-6 lg:border-l border-white/5 pt-3 sm:pt-0 border-t sm:border-t-0 lg:border-t-0">
                      {course.progress === 100 ? (
                        <>
                          <Link href={`/courses/${course.id}/learn`} className="flex-1 sm:flex-none w-full lg:w-auto">
                            <Button variant="outline" className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[8px] sm:text-[9px] hover:border-primary/30 transition-all">
                              Review
                            </Button>
                          </Link>
                          <Link href={`/courses/${course.id}/certificate`} className="flex-1 sm:flex-none w-full lg:w-auto">
                            <Button className="h-11 sm:h-12 px-4 sm:px-6 rounded-xl sm:rounded-2xl glass border-amber-400/20 bg-amber-400/10 text-amber-400 font-black uppercase tracking-widest text-[8px] sm:text-[9px] hover:bg-amber-400/20 transition-all w-full lg:w-auto">
                              Certificate
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <Link href={`/courses/${course.id}/learn`} className="flex-1 sm:flex-none w-full lg:w-auto">
                          <Button className="w-full h-11 sm:h-12 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[8px] sm:text-[9px] bg-primary hover:bg-primary/90 shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all group">
                            Continue
                            <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/courses/${course.id}`} className="flex-1 sm:flex-none w-full lg:w-auto">
                        <Button variant="ghost" className="w-full h-11 sm:h-12 px-4 sm:px-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[8px] sm:text-[9px] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
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
          <div className="glass-card rounded-[2.5rem] sm:rounded-[4rem] border-white/5 p-12 sm:p-24 text-center animate-fadeInUp">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 sm:mb-8 text-muted-foreground/20">
              <BookOpen className="w-8 h-8 sm:w-12 sm:h-12" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tighter mb-3 sm:mb-4">No content found</h3>
            <p className="text-sm sm:text-muted-foreground font-medium mb-8 sm:mb-10">
              {activeFilter === "completed" ? "Complete a module to archive it here." : "Initiate a course to track progress."}
            </p>
            <Link href="/courses">
              <Button className="h-12 sm:h-14 px-8 sm:px-10 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-[11px] bg-primary hover:bg-primary/90">
                Browse Modules
              </Button>
            </Link>
          </div>
        )}

        {/* Achievement Banner */}
        {mockEnrolledCourses.some(c => c.certificateEarned) && (
          <div className="glass-card rounded-[2rem] sm:rounded-[3rem] border-amber-400/20 p-6 sm:p-10 mt-8 sm:mt-12 relative overflow-hidden animate-fadeInUp">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/8 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-400/10 border border-amber-400/30 rounded-xl sm:rounded-2xl flex items-center justify-center text-amber-400">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">Certification Unlocked</h3>
                  <p className="text-[11px] sm:text-sm text-muted-foreground font-medium opacity-60">
                    Elite credentials ready for retrieval.
                  </p>
                </div>
              </div>
              <Link href="/courses/2/certificate" className="w-full md:w-auto">
                <Button className="w-full md:w-auto h-12 px-8 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-amber-400 hover:bg-amber-400/90 text-black shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all">
                  Get Certificate
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
