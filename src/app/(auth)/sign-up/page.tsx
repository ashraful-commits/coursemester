"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Zap, MoveRight, Target, ShieldCheck, Rocket } from "lucide-react"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const benefits = [
    { title: "Universal Library", desc: "Access to 100+ elite mastery courses", icon: BookOpen },
    { title: "Live Fire Ops", desc: "Hands-on industrial scale projects", icon: Target },
    { title: "Elite Credentials", desc: "Global certificates of completion", icon: ShieldCheck },
    { title: "Infinite Uplink", desc: "Lifetime access to all modules", icon: Zap },
  ]

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        router.push("/sign-in?message=Registration successful")
      } else {
        const data = await response.json()
        setError(data.error || "Something went wrong")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-pink-500/10 rounded-full blur-[100px] animate-float" />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 py-10 lg:py-0">
        {/* Left Side - Benefits */}
        <div className="text-center lg:text-left space-y-8 sm:space-y-12 animate-fadeInUp px-2 sm:px-0">
          <div className="space-y-4 sm:space-y-6">
            <Link href="/" className="inline-flex items-center justify-center lg:justify-start gap-3 font-black text-2xl sm:text-3xl group mb-4 sm:mb-8">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary text-primary-foreground group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                <Rocket className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <span className="text-gradient tracking-tighter">CodeMaster</span>
            </Link>
            <h1 className="text-3xl xs:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter">
              Initiate Your <br />
              <span className="text-gradient">Ascension</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground font-medium max-w-md mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
              Join the elite circle of architects and master the technologies of tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0 px-2 sm:px-0">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-6 p-4 sm:p-6 glass rounded-2xl border-white/5 hover:border-primary/20 transition-all group text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                  <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h4 className="font-black text-[9px] sm:text-sm uppercase tracking-widest leading-none">{benefit.title}</h4>
                  <p className="text-[9px] sm:text-xs text-muted-foreground font-medium mt-1 sm:mt-1.5 leading-tight">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 max-w-sm mx-auto lg:mx-0 pt-6 sm:pt-8 border-t border-white/5">
            <div className="text-center">
              <div className="text-lg xs:text-xl sm:text-2xl font-black text-primary">15K+</div>
              <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Learners</div>
            </div>
            <div className="text-center border-x border-white/10 px-6 sm:px-8">
              <div className="text-lg xs:text-xl sm:text-2xl font-black text-foreground">380+</div>
              <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-lg xs:text-xl sm:text-2xl font-black text-primary">98%</div>
              <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Success</div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="animate-fadeInUp delay-200 w-full max-w-md mx-auto lg:max-w-none">
          <Card className="glass-card p-4 xs:p-8 lg:p-12 rounded-[2rem] sm:rounded-[3rem] border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <CardHeader className="space-y-3 sm:space-y-4 pb-6 sm:pb-10 p-0">
              <CardTitle className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tighter">Create Account</CardTitle>
              <CardDescription className="text-sm sm:text-lg font-medium text-muted-foreground leading-snug">
                Enter your identity to begin your synchronization.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 sm:space-y-8 p-0">
              <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="name" className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Operator Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="E.g. Alexander Pierce"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 sm:h-14 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 text-base sm:text-lg font-medium transition-all"
                    required
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="email" className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Digital Signature (Email)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="operator@codemaster.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 sm:h-14 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 text-base sm:text-lg font-medium transition-all"
                    required
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="password" className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Encryption Key (Password)</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 sm:h-14 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 text-base sm:text-lg font-medium transition-all"
                    required
                    minLength={6}
                  />
                  <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-2">Minimum 6-bit entropy required</p>
                </div>

                {error && (
                  <div className="glass bg-destructive/10 border border-destructive/20 text-destructive px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black uppercase tracking-widest">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="xl"
                  className="w-full rounded-xl sm:rounded-2xl font-black text-base sm:text-lg h-14 sm:h-16 bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all group"
                  disabled={isLoading}
                >
                  {isLoading ? "Provisioning..." : (
                    <span className="flex items-center justify-center">
                      Initiate Ascension <MoveRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="relative py-2 sm:py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-[8px] sm:text-[10px] uppercase font-black tracking-widest">
                  <span className="bg-[#0c0c0e] px-4 text-muted-foreground">Universal Auth</span>
                </div>
              </div>

              <div className="grid gap-3 sm:gap-4">
                <Button variant="outline" className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl glass border-white/10 font-black tracking-widest text-[10px] sm:text-xs uppercase hover:bg-white/5">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" opacity="0.6" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" opacity="0.4" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" opacity="0.8" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sync with Google
                </Button>
              </div>

              <div className="text-center text-xs sm:text-sm font-bold pt-2 sm:pt-4">
                <span className="text-muted-foreground">Already Synchronized?</span>{" "}
                <Link href="/sign-in" className="text-primary hover:underline font-black uppercase tracking-widest text-[10px] ml-2">
                  Access Portal
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
