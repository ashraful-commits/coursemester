"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    ChevronLeft, ChevronRight, BookOpen, Layers, DollarSign,
    Rocket, Sparkles, CheckCircle, Info, Zap, Globe, Target
} from "lucide-react"

const steps = [
    { id: 1, name: "Identity", desc: "Core module designation", icon: BookOpen },
    { id: 2, name: "Classification", desc: "Technical alignment", icon: Layers },
    { id: 3, name: "Valuation", desc: "Access tiering", icon: DollarSign },
    { id: 4, name: "Deployment", desc: "Initiate system", icon: Rocket },
]

export default function CreateCoursePage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        level: "Beginner",
        price: "49.99",
    })
    const router = useRouter()

    const handleNext = () => {
        if (step < 4) setStep(step + 1)
        else {
            // Simulate creation
            router.push("/instructor")
        }
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-24">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/8 rounded-full blur-[140px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-violet-600/5 rounded-full blur-[120px] animate-float" />
            </div>

            <div className="relative z-10 pt-12 pb-10 sm:pt-20 sm:pb-12 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl">
                <div className="container mx-auto px-4">
                    <Link href="/instructor">
                        <Button variant="ghost" className="mb-6 sm:mb-8 text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[9px] sm:text-[10px] -ml-2 sm:-ml-3 h-10 group">
                            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Return
                        </Button>
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-5">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-primary">New Operation Protocol</span>
                    </div>
                    <h1 className="text-3xl xs:text-5xl md:text-6xl font-black tracking-tighter leading-none mb-3">
                        Course <span className="text-gradient">Creation</span>
                    </h1>
                    <p className="text-xs sm:text-base text-muted-foreground font-medium">
                        Step {step} of 4: {steps.find(s => s.id === step)?.name}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 sm:py-14 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-12 sm:mb-20 relative px-2">
                        <div className="absolute top-1/2 left-4 right-4 h-px bg-white/5 -z-10" />
                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center group relative">
                                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 transition-all duration-500 z-10 ${step >= s.id
                                    ? 'bg-primary border-primary shadow-[0_0_20px_rgba(124,58,237,0.3)] text-primary-foreground'
                                    : 'bg-background border-white/10 text-muted-foreground'
                                    }`}>
                                    <s.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${step === s.id ? 'animate-pulse' : ''}`} />
                                </div>
                                <div className="absolute mt-12 sm:mt-16 text-center whitespace-nowrap hidden xs:block">
                                    <p className={`text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${step >= s.id ? 'text-primary' : 'text-muted-foreground opacity-40'}`}>
                                        {s.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="glass-card rounded-[2rem] sm:rounded-[3rem] border-white/5 p-6 sm:p-12 lg:p-16 mb-8 sm:mb-10 animate-scaleIn overflow-hidden">
                        {step === 1 && (
                            <div className="space-y-8 sm:space-y-10 animate-fadeInUp">
                                <div>
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary mb-3 sm:mb-4 block">Operation Title</label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Mastering Machine Learning"
                                        className="h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-white/5 border-white/10 focus:border-primary/40 text-lg sm:text-xl font-bold px-4 sm:px-8"
                                    />
                                    <p className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] text-muted-foreground font-medium opacity-50 leading-relaxed">Choose a high-impact title that clearly defines the course mission.</p>
                                </div>
                                <div className="p-5 sm:p-8 border border-primary/20 bg-primary/5 rounded-2xl sm:rounded-3xl flex items-start gap-3 sm:gap-4">
                                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 sm:mt-1" />
                                    <p className="text-xs sm:text-sm font-medium text-foreground/80 leading-relaxed">
                                        Intelligence suggests that titles with specific outcomes perform 40% better in recruitment phases.
                                    </p>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-10 animate-fadeInUp">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Primary Category</label>
                                        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                                            {["Web Development", "AI & Data Science", "Cloud & DevOps", "Design"].map((c) => (
                                                <button
                                                    key={c}
                                                    onClick={() => setFormData({ ...formData, category: c })}
                                                    className={`h-12 sm:h-14 px-5 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-between font-bold border text-sm sm:text-base transition-all ${formData.category === c ? 'bg-primary border-primary text-primary-foreground shadow-lg' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-primary/30'
                                                        }`}
                                                >
                                                    {c}
                                                    {formData.category === c && <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Expertise Level</label>
                                        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                                            {["Beginner", "Intermediate", "Advanced"].map((l) => (
                                                <button
                                                    key={l}
                                                    onClick={() => setFormData({ ...formData, level: l })}
                                                    className={`h-12 sm:h-14 px-5 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-between font-bold border text-sm sm:text-base transition-all ${formData.level === l ? 'bg-primary border-primary text-primary-foreground shadow-lg' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-primary/30'
                                                        }`}
                                                >
                                                    {l}
                                                    {formData.level === l && <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 sm:space-y-10 animate-fadeInUp">
                                <div className="max-w-md mx-auto text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 sm:mb-8">
                                        <DollarSign className="w-8 h-8 sm:w-10 sm:h-10" />
                                    </div>
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Access Valuation (USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 text-xl sm:text-3xl font-black text-muted-foreground opacity-30">$</span>
                                        <Input
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="h-20 sm:h-24 pl-12 sm:pl-16 pr-6 sm:pr-8 text-3xl sm:text-5xl font-black tracking-tighter bg-white/5 border-white/10 rounded-2xl sm:rounded-[2rem] text-center focus:border-primary/40"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-8">
                                        {["19.99", "49.99", "99.99"].map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => setFormData({ ...formData, price: p })}
                                                className="h-10 sm:h-12 rounded-lg sm:rounded-xl glass border-white/10 font-black text-[8px] sm:text-[10px] uppercase hover:border-primary/40 transition-all"
                                            >
                                                ${p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="text-center space-y-8 sm:space-y-10 animate-fadeInUp">
                                <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-10">
                                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                                    <div className="relative w-full h-full bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-[0_0_40px_rgba(124,58,237,0.4)]">
                                        <Rocket className="w-10 h-10 sm:w-14 sm:h-14" />
                                    </div>
                                </div>
                                <h2 className="text-2xl sm:text-4xl font-black tracking-tighter">Ready for Deployment</h2>
                                <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed px-4">
                                    Your operation parameters are synchronized. Initializing the course architecture will grant access to Module Builder.
                                </p>
                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto pt-4 sm:pt-6 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                                    <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-3.5 h-3.5" /> Identity Locked</div>
                                    <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-3.5 h-3.5" /> Tier Set</div>
                                    <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-3.5 h-3.5" /> Cloud Sync Active</div>
                                    <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-3.5 h-3.5" /> SSL Encrypted</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col xs:flex-row items-center justify-between gap-4 px-2">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={step === 1}
                            className="h-12 sm:h-14 px-8 rounded-xl sm:rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[9px] sm:text-[10px] w-full xs:w-auto"
                        >
                            Previous Step
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="h-14 sm:h-16 px-10 sm:px-12 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-[11px] bg-primary hover:bg-primary/90 shadow-[0_0_25px_rgba(124,58,237,0.35)] group transition-all w-full xs:w-auto"
                        >
                            {step === 4 ? 'Initialize Course' : 'Proceed'}
                            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
