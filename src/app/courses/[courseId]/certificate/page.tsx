"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Download, Share2, CheckCircle, Star, Calendar, BookOpen, ArrowLeft, ExternalLink } from "lucide-react"

const mockCertificates: Record<string, any> = {
    "2": {
        courseTitle: "Python for Data Science and AI",
        studentName: "Alex Johnson",
        instructorName: "Jane Smith",
        completedDate: "February 15, 2026",
        courseHours: 42,
        courseId: "2",
        certificateId: "CM-2026-DS-00142",
    },
}

export default function CertificatePage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = use(params)
    const cert = mockCertificates[courseId] || {
        courseTitle: "The Ultimate React Bootcamp 2024",
        studentName: "Alex Johnson",
        instructorName: "John Doe",
        completedDate: "February 20, 2026",
        courseHours: 52,
        courseId: courseId,
        certificateId: `CM-2026-WS-${courseId.padStart(5, "0")}`,
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-24">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-amber-500/6 rounded-full blur-[140px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-float" />
            </div>

            <div className="relative z-10 pt-32 pb-14 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl">
                <div className="container mx-auto px-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[10px] -ml-3 h-10 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to My Learning
                        </Button>
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-5">
                        <Award className="w-3 h-3 text-amber-400" />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-400">Achievement Unlocked</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-3">
                        Your <span className="text-gradient-gold">Certificate</span>
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-14 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Certificate Preview */}
                    <div className="relative mb-10 animate-fadeInUp">
                        <div className="glass-card rounded-[3rem] border-amber-400/20 overflow-hidden shadow-[0_0_80px_rgba(251,191,36,0.1)] relative">
                            {/* Top gradient bar */}
                            <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400" />

                            <div className="p-16 text-center relative">
                                {/* Corner Decorations */}
                                <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-amber-400/30 rounded-tl-3xl" />
                                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-amber-400/30 rounded-tr-3xl" />
                                <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-amber-400/30 rounded-bl-3xl" />
                                <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-amber-400/30 rounded-br-3xl" />

                                {/* Seal */}
                                <div className="relative inline-flex mb-10">
                                    <div className="w-24 h-24 bg-amber-400/10 border-2 border-amber-400/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.2)]">
                                        <Award className="w-12 h-12 text-amber-400" />
                                    </div>
                                    <div className="absolute inset-0 border-2 border-dashed border-amber-400/20 rounded-full animate-spin-slow" />
                                </div>

                                {/* Certificate Content */}
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-50 mb-3">
                                    CodeMaster · Certificate of Completion
                                </p>
                                <p className="text-xl font-semibold text-muted-foreground mb-4">This is to certify that</p>
                                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-gradient-gold mb-4">
                                    {cert.studentName}
                                </h2>
                                <p className="text-xl font-semibold text-muted-foreground mb-6">
                                    has successfully completed the course
                                </p>
                                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-10 max-w-2xl mx-auto">
                                    {cert.courseTitle}
                                </h3>

                                {/* Course stats */}
                                <div className="flex justify-center gap-10 mb-10">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-amber-400">{cert.courseHours}h</div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mt-1">Total Hours</div>
                                    </div>
                                    <div className="w-px bg-white/10" />
                                    <div className="text-center">
                                        <div className="flex justify-center mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">With Distinction</div>
                                    </div>
                                    <div className="w-px bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-amber-400">{cert.completedDate.split(" ")[2]}</div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mt-1">{cert.completedDate.split(" ").slice(0, 2).join(" ")}</div>
                                    </div>
                                </div>

                                {/* Signatures */}
                                <div className="flex justify-center gap-20">
                                    <div className="text-center">
                                        <div className="text-2xl font-black tracking-tighter text-foreground/80 mb-1 italic" style={{ fontFamily: "cursive" }}>
                                            {cert.instructorName}
                                        </div>
                                        <div className="h-px w-32 bg-white/20 mb-2" />
                                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                                            Lead Instructor
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black tracking-tighter text-foreground/80 mb-1 italic" style={{ fontFamily: "cursive" }}>
                                            CodeMaster
                                        </div>
                                        <div className="h-px w-32 bg-white/20 mb-2" />
                                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                                            Platform Director
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate ID */}
                                <div className="absolute bottom-6 right-8">
                                    <p className="text-[8px] font-mono text-muted-foreground opacity-30">ID: {cert.certificateId}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fadeInUp delay-200">
                        <Button className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-amber-400 hover:bg-amber-400/90 text-black shadow-[0_0_30px_rgba(251,191,36,0.3)] group transition-all">
                            <Download className="w-5 h-5 mr-2" />
                            Download Certificate (PDF)
                        </Button>
                        <Button variant="outline" className="flex-1 h-16 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[11px] hover:border-primary/30 group transition-all">
                            <Share2 className="w-5 h-5 mr-2" />
                            Share on LinkedIn
                        </Button>
                        <Button variant="outline" className="h-16 px-8 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[11px] hover:border-primary/30 group transition-all">
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Verify
                        </Button>
                    </div>

                    {/* Post-Completion Info */}
                    <div className="grid md:grid-cols-3 gap-5 animate-fadeInUp delay-300">
                        {[
                            { icon: CheckCircle, title: "Verified by CodeMaster", desc: "Your certificate includes a unique ID for employer verification.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
                            { icon: BookOpen, title: "Keep Learning", desc: "Explore related courses and continue building your skill stack.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
                            { icon: Calendar, title: "No Expiry", desc: "Your certificate is valid for life. Share it anytime, anywhere.", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
                        ].map((item, i) => (
                            <div key={i} className={`glass-card p-8 rounded-3xl border ${item.border} hover:-translate-y-1 transition-all duration-500`}>
                                <div className={`w-12 h-12 ${item.bg} border ${item.border} rounded-2xl flex items-center justify-center ${item.color} mb-5`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-black tracking-tight mb-2">{item.title}</h4>
                                <p className="text-sm text-muted-foreground font-medium opacity-60 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
