"use client"

import React, { useState } from "react"
import { CourseCard } from "@/components/courses/course-card"
import { CourseCardSkeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Filter,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Zap,
  Star,
  ArrowRight,
  ChevronRight,
  Cpu,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"

const mockCourses = [
  {
    id: "1",
    title: "The Ultimate React Bootcamp 2024",
    description: "Master React from beginner to advanced with hands-on, production-grade projects used at top tech companies.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    price: 49.99,
    isPublished: true,
    category: { name: "Web Systems" },
    instructor: { name: "John Doe", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    chapters: [{ id: "c1", lessons: [{ id: "l1", duration: 120 }, { id: "l2", duration: 150 }, { id: "l3", duration: 90 }] }],
    reviews: [{ rating: 5 }, { rating: 4.8 }, { rating: 5 }],
    enrollments: Array(1250),
  },
  {
    id: "2",
    title: "Python for Data Science and AI",
    description: "Unlock the power of Python for advanced data analysis, machine learning models, and neural networks.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    price: 79.99,
    isPublished: true,
    category: { name: "Intelligence" },
    instructor: { name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    chapters: [{ id: "c2", lessons: [{ id: "l3", duration: 180 }, { id: "l4", duration: 200 }, { id: "l5", duration: 160 }] }],
    reviews: [{ rating: 4.9 }, { rating: 4.7 }, { rating: 5 }],
    enrollments: Array(2500),
  },
  {
    id: "3",
    title: "Flutter Mobile App Development",
    description: "Build beautiful, native-quality iOS and Android apps from a single codebase with Flutter and Dart.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    price: 59.99,
    isPublished: true,
    category: { name: "Native Flow" },
    instructor: { name: "Carlos Rossi", image: "https://randomuser.me/api/portraits/men/56.jpg" },
    chapters: [{ id: "c3", lessons: [{ id: "l5", duration: 160 }, { id: "l6", duration: 180 }, { id: "l7", duration: 140 }] }],
    reviews: [{ rating: 4.8 }, { rating: 4.6 }, { rating: 4.9 }],
    enrollments: Array(1800),
  },
  {
    id: "4",
    title: "Docker & Kubernetes: The Complete Guide",
    description: "Deploy and scale modern applications with containerization, orchestration, and infrastructure as code.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    price: 69.99,
    isPublished: true,
    category: { name: "Infrastructure" },
    instructor: { name: "Aisha Khan", image: "https://randomuser.me/api/portraits/women/65.jpg" },
    chapters: [{ id: "c4", lessons: [{ id: "l7", duration: 140 }, { id: "l8", duration: 190 }, { id: "l9", duration: 160 }] }],
    reviews: [{ rating: 4.9 }, { rating: 4.8 }, { rating: 4.7 }],
    enrollments: Array(1500),
  },
  {
    id: "5",
    title: "Node.js Backend Architecture Mastery",
    description: "Build high-performance REST APIs and microservices with Node.js, Express, MongoDB, and Redis.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    price: 59.99,
    isPublished: true,
    category: { name: "Web Systems" },
    instructor: { name: "Marcus Wells", image: "https://randomuser.me/api/portraits/men/42.jpg" },
    chapters: [{ id: "c5", lessons: [{ id: "l10", duration: 200 }, { id: "l11", duration: 175 }, { id: "l12", duration: 150 }] }],
    reviews: [{ rating: 5 }, { rating: 4.8 }],
    enrollments: Array(980),
  },
  {
    id: "6",
    title: "System Design for Senior Engineers",
    description: "Learn how to architect distributed systems, design databases at scale, and ace system design interviews.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    price: 0,
    isPublished: true,
    category: { name: "Architecture" },
    instructor: { name: "Priya Nair", image: "https://randomuser.me/api/portraits/women/29.jpg" },
    chapters: [{ id: "c6", lessons: [{ id: "l13", duration: 220 }, { id: "l14", duration: 190 }, { id: "l15", duration: 210 }] }],
    reviews: [{ rating: 4.9 }, { rating: 5 }, { rating: 4.8 }],
    enrollments: Array(3200),
  },
]

const categories = [
  { label: "All Domains", value: "all", icon: Globe, count: 384 },
  { label: "Web Systems", value: "web", icon: Layers, count: 98 },
  { label: "Intelligence", value: "data", icon: Cpu, count: 72 },
  { label: "Native Flow", value: "mobile", icon: Zap, count: 54 },
  { label: "Infrastructure", value: "devops", icon: TrendingUp, count: 68 },
]

const platformStats = [
  { label: "Active Students", value: "15,234", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "Expert Instructors", value: "142", icon: Award, color: "text-amber-400", bg: "bg-amber-400/10" },
  { label: "Elite Modules", value: "384", icon: BookOpen, color: "text-violet-400", bg: "bg-violet-400/10" },
  { label: "Success Rate", value: "98%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
]

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1800)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Fixed Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-[-5%] w-[55%] h-[60%] bg-primary/8 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[50%] bg-violet-700/5 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-pink-500/3 rounded-full blur-[100px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-52 lg:pb-36 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass border-primary/20 mb-6 sm:mb-8 animate-fadeIn">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary" />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary">
                384 Production-Grade Modules
              </span>
            </div>

            <h1 className="text-4xl xs:text-5xl lg:text-8xl font-black mb-6 sm:mb-8 leading-[0.95] tracking-tighter animate-fadeInUp">
              Master the{" "}
              <span className="text-gradient">
                Unknown
              </span>
            </h1>

            <p className="text-lg lg:text-2xl mb-12 sm:mb-16 text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed animate-fadeInUp delay-100 px-4">
              Project-driven learning for high-performance engineers.
              Join <strong className="text-foreground font-black">15,000+</strong> elite students mastering production-grade systems.
            </p>

            {/* Stat Nodes */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fadeInUp delay-200">
              {platformStats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card group p-5 sm:p-6 rounded-[2rem] border-white/5 hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 cursor-default"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-foreground mb-1 tracking-tighter tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STICKY SEARCH BAR ────────────────────────────────────────────── */}
      <div className="sticky top-16 sm:top-24 z-40 py-4 sm:py-5 glass border-y border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <Input
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-12 sm:h-14 text-sm sm:text-base border-white/5 bg-white/5 focus:bg-white/8 focus:border-primary/40 rounded-xl sm:rounded-2xl transition-all font-semibold placeholder:text-muted-foreground/40"
              />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              {/* Domain Filter */}
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="h-12 sm:h-14 flex-1 sm:min-w-[180px] border-white/5 bg-white/5 rounded-xl sm:rounded-2xl font-bold focus:ring-primary/30 focus:border-primary/40 text-xs sm:text-sm">
                  <SelectValue placeholder="All Domains" />
                </SelectTrigger>
                <SelectContent className="glass border-white/10 rounded-2xl shadow-2xl">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className="font-bold rounded-xl text-xs sm:text-sm">
                      {cat.label} ({cat.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 sm:h-14 flex-1 sm:min-w-[160px] border-white/5 bg-white/5 rounded-xl sm:rounded-2xl font-bold focus:ring-primary/30 text-xs sm:text-sm">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="glass border-white/10 rounded-2xl shadow-2xl">
                  <SelectItem value="popular" className="font-bold rounded-xl text-xs sm:text-sm">Most Popular</SelectItem>
                  <SelectItem value="newest" className="font-bold rounded-xl text-xs sm:text-sm">Newest</SelectItem>
                  <SelectItem value="rating" className="font-bold rounded-xl text-xs sm:text-sm">Highest Rated</SelectItem>
                  <SelectItem value="free" className="font-bold rounded-xl text-xs sm:text-sm">Free First</SelectItem>
                </SelectContent>
              </Select>

              <Button className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[11px] bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all shrink-0 ml-auto">
                <Filter className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CATEGORY PILLS ───────────────────────────────────────────────── */}
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  : "glass border-white/5 text-muted-foreground hover:text-foreground hover:border-primary/20"
                  }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
                <span className={`text-[9px] ${activeCategory === cat.value ? "opacity-70" : "opacity-40"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── COURSE GRID ──────────────────────────────────────────────────── */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
                Active <span className="text-gradient">Deployments</span>
              </h2>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                {mockCourses.length} modules synced • Updated daily
              </p>
            </div>
            <div className="flex gap-2 p-1.5 glass rounded-2xl border-white/5">
              {["Popular", "Trending", "New"].map((tab) => (
                <Button
                  key={tab}
                  variant="ghost"
                  size="sm"
                  className={`rounded-xl font-black uppercase tracking-widest text-[9px] px-4 h-9 transition-all ${tab === "Popular"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-white/10 text-muted-foreground"
                    }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))
              : mockCourses.map((course, i) => (
                <div
                  key={course.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-24 space-y-5">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="glass border-white/10 hover:border-primary/30 hover:bg-primary/5 h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-[11px] group shadow-2xl transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Syncing Nodes...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  Expand Horizon
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40">
              Showing {mockCourses.length} of 384 modules
            </p>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF MARQUEE ─────────────────────────────────────────── */}
      <section className="relative z-10 py-20 overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-4 text-center mb-12">
          <Badge className="glass border-white/10 font-black uppercase tracking-[0.25em] text-[9px] px-4 py-2 mb-6">
            Trusted by elite engineers
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            The <span className="text-gradient">Operator</span> Verdict
          </h2>
          <p className="text-muted-foreground font-medium max-w-xl mx-auto">
            Real engineers, real results. Our alumni are shipping at scale.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "The React course transformed my career in 6 weeks. Projects are production-grade and the teaching style is unlike anything I've seen.",
                name: "Emma Thompson",
                role: "Full Stack Eng. @ Stripe",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
                stars: 5,
              },
              {
                quote: "Best technical investment I've made. Python data science course got me a Senior ML role at a fintech unicorn.",
                name: "James Rodriguez",
                role: "ML Engineer @ Plaid",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
                stars: 5,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="glass-card p-10 rounded-[3rem] border-white/5 relative group hover:border-primary/20 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-semibold mb-8 text-foreground/90 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
                    <NextImage src={t.img} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-black text-lg leading-tight">{t.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-0.5">{t.role}</p>
                  </div>
                </div>
                {/* Decorative Quote */}
                <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                  <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-28">
        <div className="container mx-auto px-4">
          <div className="relative glass-card rounded-[4rem] p-16 lg:p-24 border-primary/20 overflow-hidden text-center">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-pink-500/10 opacity-60 pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] animate-float pointer-events-none" />
            {/* Top Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge className="glass border-primary/20 text-primary font-black uppercase tracking-[0.3em] text-[9px] px-5 py-2 mb-8 inline-flex">
                Join the 1% of Engineers
              </Badge>
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95]">
                Ready to Build{" "}
                <span className="text-gradient">Something Iconic?</span>
              </h2>
              <p className="text-xl mb-12 text-muted-foreground font-medium leading-relaxed">
                Enroll today and get instant access to our entire ecosystem.
                The future belongs to those who build it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="h-18 px-12 rounded-[1.75rem] text-base font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)] group transition-all"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-18 px-12 rounded-[1.75rem] text-base font-black uppercase tracking-widest glass border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    Browse Free Modules
                  </Button>
                </Link>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40 mt-10">
                No Lock-In • Cancel Anytime • Expert Support
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}