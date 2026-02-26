"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Search, Star, Clock, Users, Filter, SlidersHorizontal, BookOpen,
    ArrowRight, CheckCircle, X, ChevronDown
} from "lucide-react"

const allCourses = [
    { id: "1", title: "The Ultimate React Bootcamp 2024", description: "Master React from beginner to advanced with hands-on projects.", imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop", price: 49.99, originalPrice: 129.99, category: "Web Systems", instructor: "John Doe", rating: 4.9, reviews: 3420, totalHours: 52, lessons: 210, level: "Beginner", tags: ["react", "javascript", "frontend"] },
    { id: "2", title: "Python for Data Science and AI", description: "Unlock the power of Python for data analysis and machine learning.", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop", price: 79.99, originalPrice: 199.99, category: "Intelligence", instructor: "Jane Smith", rating: 4.9, reviews: 2341, totalHours: 42, lessons: 180, level: "Intermediate", tags: ["python", "data science", "ai", "machine learning"] },
    { id: "3", title: "Flutter Mobile App Development", description: "Build iOS and Android apps from a single codebase.", imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop", price: 59.99, originalPrice: 149.99, category: "Mobile", instructor: "Carlos Rossi", rating: 4.8, reviews: 1876, totalHours: 38, lessons: 155, level: "Intermediate", tags: ["flutter", "dart", "mobile", "ios", "android"] },
    { id: "4", title: "Docker & Kubernetes: The Complete Guide", description: "Deploy and scale modern applications with containerization.", imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop", price: 69.99, originalPrice: 179.99, category: "Infrastructure", instructor: "Aisha Khan", rating: 4.8, reviews: 1987, totalHours: 38, lessons: 160, level: "Advanced", tags: ["docker", "kubernetes", "devops", "containers"] },
    { id: "5", title: "Node.js Backend Architecture Mastery", description: "Build high-performance REST APIs and microservices.", imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop", price: 59.99, originalPrice: 149.99, category: "Web Systems", instructor: "Marcus Wells", rating: 5.0, reviews: 876, totalHours: 28, lessons: 112, level: "Intermediate", tags: ["nodejs", "backend", "api", "javascript"] },
    { id: "6", title: "AWS Solutions Architect Masterclass", description: "Design and deploy scalable cloud infrastructure on AWS.", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop", price: 89.99, originalPrice: 219.99, category: "Infrastructure", instructor: "Sara Chen", rating: 4.7, reviews: 1432, totalHours: 45, lessons: 195, level: "Advanced", tags: ["aws", "cloud", "architecture", "devops"] },
]

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
const sortOptions = ["Most Relevant", "Highest Rated", "Newest", "Price: Low to High", "Price: High to Low"]

function SearchResults() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""

    const [searchQuery, setSearchQuery] = useState(query)
    const [activeLevel, setActiveLevel] = useState("All Levels")
    const [sortBy, setSortBy] = useState("Most Relevant")
    const [maxPrice, setMaxPrice] = useState<number | null>(null)
    const [showFilters, setShowFilters] = useState(false)

    const results = allCourses.filter((c) => {
        const q = searchQuery.toLowerCase()
        const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags.some(t => t.includes(q)) || c.category.toLowerCase().includes(q)
        const matchesLevel = activeLevel === "All Levels" || c.level === activeLevel
        const matchesPrice = !maxPrice || c.price <= maxPrice
        return matchesQuery && matchesLevel && matchesPrice
    })

    const sorted = [...results].sort((a, b) => {
        if (sortBy === "Highest Rated") return b.rating - a.rating
        if (sortBy === "Price: Low to High") return a.price - b.price
        if (sortBy === "Price: High to Low") return b.price - a.price
        return 0
    })

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-24">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/6 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] animate-float" />
            </div>

            {/* Header / Search Bar */}
            <div className="relative z-10 pt-32 pb-10 border-b border-white/5 bg-white/[0.01] backdrop-blur-2xl">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <div className="relative mb-6">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground opacity-40" />
                            <Input
                                className="h-16 pl-14 pr-6 rounded-2xl bg-white/5 border-white/10 focus:border-primary/40 text-lg font-semibold placeholder:font-normal placeholder:opacity-40 transition-all"
                                placeholder="Search for courses, topics, or skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-muted-foreground">
                                {sorted.length > 0
                                    ? <><span className="text-foreground font-black">{sorted.length.toLocaleString()}</span> results{searchQuery ? ` for "${searchQuery}"` : ""}</>
                                    : searchQuery ? `No results for "${searchQuery}"` : "Showing all courses"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 relative z-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Filters Sidebar */}
                    <div className="lg:w-72 shrink-0">
                        <div className="glass-card rounded-3xl border-white/5 p-6 sticky top-28">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-black text-lg flex items-center gap-2">
                                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                                    Filters
                                </h3>
                                <button
                                    onClick={() => { setActiveLevel("All Levels"); setMaxPrice(null); setSortBy("Most Relevant") }}
                                    className="text-[9px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Level Filter */}
                            <div className="mb-8">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-4">Level</p>
                                <div className="space-y-2">
                                    {levels.map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setActiveLevel(level)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-[11px] font-black uppercase tracking-widest transition-all ${activeLevel === level
                                                    ? "bg-primary/10 text-primary border border-primary/20"
                                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${activeLevel === level ? "bg-primary border-primary" : "border-white/20"
                                                }`}>
                                                {activeLevel === level && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
                                            </div>
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-8">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-4">Max Price</p>
                                <div className="space-y-2">
                                    {[null, 50, 70, 90].map((price) => (
                                        <button
                                            key={price ?? "any"}
                                            onClick={() => setMaxPrice(price)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-[11px] font-black uppercase tracking-widest transition-all ${maxPrice === price
                                                    ? "bg-primary/10 text-primary border border-primary/20"
                                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${maxPrice === price ? "bg-primary border-primary" : "border-white/20"
                                                }`}>
                                                {maxPrice === price && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
                                            </div>
                                            {price ? `Under $${price}` : "Any Price"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-4">Sort By</p>
                                <div className="space-y-2">
                                    {sortOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setSortBy(opt)}
                                            className={`w-full p-3 rounded-xl text-left text-[11px] font-black uppercase tracking-widest transition-all ${sortBy === opt ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="flex-1">
                        {sorted.length === 0 ? (
                            <div className="glass-card rounded-[4rem] border-white/5 p-24 text-center animate-fadeInUp">
                                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-muted-foreground/20">
                                    <Search className="w-12 h-12" />
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-4">No results found</h3>
                                <p className="text-muted-foreground font-medium mb-8 max-w-sm mx-auto">
                                    Try a different search term or remove some filters.
                                </p>
                                <Button onClick={() => { setSearchQuery(""); setActiveLevel("All Levels"); setMaxPrice(null) }} className="h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-primary hover:bg-primary/90">
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {sorted.map((course, i) => (
                                    <div
                                        key={course.id}
                                        className="glass-card group rounded-3xl border-white/5 hover:border-primary/20 overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-fadeInUp"
                                        style={{ animationDelay: `${i * 60}ms` }}
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <Link href={`/courses/${course.id}`} className="relative md:w-64 h-44 md:h-auto shrink-0 overflow-hidden">
                                                <NextImage src={course.imageUrl} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10 md:to-background/30" />
                                            </Link>
                                            <div className="flex-1 p-8">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                                            <Badge className="glass border-white/10 text-[8px] font-black uppercase tracking-widest">{course.category}</Badge>
                                                            <Badge className="bg-amber-500/10 text-amber-400 border-none text-[8px] font-black uppercase tracking-widest">{course.level}</Badge>
                                                        </div>
                                                        <Link href={`/courses/${course.id}`}>
                                                            <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors mb-1 line-clamp-2">
                                                                {course.title}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-sm text-muted-foreground font-medium opacity-60 line-clamp-2 mb-3">{course.description}</p>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 mb-4">
                                                            by {course.instructor}
                                                        </p>
                                                        <div className="flex flex-wrap items-center gap-5 text-[10px] font-black uppercase tracking-wider text-muted-foreground opacity-50">
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                                <span className="text-amber-400">{course.rating}</span>
                                                                <span>({course.reviews.toLocaleString()})</span>
                                                            </div>
                                                            <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.totalHours}h</div>
                                                            <div className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.lessons} lessons</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <div className="text-2xl font-black tracking-tighter">${course.price}</div>
                                                        <div className="text-xs line-through text-muted-foreground opacity-40">${course.originalPrice}</div>
                                                        <div className="text-[9px] font-black text-emerald-400 mt-1">
                                                            {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                                                        </div>
                                                        <Link href={`/courses/${course.id}`} className="block mt-4">
                                                            <Button size="sm" className="h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[9px] bg-primary hover:bg-primary/90 shadow-[0_0_15px_hsl(var(--primary)/0.2)] w-full">
                                                                View <ArrowRight className="w-3 h-3 ml-1" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
