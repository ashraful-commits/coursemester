"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    BookOpen,
    Search,
    Filter,
    MoreVertical,
    ChevronLeft,
    Settings,
    ShieldCheck,
    Zap,
    Globe,
    Trash2,
    Eye,
    Edit2,
    ExternalLink,
    DollarSign,
    Users,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Loader2,
    Power
} from "lucide-react"

interface Course {
    id: string
    title: string
    price: number
    isPublished: boolean
    level: string
    category: { name: string }
    instructor: { name: string; email: string; image: string | null }
    _count: { enrollments: number }
    createdAt: string
}

export default function AdminCoursesPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in")
            return
        }
        if (session?.user?.role !== "ADMIN") {
            router.push("/dashboard")
            return
        }
        fetchCourses()
    }, [status, session, router])

    const fetchCourses = async () => {
        try {
            const response = await fetch("/api/admin/courses")
            if (response.ok) {
                const data = await response.json()
                setCourses(data)
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error)
        } finally {
            setLoading(false)
        }
    }

    const togglePublish = async (courseId: string, currentStatus: boolean) => {
        try {
            const response = await fetch("/api/admin/courses", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId, isPublished: !currentStatus }),
            })
            if (response.ok) {
                setCourses(courses.map(c => c.id === courseId ? { ...c, isPublished: !currentStatus } : c))
            }
        } catch (error) {
            console.error("Failed to toggle publish status:", error)
        }
    }

    const deleteCourse = async (courseId: string) => {
        if (!confirm("Are you absolutely sure? This operation is irreversible and will purge all data associated with this module.")) return
        try {
            const response = await fetch("/api/admin/courses", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId }),
            })
            if (response.ok) {
                setCourses(courses.filter(c => c.id !== courseId))
            }
        } catch (error) {
            console.error("Failed to delete course:", error)
        }
    }

    const filteredCourses = courses.filter((c) => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "ALL" ||
            (statusFilter === "LIVE" && c.isPublished) ||
            (statusFilter === "DRAFT" && !c.isPublished)
        return matchesSearch && matchesStatus
    })

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-24">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-violet-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-blue-500/6 rounded-full blur-[100px]" />
            </div>

            {/* ─── HEADER ────────────────────────────────────────────── */}
            <div className="relative z-10 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl pt-12">
                <div className="container mx-auto px-4 pb-12">
                    <Link href="/admin">
                        <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[10px] -ml-3 group">
                            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Return to Grid
                        </Button>
                    </Link>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                        <div className="animate-fadeInUp">
                            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-5">
                                <BookOpen className="w-4 h-4 text-violet-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-400">Curriculum Core</span>
                            </div>
                            <h1 className="text-5xl font-black tracking-tighter leading-none mb-3">
                                Module <span className="text-gradient">Integrity</span>
                            </h1>
                            <p className="text-muted-foreground font-medium">Overseeing {courses.length} modules deployed across the secure network.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* ─── CONTROLS ─────────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40" />
                        <Input
                            placeholder="Search by title or architect..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 focus:border-primary/40 text-sm font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 gap-1 overflow-x-auto w-full md:w-auto">
                            {["ALL", "LIVE", "DRAFT"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${statusFilter === status ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-white/5"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── COURSES TABLE ─────────────────────────────────────── */}
                <div className="glass-card rounded-[3rem] border-white/5 overflow-hidden animate-fadeInUp">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5 hover:bg-transparent px-8">
                                <TableHead className="py-6 pl-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Operation</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Architect</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Valuation</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Status</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic text-center">Neural Sync</TableHead>
                                <TableHead className="pr-10 text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-24 text-center">
                                        <div className="flex flex-col items-center opacity-30">
                                            <BookOpen className="w-16 h-16 mb-4" />
                                            <p className="font-black uppercase tracking-widest text-sm">No modules found in registry</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCourses.map((course) => (
                                    <TableRow key={course.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-6 pl-10">
                                            <div>
                                                <p className="font-black tracking-tight text-base leading-none mb-1 group-hover:text-primary transition-colors">{course.title}</p>
                                                <Badge variant="ghost" className="p-0 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">{course.category.name}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 rounded-lg border border-white/10 group-hover:border-primary/20 transition-colors shadow-lg">
                                                    <AvatarImage src={course.instructor.image || ""} />
                                                    <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-black uppercase">{course.instructor.name?.[0] || 'A'}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-[11px] font-black tracking-tight">{course.instructor.name}</p>
                                                    <p className="text-[8px] font-bold text-muted-foreground opacity-40">{course.instructor.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 font-black text-emerald-400">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                <span className="text-base tracking-tighter">{course.price.toFixed(2)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`px-3 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-widest border-none ${course.isPublished ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                                                }`}>
                                                {course.isPublished ? <Globe className="w-3 h-3 mr-1.5" /> : <Power className="w-3 h-3 mr-1.5" />}
                                                {course.isPublished ? "Live" : "Draft"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="text-lg font-black tracking-tighter italic">{course._count.enrollments}</div>
                                                <div className="text-[8px] font-black uppercase tracking-widest opacity-30 text-blue-400 flex items-center gap-1"><Users className="w-2.5 h-2.5" /> Units</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="pr-10 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl glass border-white/5 hover:border-primary/20 hover:text-primary transition-all">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56 p-2 glass border-white/10 rounded-2xl shadow-2xl animate-fadeInDown">
                                                        <p className="px-3 py-2 text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Instruction Control</p>
                                                        <Link href={`/courses/${course.id}`}>
                                                            <DropdownMenuItem className="p-3 rounded-xl font-bold text-xs flex items-center gap-3 cursor-pointer">
                                                                <Eye className="w-4 h-4 text-blue-400" /> Inspect Module
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <DropdownMenuItem onClick={() => togglePublish(course.id, course.isPublished)} className="p-3 rounded-xl font-bold text-xs flex items-center gap-3 cursor-pointer">
                                                            <Power className={`w-4 h-4 ${course.isPublished ? 'text-amber-400' : 'text-emerald-400'}`} />
                                                            {course.isPublished ? 'Thermalize (Draft)' : 'Ignite (Live)'}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => deleteCourse(course.id)} className="p-3 rounded-xl font-bold text-xs flex items-center gap-3 cursor-pointer text-red-400">
                                                            <Trash2 className="w-4 h-4" /> Purge Resource
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
