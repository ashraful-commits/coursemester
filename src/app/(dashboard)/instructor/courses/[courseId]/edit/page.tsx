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
            <div className="relative z-40 pt-32 pb-6 border-b border-white/5 bg-background/80 backdrop-blur-xl fixed top-0 left-0 right-0 px-8 flex items-center justify-between h-20 mt-24">
                <div className="flex items-center gap-6">
                    <Link href="/instructor" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <h1 className="text-sm font-black tracking-tight truncate max-w-md">Edit: The Ultimate React Bootcamp 2024</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black uppercase tracking-widest">Live On Network</Badge>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Course ID: {courseId}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 px-5 rounded-xl border-white/10 glass font-black uppercase tracking-widest text-[9px] hover:text-primary">
                        <Eye className="w-3.5 h-3.5 mr-2" /> Preview
                    </Button>
                    <Button className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(124,58,237,0.3)] font-black uppercase tracking-widest text-[9px]">
                        <Save className="w-3.5 h-3.5 mr-2" /> Publish Changes
                    </Button>
                </div>
            </div>

            {/* Sidebar Nav */}
            <div className="fixed top-44 left-0 bottom-0 w-72 border-r border-white/5 bg-background/50 backdrop-blur-md z-30 p-8 pt-10 hidden xl:block">
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
                            Changes made here won't be visible to students until you hit "Publish Changes".
                        </p>
                        <Button variant="outline" className="w-full h-10 rounded-xl border-amber-400/20 font-black uppercase tracking-widest text-[9px] text-amber-400">
                            Read Logistics
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 mt-44 xl:pl-80 pt-10 container max-w-5xl mx-auto px-8">
                {activeTab === "curriculum" && (
                    <div className="space-y-12 animate-fadeInUp">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter">Mission Modules</h2>
                                <p className="text-muted-foreground font-medium text-sm mt-1">Design the roadmap for your students' journey to mastery.</p>
                            </div>
                            <Button onClick={addChapter} className="h-12 px-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all font-black uppercase tracking-widest text-[9px]">
                                <Plus className="w-4 h-4 mr-2" /> Add Module
                            </Button>
                        </div>

                        <div className="space-y-8">
                            {chapters.map((ch, idx) => (
                                <div key={ch.id} className="glass-card rounded-[2.5rem] border-white/5 group overflow-hidden">
                                    <div className="p-8 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <GripVertical className="w-5 h-5 text-muted-foreground/30 cursor-grab" />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                                    {idx + 1}
                                                </div>
                                                <Input
                                                    defaultValue={ch.title}
                                                    className="bg-transparent border-none text-xl font-black tracking-tight p-0 h-auto focus-visible:ring-0 w-full"
                                                />
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-red-400">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="p-8 space-y-4">
                                        {ch.lessons.map((lesson, lIdx) => (
                                            <div key={lesson.id} className="p-5 bg-white/5 hover:bg-white/[0.08] rounded-2xl border border-white/5 transition-all group/lesson flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <GripVertical className="w-4 h-4 text-muted-foreground/20" />
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-primary bg-primary/10`}>
                                                        <Video className="w-4 h-4" />
                                                    </div>
                                                    <Input
                                                        defaultValue={lesson.title}
                                                        className="bg-transparent border-none font-bold text-sm p-0 h-auto focus-visible:ring-0 max-w-md"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Badge className="bg-white/5 text-[9px] font-black tracking-widest border-none px-3 py-1 opacity-40">VIDEO • {lesson.duration}</Badge>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-red-400 opacity-0 group-hover/lesson:opacity-100 transition-all">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="pt-2">
                                            <Button
                                                onClick={() => addLesson(ch.id)}
                                                variant="ghost"
                                                className="w-full h-14 rounded-2xl border border-dashed border-white/10 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[9px] transition-all"
                                            >
                                                <Plus className="w-4 h-4 mr-2" /> Add Operation Unit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-10">
                            <Button onClick={addChapter} variant="outline" className="h-16 px-10 rounded-[2rem] border-white/10 glass font-black uppercase tracking-widest text-[10px] hover:border-primary/40 transition-all">
                                <Layers className="w-4 h-4 mr-3" /> Insert Final Module
                            </Button>
                        </div>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="space-y-12 animate-fadeInUp">
                        <h2 className="text-3xl font-black tracking-tighter">Target Audience</h2>
                        <div className="glass-card rounded-[2.5rem] border-white/5 p-12 space-y-10">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Who is this for?</label>
                                <div className="space-y-3">
                                    {["Frontend developers ready for scale", "Engineers moving into leadership"].map((txt, i) => (
                                        <div key={i} className="flex gap-3">
                                            <Input defaultValue={txt} className="h-14 rounded-xl bg-white/5 border-white/10" />
                                            <Button variant="ghost" size="icon" className="h-14 w-14 text-muted-foreground hover:text-red-400">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary">
                                        + Add More Precision
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
