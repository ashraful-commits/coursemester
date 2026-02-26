"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Users,
    BookOpen,
    DollarSign,
    TrendingUp,
    Settings,
    ShieldCheck,
    ChevronRight,
    Plus,
    ArrowUpRight,
    Activity,
    Layers,
    Search,
    Zap,
    LayoutGrid,
    BarChart3,
    Clock,
    ShieldAlert
} from "lucide-react"

interface AdminStats {
    totalUsers: number
    totalCourses: number
    totalRevenue: number
    activeUsers24h: number
}

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [stats, setStats] = useState<AdminStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in")
            return
        }
        if (session?.user?.role !== "ADMIN") {
            router.push("/dashboard")
            return
        }
        // Simulate fetching stats
        setStats({
            totalUsers: 15420,
            totalCourses: 382,
            totalRevenue: 245600,
            activeUsers24h: 842
        })
        setLoading(false)
    }, [status, session, router])

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
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Admin Uplink</p>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40 mt-1">Authenticating Overseer Systems</p>
                    </div>
                </div>
            </div>
        )
    }

    const statNodes = [
        { label: "Elite Members", value: stats?.totalUsers.toLocaleString(), icon: Users, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", trend: "+12.4%", desc: "Lifetime registrations" },
        { label: "Active Modules", value: stats?.totalCourses, icon: BookOpen, color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20", trend: "+4", desc: "Across all categories" },
        { label: "System Revenue", value: `$${stats?.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", trend: "+24.5%", desc: "Gross platform earnings" },
        { label: "Neural Activity", value: stats?.activeUsers24h, icon: Activity, color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20", trend: "+84", desc: "Active in last 24h" },
    ]

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-24">
            {/* Background Blobs */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-violet-600/10 rounded-full blur-[100px] animate-float" />
                <div className="absolute top-[30%] right-[5%] w-[20%] h-[20%] bg-pink-500/5 rounded-full blur-[80px]" />
            </div>

            {/* ─── HEADER ────────────────────────────────────────────── */}
            <div className="relative z-10 border-b border-white/5 bg-white/[0.01] backdrop-blur-2xl">
                <div className="container mx-auto px-4 py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                        <div className="animate-fadeInUp">
                            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Overlord Authority Level 4</span>
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-4">
                                Command <br />
                                <span className="text-gradient">Center</span>
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
                                Platform-wide orchestration. Manage users, monitor course integrity, and track global ecosystem metrics.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 animate-fadeInUp delay-100">
                            <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.4)] font-black uppercase tracking-widest text-[11px] group">
                                <ShieldAlert className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                System Logs
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[11px]">
                                <Settings className="w-5 h-5 mr-3" />
                                Global Config
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* ─── STATS GRID ────────────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {statNodes.map((stat, i) => (
                        <div
                            key={i}
                            className={`glass-card group p-8 rounded-[2.5rem] border ${stat.border} hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-500 animate-fadeInUp`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className={`w-14 h-14 ${stat.bg} border ${stat.border} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    <stat.icon className="w-7 h-7" />
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-black tracking-tighter mb-2">{stat.value}</div>
                                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-1">{stat.label}</div>
                                <p className="text-[10px] text-muted-foreground opacity-30 font-medium">{stat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ─── COMMAND LAYERS ─────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* User Management Module */}
                    <Link href="/admin/users" className="lg:col-span-1 group">
                        <div className="glass-card h-full p-10 rounded-[3rem] border-white/5 hover:border-blue-400/30 transition-all duration-700 relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-blue-400/10 border border-blue-400/20 rounded-[2rem] flex items-center justify-center text-blue-400 mb-8 mx-auto group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                                    <Users className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-blue-400 transition-colors">User Protocols</h3>
                                <p className="text-muted-foreground font-medium opacity-60 mb-8 leading-relaxed">
                                    Monitor elite members, adjust clearance levels, and manage account status globally.
                                </p>
                                <div className="flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-blue-400">
                                    Access Management <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Course Control Module */}
                    <Link href="/admin/courses" className="lg:col-span-1 group">
                        <div className="glass-card h-full p-10 rounded-[3rem] border-white/5 hover:border-violet-400/30 transition-all duration-700 relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-violet-400/10 border border-violet-400/20 rounded-[2rem] flex items-center justify-center text-violet-400 mb-8 mx-auto group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                                    <Layers className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-violet-400 transition-colors">Course Core</h3>
                                <p className="text-muted-foreground font-medium opacity-60 mb-8 leading-relaxed">
                                    Oversee all education modules, approve high-grade content, and ensure system-wide integrity.
                                </p>
                                <div className="flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-violet-400">
                                    Resource Analysis <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Platform Analytics Module */}
                    <Link href="/admin/analytics" className="lg:col-span-1 group">
                        <div className="glass-card h-full p-10 rounded-[3rem] border-white/5 hover:border-emerald-400/30 transition-all duration-700 relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-emerald-400/10 border border-emerald-400/20 rounded-[2rem] flex items-center justify-center text-emerald-400 mb-8 mx-auto group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                                    <BarChart3 className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-emerald-400 transition-colors">Platform Vision</h3>
                                <p className="text-muted-foreground font-medium opacity-60 mb-8 leading-relaxed">
                                    Deep intelligence into growth, retention, and financial performance of the CodeMaster ecosystem.
                                </p>
                                <div className="flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-400">
                                    Neural Insights <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* ─── SYSTEM STATUS ───────────────────────────────────────── */}
                <div className="glass-card p-12 rounded-[3.5rem] border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
                            <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center relative">
                                <Zap className="w-12 h-12 text-primary animate-pulse" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-4 border-background" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black tracking-tighter mb-2 italic">Neural Network Stable</h3>
                                <p className="text-muted-foreground font-medium opacity-60 max-w-lg leading-relaxed">
                                    All platform nodes are operational. System latency is currently <span className="text-emerald-400 font-bold">14ms</span>. Automated containment protocols remain active.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col xs:flex-row gap-8 items-center">
                            <div className="text-center">
                                <div className="text-3xl font-black tracking-tighter text-emerald-400">99.9%</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 mt-1">Uptime</div>
                            </div>
                            <div className="w-px h-12 bg-white/10 hidden xs:block" />
                            <div className="text-center">
                                <div className="text-3xl font-black tracking-tighter text-blue-400">12.4K</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 mt-1">API Requests</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
