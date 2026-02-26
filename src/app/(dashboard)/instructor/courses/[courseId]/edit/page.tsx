"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ChevronLeft, Plus, Settings, PlayCircle, FileText,
    Video, Save, Trash2, GripVertical, CheckCircle,
    Layout, Eye, Globe, Lock, MoreVertical, Layers, Target, Info
} from "lucide-react"

export default function CourseEditorPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = use(params)

    const [activeTab, setActiveTab] = useState("curriculum")
    const [chapters, setChapters] = useState([
        {
            id: "ch1",
            title: "Architecture Fundamentals",
            lessons: [
                { id: "l1", title: "The Rendering Engine", duration: "18:00", type: "video" },
                { id: "l2", title: "Component Synthesis", duration: "24:00", type: "video" }
            ]
        }
    ])

    const addChapter = () => {
        const newChapter = {
            id: `ch-${Date.now()}`,
            title: "New Module Heading",
            lessons: []
        }
        setChapters([...chapters, newChapter])
    }

    const addLesson = (chapterId: string) => {
        setChapters(chapters.map(ch => {
            if (ch.id === chapterId) {
                return {
                    ...ch,
                    lessons: [...ch.lessons, { id: `l-${Date.now()}`, title: "New Operation Unit", duration: "00:00", type: "video" }]
                }
            }
            return ch
        }))
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-40">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] animate-float" />
            </div>

            {/* Editor Header */}
            <div className="relative z-40 pt-20 pb-4 sm:pt-32 sm:pb-6 border-b border-white/5 bg-background/80 backdrop-blur-xl fixed top-0 left-0 right-0 px-4 sm:px-8 flex items-center justify-between min-h-[80px] sm:min-h-[100px] mt-16 sm:mt-20 lg:mt-24">
                <div className="flex items-center gap-3 sm:gap-6 overflow-hidden">
                    <Link href="/instructor" className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 glass rounded-lg sm:rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                    <div className="hidden xs:block h-6 w-px bg-white/10 shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                            <h1 className="text-[10px] sm:text-sm font-black tracking-tight truncate max-w-[120px] xs:max-w-xs sm:max-w-md">Edit: The Ultimate React Bootcamp</h1>
                            <Badge className="shrink-0 bg-emerald-500/10 text-emerald-500 border-none text-[7px] font-black uppercase tracking-widest hidden xs:flex">Live</Badge>
                        </div>
                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50 truncate">ID: {courseId}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <Button variant="outline" className="hidden sm:flex h-9 sm:h-10 px-4 sm:px-5 rounded-lg sm:rounded-xl border-white/10 glass font-black uppercase tracking-widest text-[8px] sm:text-[9px] hover:text-primary">
                        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2" /> Preview
                    </Button>
                    <Button className="h-9 sm:h-10 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(124,58,237,0.3)] font-black uppercase tracking-widest text-[8px] sm:text-[9px]">
                        <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2" /> <span className="hidden xs:inline">Publish</span><span className="xs:hidden">Save</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Nav - Visible only on small screens */}
            <div className="fixed top-[144px] sm:top-[180px] lg:top-[220px] left-0 right-0 z-30 bg-background/50 backdrop-blur-md border-b border-white/5 xl:hidden">
                <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-2">
                    {[
                        { id: "curriculum", label: "Curriculum", icon: Layers },
                        { id: "settings", label: "Audience", icon: Target },
                        { id: "pricing", label: "Valuation", icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-black text-[9px] uppercase tracking-widest ${activeTab === item.id
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-white/5 text-muted-foreground border-transparent'
                                }`}
                        >
                            <item.icon className="w-3 h-3" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sidebar Nav - Desktop Only */}
            <div className="fixed top-36 sm:top-40 lg:top-44 left-0 bottom-0 w-72 border-r border-white/5 bg-background/50 backdrop-blur-md z-30 p-8 pt-10 hidden xl:block">
                <div className="space-y-2">
                    {[
                        { id: "curriculum", label: "Curriculum Builder", icon: Layers },
                        { id: "settings", label: "Target Audience", icon: Target },
                        { id: "pricing", label: "System Valuation", icon: Settings },
                        { id: "promotions", label: "Deployment Ads", icon: Globe },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="absolute bottom-10 left-8 right-8">
                    <div className="p-6 glass-card border-amber-400/20 rounded-[2rem] bg-amber-400/5">
                        <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center text-amber-400 mb-4">
                            <Info className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] font-bold text-amber-400/80 leading-relaxed mb-4">
                            Changes won't be live until you publish.
                        </p>
                        <Button variant="outline" className="w-full h-10 rounded-xl border-amber-400/20 font-black uppercase tracking-widest text-[9px] text-amber-400">
                            Logistics
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 mt-[200px] sm:mt-48 lg:mt-52 xl:pl-80 pt-6 sm:pt-10 container max-w-5xl mx-auto px-4 sm:px-8">
                {activeTab === "curriculum" && (
                    <div className="space-y-8 sm:space-y-12 animate-fadeInUp">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">Mission Modules</h2>
                                <p className="text-muted-foreground font-medium text-xs sm:text-sm mt-1">Design the roadmap for mastery.</p>
                            </div>
                            <Button onClick={addChapter} className="h-10 sm:h-12 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all font-black uppercase tracking-widest text-[8px] sm:text-[9px] w-full sm:w-auto">
                                <Plus className="w-4 h-4 mr-2" /> Add Module
                            </Button>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            {chapters.map((ch, idx) => (
                                <div key={ch.id} className="glass-card rounded-[1.5rem] sm:rounded-[2.5rem] border-white/5 group overflow-hidden">
                                    <div className="p-5 sm:p-8 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                                        <div className="flex items-center gap-2 sm:gap-4 flex-1">
                                            <GripVertical className="hidden xs:block w-5 h-5 text-muted-foreground/30 cursor-grab" />
                                            <div className="flex items-center gap-2 sm:gap-3 w-full">
                                                <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-[10px] sm:text-xs">
                                                    {idx + 1}
                                                </div>
                                                <Input
                                                    defaultValue={ch.title}
                                                    className="bg-transparent border-none text-base sm:text-xl font-black tracking-tight p-0 h-auto focus-visible:ring-0 w-full"
                                                />
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 text-muted-foreground hover:text-red-400">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
                                        {ch.lessons.map((lesson, lIdx) => (
                                            <div key={lesson.id} className="p-3 sm:p-5 bg-white/5 hover:bg-white/[0.08] rounded-xl sm:rounded-2xl border border-white/5 transition-all group/lesson flex items-center justify-between">
                                                <div className="flex items-center gap-2 sm:gap-4 flex-1 overflow-hidden">
                                                    <GripVertical className="hidden xs:block w-4 h-4 text-muted-foreground/20" />
                                                    <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-primary bg-primary/10`}>
                                                        <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    </div>
                                                    <Input
                                                        defaultValue={lesson.title}
                                                        className="bg-transparent border-none font-bold text-xs sm:text-sm p-0 h-auto focus-visible:ring-0 w-full"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 sm:gap-4">
                                                    <Badge className="bg-white/5 text-[7px] sm:text-[9px] font-black tracking-widest border-none px-2 sm:px-3 py-1 opacity-40 hidden xs:flex">VIDEO</Badge>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-red-400 opacity-60 sm:opacity-0 sm:group-hover/lesson:opacity-100 transition-all">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="pt-2">
                                            <Button
                                                onClick={() => addLesson(ch.id)}
                                                variant="ghost"
                                                className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border border-dashed border-white/10 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[8px] sm:text-[9px] transition-all"
                                            >
                                                <Plus className="w-3.5 h-3.5 mr-2" /> Add Unit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-6 sm:pt-10">
                            <Button onClick={addChapter} variant="outline" className="h-14 sm:h-16 px-8 sm:px-10 rounded-2xl sm:rounded-[2rem] border-white/10 glass font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:border-primary/40 transition-all w-full sm:w-auto">
                                <Layers className="w-4 h-4 mr-3" /> Insert Final Module
                            </Button>
                        </div>
                    </div>
                )}

                {(activeTab === "settings" || activeTab === "pricing") && (
                    <div className="space-y-8 sm:space-y-12 animate-fadeInUp">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter capitalize">{activeTab}</h2>
                        <div className="glass-card rounded-[2rem] sm:rounded-[2.5rem] border-white/5 p-6 sm:p-12 space-y-8 sm:space-y-10">
                            <div>
                                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Operation Parameters</label>
                                <div className="space-y-3">
                                    {["Frontend developers ready for scale", "Engineers moving into leadership"].map((txt, i) => (
                                        <div key={i} className="flex gap-2 sm:gap-3">
                                            <Input defaultValue={txt} className="h-12 sm:h-14 rounded-lg sm:rounded-xl bg-white/5 border-white/10 text-xs sm:text-sm" />
                                            <Button variant="ghost" size="icon" className="shrink-0 h-12 w-12 sm:h-14 sm:w-14 text-muted-foreground hover:text-red-400">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary p-0">
                                        + Add Precision Vector
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
