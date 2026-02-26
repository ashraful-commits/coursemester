import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
    Code2, Brain, Smartphone, Database, Cloud, Shield, Monitor,
    PenTool, BarChart3, Gamepad2, Cpu, Network, ChevronRight, Sparkles, BookOpen, Users
} from "lucide-react"

const categories = [
    {
        name: "Web Development",
        slug: "web",
        icon: Code2,
        color: "from-blue-500/20 to-cyan-500/10",
        glow: "shadow-blue-500/10",
        border: "border-blue-500/20",
        iconColor: "text-blue-400",
        badge: "bg-blue-500/10 text-blue-400",
        courses: 124,
        learners: "4.2K",
        description: "React, Next.js, Node.js, TypeScript and full-stack systems.",
        topCourses: ["React Bootcamp", "Full-Stack Developer", "TypeScript Mastery"],
    },
    {
        name: "Data Science & AI",
        slug: "data-science",
        icon: Brain,
        color: "from-violet-500/20 to-purple-500/10",
        glow: "shadow-violet-500/10",
        border: "border-violet-500/20",
        iconColor: "text-violet-400",
        badge: "bg-violet-500/10 text-violet-400",
        courses: 82,
        learners: "5.8K",
        description: "Machine learning, deep learning, NLP, and data analytics.",
        topCourses: ["Python for AI", "MLOps Mastery", "LLM Engineering"],
    },
    {
        name: "Mobile Development",
        slug: "mobile",
        icon: Smartphone,
        color: "from-pink-500/20 to-rose-500/10",
        glow: "shadow-pink-500/10",
        border: "border-pink-500/20",
        iconColor: "text-pink-400",
        badge: "bg-pink-500/10 text-pink-400",
        courses: 47,
        learners: "2.1K",
        description: "Flutter, React Native, Swift, Kotlin cross-platform apps.",
        topCourses: ["Flutter Complete", "React Native Pro", "iOS Bootcamp"],
    },
    {
        name: "Cloud & DevOps",
        slug: "devops",
        icon: Cloud,
        color: "from-sky-500/20 to-teal-500/10",
        glow: "shadow-sky-500/10",
        border: "border-sky-500/20",
        iconColor: "text-sky-400",
        badge: "bg-sky-500/10 text-sky-400",
        courses: 63,
        learners: "3.4K",
        description: "AWS, GCP, Docker, Kubernetes, CI/CD pipelines.",
        topCourses: ["AWS Solutions Architect", "K8s Mastery", "GitOps Pro"],
    },
    {
        name: "Databases",
        slug: "databases",
        icon: Database,
        color: "from-amber-500/20 to-orange-500/10",
        glow: "shadow-amber-500/10",
        border: "border-amber-500/20",
        iconColor: "text-amber-400",
        badge: "bg-amber-500/10 text-amber-400",
        courses: 38,
        learners: "1.9K",
        description: "SQL, PostgreSQL, MongoDB, Redis, graph databases.",
        topCourses: ["PostgreSQL Mastery", "MongoDB for Pros", "Redis Architecture"],
    },
    {
        name: "Cybersecurity",
        slug: "security",
        icon: Shield,
        color: "from-red-500/20 to-orange-500/10",
        glow: "shadow-red-500/10",
        border: "border-red-500/20",
        iconColor: "text-red-400",
        badge: "bg-red-500/10 text-red-400",
        courses: 29,
        learners: "1.3K",
        description: "Ethical hacking, penetration testing, network security.",
        topCourses: ["Ethical Hacking", "Web Security", "OWASP Top 10"],
    },
    {
        name: "System Design",
        slug: "system-design",
        icon: Network,
        color: "from-emerald-500/20 to-green-500/10",
        glow: "shadow-emerald-500/10",
        border: "border-emerald-500/20",
        iconColor: "text-emerald-400",
        badge: "bg-emerald-500/10 text-emerald-400",
        courses: 21,
        learners: "2.7K",
        description: "Scalable architecture, microservices, distributed systems.",
        topCourses: ["System Design Pro", "Microservices", "Event-Driven Architecture"],
    },
    {
        name: "Game Development",
        slug: "gamedev",
        icon: Gamepad2,
        color: "from-fuchsia-500/20 to-pink-500/10",
        glow: "shadow-fuchsia-500/10",
        border: "border-fuchsia-500/20",
        iconColor: "text-fuchsia-400",
        badge: "bg-fuchsia-500/10 text-fuchsia-400",
        courses: 18,
        learners: "980",
        description: "Unity, Unreal, Godot, game physics and mechanics.",
        topCourses: ["Unity Masterclass", "Unreal Engine 5", "Godot 4 Course"],
    },
    {
        name: "UI/UX Design",
        slug: "design",
        icon: PenTool,
        color: "from-indigo-500/20 to-violet-500/10",
        glow: "shadow-indigo-500/10",
        border: "border-indigo-500/20",
        iconColor: "text-indigo-400",
        badge: "bg-indigo-500/10 text-indigo-400",
        courses: 32,
        learners: "2.4K",
        description: "Figma, design systems, accessibility, and prototyping.",
        topCourses: ["Figma Mastery", "Design Systems", "UX Research Pro"],
    },
    {
        name: "Algorithms & DSA",
        slug: "algorithms",
        icon: Cpu,
        color: "from-teal-500/20 to-emerald-500/10",
        glow: "shadow-teal-500/10",
        border: "border-teal-500/20",
        iconColor: "text-teal-400",
        badge: "bg-teal-500/10 text-teal-400",
        courses: 25,
        learners: "3.8K",
        description: "Data structures, algorithms, interview preparation.",
        topCourses: ["LeetCode Mastery", "Graph Algorithms", "Dynamic Programming"],
    },
    {
        name: "Business Analytics",
        slug: "analytics",
        icon: BarChart3,
        color: "from-orange-500/20 to-amber-500/10",
        glow: "shadow-orange-500/10",
        border: "border-orange-500/20",
        iconColor: "text-orange-400",
        badge: "bg-orange-500/10 text-orange-400",
        courses: 19,
        learners: "1.1K",
        description: "Tableau, Power BI, SQL analytics, business intelligence.",
        topCourses: ["Power BI Complete", "Tableau Mastery", "SQL Analytics"],
    },
    {
        name: "Embedded & IoT",
        slug: "embedded",
        icon: Monitor,
        color: "from-lime-500/20 to-green-500/10",
        glow: "shadow-lime-500/10",
        border: "border-lime-500/20",
        iconColor: "text-lime-400",
        badge: "bg-lime-500/10 text-lime-400",
        courses: 14,
        learners: "640",
        description: "Raspberry Pi, Arduino, embedded systems, IoT protocols.",
        topCourses: ["Raspberry Pi Pro", "Arduino Mastery", "IoT Architecture"],
    },
]

