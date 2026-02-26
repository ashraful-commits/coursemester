"use client"

import { useState, useEffect, use } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft, ChevronRight, Play, CheckCircle, Clock,
  MessageSquare, FileText, Info, Download, Search,
  Menu, X, Maximize2, SkipForward, SkipBack, Share2,
  MoreVertical, ThumbsUp, Send, User, Award, Star
} from "lucide-react"

export default function LearnPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  const { data: session, status } = useSession()
  const router = useRouter()

  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState<{ time: string, text: string }[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in")
      return
    }
    if (status === "authenticated") {
      fetchCourse()
    }
  }, [status, router])

  const fetchCourse = async () => {
    // Mock data for the full player experience
    const mockData = {
      id: courseId,
      title: "The Ultimate React Bootcamp 2024",
      instructor: {
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        bio: "Senior Software Engineer with 10+ years of experience in distributed systems and frontend architecture."
      },
      progress: 35,
      chapters: [
        {
          id: "ch1",
          title: "Architecture Fundamentals",
          lessons: [
            { id: "l1", title: "The Rendering Engine", duration: "18:20", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "l2", title: "Component Synthesis", duration: "24:15", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
            { id: "l3", title: "State Flow Dynamics", duration: "21:05", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
            { id: "l4", title: "Event Infiltration", duration: "19:40", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
          ]
        },
        {
          id: "ch2",
          title: "Advanced Hook Logic",
          lessons: [
            { id: "l5", title: "Persistence with useEffect", duration: "16:10", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
            { id: "l6", title: "Contextual Broadcasts", duration: "20:30", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" }
          ]
        }
      ]
    }
    setCourse(mockData)
    setSelectedLesson(mockData.chapters[0].lessons[2]) // Default to first uncompleted lesson
    setLoading(false)
  }

  const handleAddNote = () => {
    if (note.trim()) {
      setNotes([{ time: "12:45", text: note }, ...notes])
      setNote("")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin shadow-[0_0_40px_rgba(124,58,237,0.2)]" />
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary animate-pulse">Syncing Mission Data</p>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-2 opacity-40 italic">Establishing redundant uplink...</p>
          </div>
        </div>
      </div>
    )
  }

  const allLessons = course.chapters.flatMap((c: any) => c.lessons)
  const currentIndex = allLessons.findIndex((l: any) => l.id === selectedLesson.id)

  const handleNext = () => {
    if (currentIndex < allLessons.length - 1) {
      setSelectedLesson(allLessons[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedLesson(allLessons[currentIndex - 1])
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col pt-24">
      {/* Top Header / Player Controls */}
      <div className="bg-background/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 flex items-center justify-between z-40 fixed top-20 sm:top-24 left-0 right-0 h-16 sm:h-20 shadow-lg">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link href="/dashboard" className="w-9 h-9 sm:w-11 sm:h-11 glass border-white/5 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-white/10 hidden xs:block" />
          <Link href={`/courses/${courseId}`} className="min-w-0">
            <h1 className="text-xs sm:text-sm font-black tracking-tight truncate hover:text-primary transition-colors max-w-[120px] xs:max-w-xs sm:max-w-md">
              {course.title}
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-1">Your Progress</p>
            <div className="flex items-center gap-3">
              <div className="w-24 lg:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.4)]" style={{ width: `${course.progress}%` }} />
              </div>
              <span className="text-[10px] font-black text-primary">{course.progress}%</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-11 sm:h-11 glass border-white/5 rounded-xl text-muted-foreground hover:text-primary hidden sm:flex">
            <Share2 className="w-4 h-4" />
          </Button>
          <Link href={`/courses/${courseId}/certificate`}>
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-11 sm:h-11 glass border-white/5 rounded-xl text-muted-foreground hover:text-primary">
              <Award className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`h-9 w-9 sm:h-11 sm:h-11 glass border-white/5 rounded-xl transition-all ${sidebarOpen ? 'text-primary' : 'text-muted-foreground'}`}
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 mt-16 overflow-hidden relative">
        {/* Main Player Content */}
        <div className={`flex-1 flex flex-col overflow-y-auto transition-all duration-500 ${sidebarOpen ? 'lg:mr-96' : ''}`}>
          {/* Player Section */}
          <div className="bg-black relative group">
            <div className="aspect-video relative w-full overflow-hidden">
              {/* Video Element */}
              <video
                key={selectedLesson.id}
                className="w-full h-full object-contain"
                poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200"
                controls
              >
                <source src={selectedLesson.videoUrl} type="video/mp4" />
              </video>

              {/* Custom Overlay (simplified because we use native controls for reliability in demo) */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Badge className="glass border-white/10 font-black uppercase tracking-widest text-[9px] bg-black/40 backdrop-blur-md">
                  Active Operation: {selectedLesson.title}
                </Badge>
                <div className="flex gap-2">
                  <Badge className="bg-primary/20 text-primary border-none font-black uppercase tracking-widest text-[9px]">4K Lossless</Badge>
                </div>
              </div>
            </div>

            {/* Above Player Info */}
            <div className="bg-background border-b border-white/5 p-8">
              <div className="container mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">Now Executing</p>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter">{selectedLesson.title}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className="glass border-white/5 h-12 rounded-xl font-black uppercase tracking-widest text-[9px] px-6"
                    >
                      <SkipBack className="w-4 h-4 mr-2" /> Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={currentIndex === allLessons.length - 1}
                      className="h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[9px] bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(124,58,237,0.3)] group transition-all"
                    >
                      Next Operation <SkipForward className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Player Tabs */}
          <div className="bg-background flex-grow">
            <div className="container mx-auto max-w-4xl p-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-white/5 p-1.5 rounded-2xl border border-white/5 mb-10 w-full md:w-auto h-auto flex flex-wrap gap-1">
                  <TabsTrigger value="overview" className="flex-1 md:flex-none h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    <Info className="w-3.5 h-3.5 mr-2" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="qa" className="flex-1 md:flex-none h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    <MessageSquare className="w-3.5 h-3.5 mr-2" /> Q&A
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex-1 md:flex-none h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    <FileText className="w-3.5 h-3.5 mr-2" /> Notes
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex-1 md:flex-none h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    <Download className="w-3.5 h-3.5 mr-2" /> Resources
                  </TabsTrigger>
                </TabsList>

                {/* OVERVIEW CONTENT */}
                <TabsContent value="overview" className="animate-fadeInUp">
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-4">About this course</h3>
                      <p className="text-muted-foreground font-medium leading-relaxed">
                        This operation is designed to infiltrate the deepest levels of modern web architecture.
                        Sarah Johnson leads you through production-grade systems, high-performance optimization,
                        and security-first engineering practices.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 py-10 border-y border-white/5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary shrink-0">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Duration</p>
                          <p className="font-bold">52 Hours of Footage</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary shrink-0">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Access Tier</p>
                          <p className="font-bold">Lifetime Lifetime Unlock</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black tracking-tight mb-6">Head Architect</h3>
                      <div className="flex items-center gap-6 p-6 glass border-white/5 rounded-[2rem] w-full max-w-lg">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/20 shrink-0">
                          <NextImage src={course.instructor.image} alt={course.instructor.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xl font-black">{course.instructor.name}</h4>
                          <div className="flex items-center gap-2 mt-1 mb-3">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-[11px] font-black">4.9 Instructor Rating</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground font-bold leading-relaxed opacity-60">
                            {course.instructor.bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Q&A CONTENT */}
                <TabsContent value="qa" className="animate-fadeInUp">
                  <div className="space-y-8">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40" />
                      <input
                        className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/40 font-semibold outline-none transition-all"
                        placeholder="Search for questions related to this operation..."
                      />
                    </div>

                    <div className="space-y-6">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-6 glass border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all group">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                              <User className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-black text-sm mb-1 group-hover:text-primary transition-colors">How do I optimize the rendering engine for massive datasets?</h4>
                              <p className="text-[11px] text-muted-foreground font-medium opacity-60 line-clamp-2">
                                I'm seeing some frame drops when the mission loads more than 10k entities into the state flow...
                              </p>
                              <div className="flex items-center gap-4 mt-4">
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">2 Answers</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-primary">In Progress</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground group-hover:text-primary">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all">
                      <MessageSquare className="w-4 h-4 mr-2" /> Ask a New Question
                    </Button>
                  </div>
                </TabsContent>

                {/* NOTES CONTENT */}
                <TabsContent value="notes" className="animate-fadeInUp">
                  <div className="space-y-8">
                    <div className="p-8 glass-card border-primary/10 rounded-[2.5rem] bg-primary/5">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">New Intelligence Entry @ 12:45</h4>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-primary/40 text-sm font-medium leading-relaxed mb-4 resize-none"
                        placeholder="Type your notes here... They will be pinned to this mission timestamp."
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleAddNote} className="h-11 px-8 rounded-xl font-black uppercase tracking-widest text-[9px] bg-primary shadow-lg">
                          <Send className="w-3.5 h-3.5 mr-2" /> Save Note
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {notes.length === 0 ? (
                        <div className="text-center py-20 opacity-20">
                          <FileText className="w-12 h-12 mx-auto mb-4" />
                          <p className="text-[10px] font-black uppercase tracking-widest">No intelligence gathered yet</p>
                        </div>
                      ) : (
                        notes.map((n, idx) => (
                          <div key={idx} className="p-6 glass border-white/5 rounded-2xl animate-fadeInDown">
                            <div className="flex items-center justify-between mb-4">
                              <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black tracking-widest">TS: {n.time}</Badge>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-40 hover:opacity-100 hover:text-red-400">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                            <p className="text-sm font-medium text-foreground/80 leading-relaxed">{n.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* RESOURCES CONTENT */}
                <TabsContent value="resources" className="animate-fadeInUp">
                  <div className="grid gap-4">
                    {[
                      { name: "Production Architecture Blueprint", size: "4.2 MB", type: "PDF" },
                      { name: "Mission State Machine Code", size: "125 KB", type: "ZIP" },
                      { name: "Security Audit Checklist", size: "1.8 MB", type: "DOCX" }
                    ].map((res, i) => (
                      <div key={i} className="p-5 glass border-white/5 rounded-2xl flex items-center justify-between hover:border-primary/20 transition-all group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                            <Download className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-black">{res.name}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">{res.type} • {res.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-all">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Sidebar / Curriculum */}
        <div
          className={`fixed top-36 sm:top-44 right-0 bottom-0 glass border-l border-white/10 z-30 transition-all duration-500 overflow-hidden transform ${sidebarOpen ? 'w-full lg:w-96 translate-x-0 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]' : 'w-0 translate-x-full'
            }`}
        >
          <div className="h-full flex flex-col w-full lg:w-96">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div>
                <h3 className="text-lg font-black tracking-tighter">Mission Roadmap</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Curriculum Data</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="space-y-6">
                {course.chapters.map((chapter: any, idxNm: number) => (
                  <div key={chapter.id} className="space-y-3">
                    <div className="flex items-center gap-3 px-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                        {idxNm + 1}
                      </div>
                      <h4 className="font-black text-sm tracking-tight">{chapter.title}</h4>
                    </div>

                    <div className="space-y-2">
                      {chapter.lessons.map((lesson: any) => (
                        <div
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer group/item ${selectedLesson.id === lesson.id
                            ? 'bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.1)]'
                            : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${lesson.completed
                            ? 'bg-green-500/20 text-green-500'
                            : selectedLesson.id === lesson.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-white/10 text-muted-foreground group-hover/item:text-primary transition-all'
                            }`}>
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : selectedLesson.id === lesson.id ? (
                              <Play className="w-4 h-4 fill-current" />
                            ) : (
                              <Play className="w-4 h-4 opacity-40" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[13px] font-bold leading-tight mb-1 truncate ${selectedLesson.id === lesson.id ? 'text-primary' : 'text-foreground/80'
                              }`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Badge Footer */}
            <div className="p-8 border-t border-white/5 bg-background/50 backdrop-blur-md">
              <div className="glass p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Target Achievement</p>
                  <p className="text-sm font-black text-amber-400">Mission Certificate</p>
                </div>
                <div className="ml-auto opacity-20">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function Trash2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}