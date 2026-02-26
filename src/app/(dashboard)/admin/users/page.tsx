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
    Users,
    Search,
    Filter,
    MoreVertical,
    ChevronLeft,
    ShieldCheck,
    Zap,
    GraduationCap,
    Briefcase,
    Mail,
    Calendar,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Loader2
} from "lucide-react"

interface User {
    id: string
    name: string
    email: string
    role: string
    image: string | null
    createdAt: string
    _count: {
        enrollments: number
        coursesCreated: number
    }
}

export default function AdminUsersPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("ALL")

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in")
            return
        }
        if (session?.user?.role !== "ADMIN") {
            router.push("/dashboard")
            return
        }
        fetchUsers()
    }, [status, session, router])

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/admin/users")
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            }
        } catch (error) {
            console.error("Failed to fetch users:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const response = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, role: newRole }),
            })
            if (response.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
            }
        } catch (error) {
            console.error("Failed to update role:", error)
        }
    }

    const filteredUsers = users.filter((u) => {
        const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = roleFilter === "ALL" || u.role === roleFilter
        return matchesSearch && matchesRole
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
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-primary/6 rounded-full blur-[100px]" />
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
                            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">Personnel Registry</span>
                            </div>
                            <h1 className="text-5xl font-black tracking-tighter leading-none mb-3">
                                Member <span className="text-gradient">Orchestration</span>
                            </h1>
                            <p className="text-muted-foreground font-medium">Managing {users.length} unique identities within the ecosystem.</p>
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
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 focus:border-primary/40 text-sm font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 gap-1 overflow-x-auto w-full md:w-auto">
                            {["ALL", "STUDENT", "INSTRUCTOR", "ADMIN"].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setRoleFilter(role)}
                                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${roleFilter === role ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-white/5"
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── USERS TABLE ───────────────────────────────────────── */}
                <div className="glass-card rounded-[3rem] border-white/5 overflow-hidden animate-fadeInUp">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5 hover:bg-transparent px-8">
                                <TableHead className="py-6 pl-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Member</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Permission</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic text-center">Modules</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Joined</TableHead>
                                <TableHead className="pr-10 text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center opacity-30">
                                            <Users className="w-16 h-16 mb-4" />
                                            <p className="font-black uppercase tracking-widest text-sm">No members found matching criteria</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-6 pl-10">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-12 w-12 rounded-2xl border-2 border-white/5 group-hover:border-primary/20 transition-colors shadow-lg">
                                                    <AvatarImage src={user.image || ""} />
                                                    <AvatarFallback className="bg-primary/10 text-primary font-black uppercase">
                                                        {user.name?.[0] || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-black tracking-tight text-base leading-none mb-1 group-hover:text-primary transition-colors">{user.name}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground opacity-50 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`px-3 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-widest border-none ${user.role === "ADMIN" ? "bg-red-500/10 text-red-400" :
                                                    user.role === "INSTRUCTOR" ? "bg-violet-500/10 text-violet-400" :
                                                        "bg-emerald-500/10 text-emerald-400"
                                                }`}>
                                                {user.role === "ADMIN" ? <ShieldCheck className="w-3 h-3 mr-1.5" /> :
                                                    user.role === "INSTRUCTOR" ? <GraduationCap className="w-3 h-3 mr-1.5" /> :
                                                        <Zap className="w-3 h-3 mr-1.5" />}
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="text-lg font-black tracking-tighter">{user.role === 'INSTRUCTOR' ? user._count.coursesCreated : user._count.enrollments}</div>
                                                <div className="text-[8px] font-black uppercase tracking-widest opacity-30">{user.role === 'INSTRUCTOR' ? 'Authored' : 'Targeted'}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-[11px] font-bold opacity-60">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(user.createdAt).toLocaleDateString()}
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
                                                        <p className="px-3 py-2 text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Shift Clearances</p>
                                                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, "STUDENT")} className="p-3 rounded-xl font-bold text-xs flex items-center gap-3 cursor-pointer">
                                                            <Zap className="w-4 h-4 text-emerald-400" /> Student Access
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, "INSTRUCTOR")} className="p-3 rounded-xl font-bold text-xs flex items-center gap-3 cursor-pointer">
                                                            <GraduationCap className="w-4 h-4 text-violet-400" /> Instructor Access
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, "ADMIN")} className="p-3 rounded-xl font-bold text-xs flex items-center gap-3 cursor-pointer text-red-400">
                                                            <ShieldCheck className="w-4 h-4" /> Admin Access
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