export default function CategoriesPage() {
    const totalCourses = categories.reduce((s, c) => s + c.courses, 0)

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-24">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/8 rounded-full blur-[140px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[45%] bg-violet-600/5 rounded-full blur-[120px] animate-float" />
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Hero */}
            <section className="relative z-10 pt-36 pb-20 border-b border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 mb-8">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                            {totalCourses}+ Production-Grade Courses
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
                        Browse by <br />
                        <span className="text-gradient">Category</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto opacity-60">
                        Master any discipline. From web to AI, DevOps to system design — find the exact skills your career demands.
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="relative z-10 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {categories.map((cat, i) => (
                            <Link
                                key={cat.slug}
                                href={`/courses?category=${cat.slug}`}
                                className={`group glass-card rounded-[2.5rem] border ${cat.border} hover:border-opacity-60 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)] animate-fadeInUp relative overflow-hidden`}
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                {/* Gradient BG */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                                <div className="relative z-10">
                                    {/* Icon + Badge Row */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} border ${cat.border} flex items-center justify-center ${cat.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                                            <cat.icon className="w-7 h-7" />
                                        </div>
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${cat.badge}`}>
                                            {cat.courses} Courses
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-black tracking-tight mb-3 group-hover:text-foreground transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground font-medium opacity-60 leading-relaxed mb-6">
                                        {cat.description}
                                    </p>

                                    {/* Top Courses */}
                                    <div className="space-y-2 mb-6">
                                        {cat.topCourses.map((course, j) => (
                                            <div key={j} className="flex items-center gap-2.5 text-[11px] font-bold text-muted-foreground opacity-60 group-hover:opacity-80 transition-opacity">
                                                <div className={`w-1.5 h-1.5 rounded-full ${cat.iconColor.replace("text-", "bg-")} opacity-60`} />
                                                {course}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-5 border-t border-white/5">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                                            <Users className="w-3 h-3" />
                                            {cat.learners} learners
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${cat.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                            Explore All <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-20">
                <div className="container mx-auto px-4">
                    <div className="glass-card rounded-[4rem] border-primary/20 p-14 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-violet-500/5 pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto mb-8">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                                Can't Find Your Topic?
                            </h2>
                            <p className="text-lg text-muted-foreground font-medium opacity-60 mb-10 max-w-2xl mx-auto">
                                We add new courses every week. Search for any skill and you'll find it — or request it from our community.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/courses">
                                    <button className="h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] transition-all">
                                        Browse All Courses →
                                    </button>
                                </Link>
                                <Link href="/search">
                                    <button className="h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] glass border border-white/10 hover:border-primary/30 text-foreground transition-all">
                                        Search Topics
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
