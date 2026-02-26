import Link from "next/link";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  Award,
  BookOpen,
  Code,
  Target,
  Zap,
  MoveRight,
  ChevronRight,
} from "lucide-react";
import { CourseCard } from "@/components/courses/course-card";
import { Separator } from "@/components/ui/separator";

// Mock data - replace with actual data fetching
const featuredCourses = [
  {
    id: "1",
    title: "The Ultimate React Bootcamp 2024",
    description: "Master React from beginner to advanced with hands-on projects.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    price: 49.99,
    isPublished: true,
    category: { name: "Web Development" },
    instructor: { name: "John Doe", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    chapters: [{ id: "c1", lessons: [{ id: "l1", duration: 120 }, { id: "l2", duration: 150 }] }],
    reviews: [{ rating: 5 }, { rating: 4.8 }],
    enrollments: Array(1250),
  },
  {
    id: "2",
    title: "Python for Data Science and AI",
    description: "Unlock the power of Python for data analysis and machine learning.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    price: 79.99,
    isPublished: true,
    category: { name: "Data Science" },
    instructor: { name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    chapters: [{ id: "c2", lessons: [{ id: "l3", duration: 180 }, { id: "l4", duration: 200 }] }],
    reviews: [{ rating: 4.9 }, { rating: 4.7 }],
    enrollments: Array(2500),
  },
  {
    id: "3",
    title: "Flutter Mobile App Development",
    description: "Build beautiful, native-quality iOS and Android apps from a single codebase.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    price: 59.99,
    isPublished: true,
    category: { name: "Mobile Development" },
    instructor: { name: "Carlos Rossi", image: "https://randomuser.me/api/portraits/men/56.jpg" },
    chapters: [{ id: "c3", lessons: [{ id: "l5", duration: 160 }, { id: "l6", duration: 180 }] }],
    reviews: [{ rating: 4.8 }, { rating: 4.6 }],
    enrollments: Array(1800),
  },
  {
    id: "4",
    title: "Docker & Kubernetes: The Complete Guide",
    description: "Deploy and scale modern applications with containerization and orchestration.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    price: 69.99,
    isPublished: true,
    category: { name: "DevOps" },
    instructor: { name: "Aisha Khan", image: "https://randomuser.me/api/portraits/women/65.jpg" },
    chapters: [{ id: "c4", lessons: [{ id: "l7", duration: 140 }, { id: "l8", duration: 190 }] }],
    reviews: [{ rating: 4.9 }, { rating: 4.8 }],
    enrollments: Array(1500),
  },
];

const testimonials = [
  {
    quote: "CodeMaster transformed my career. The hands-on projects were a game-changer, and I landed a job at a top tech company within months.",
    name: "Alex Johnson",
    role: "Software Engineer @ Google",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The best platform for learning to code, period. The instructors are amazing and the community is so supportive.",
    name: "Samantha Lee",
    role: "Frontend Developer @ Vercel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "I went from zero coding knowledge to building complex applications. I can't recommend CodeMaster enough!",
    name: "David Chen",
    role: "Full-Stack Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-violet-600/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-pink-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-48 lg:pb-40 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass border-white/10 mb-6 sm:mb-8 animate-fadeIn">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary"></span>
                </span>
                <span className="text-[8px] sm:text-xs font-black uppercase tracking-widest text-primary-foreground/80">
                  New Era of Learning
                </span>
              </div>

              <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tighter animate-fadeInUp">
                Master the <br />
                <span className="text-gradient">Digital Edge</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-12 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed animate-fadeInUp delay-100">
                Unlock project-led mastery in the most in-demand technologies. Expert instructors, real-world workflows, and a community of high-achievers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start animate-fadeInUp delay-200">
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button size="lg" className="h-14 sm:h-16 w-full sm:w-auto px-8 sm:px-10 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all group">
                    Start Path <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="h-14 sm:h-16 w-full sm:w-auto px-8 sm:px-10 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black glass border-white/10 hover:bg-white/5 transition-all">
                    View Demo
                  </Button>
                </Link>
              </div>

              <div className="mt-12 sm:mt-16 flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 animate-fadeInUp delay-300">
                <div className="flex -space-x-3 sm:-space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-background overflow-hidden relative shadow-lg">
                      <NextImage src={`https://i.pravatar.cc/150?u=${i}`} alt="user" fill />
                    </div>
                  ))}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-background bg-muted flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-lg">
                    +10k
                  </div>
                </div>
                <div className="text-center xs:text-left">
                  <div className="flex items-center justify-center xs:justify-start gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />)}
                  </div>
                  <p className="text-[10px] sm:text-sm font-bold text-muted-foreground mt-1">4.9/5 from 2,000+ reviews</p>
                </div>
              </div>
            </div>

            <div className="flex-1 relative w-full lg:h-[700px] flex items-center justify-center py-10 xs:py-20 lg:py-0">
              {/* Projection Container */}
              <div className="relative w-full max-w-[450px] lg:max-w-[500px] mx-auto perspective-2000">
                {/* Glow behind the card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] opacity-40" />

                {/* Main 3D Card */}
                <div className="relative z-20 w-full aspect-[4/3] rounded-[2rem] sm:rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] sm:rotate-3d hover:transform-none transition-all duration-1000 group">
                  <NextImage
                    src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop"
                    alt="Elite Coding Terminal"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-90" />

                  {/* Internal scanline effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

                  {/* Internal UI elements */}
                  <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl glass flex items-center justify-center text-primary shadow-xl">
                        <Code className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="hidden xs:block">
                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">Core Kernel</p>
                        <p className="text-xs sm:text-sm font-black text-white tracking-tight leading-none">ACTIVE_STABLE</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">Uptime</p>
                      <p className="text-xs sm:text-sm font-black text-primary tracking-tight leading-none">99.9%</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements - Optimized for mobile */}
                <div className="absolute top-0 left-0 glass-card p-3 sm:p-6 rounded-xl sm:rounded-[2rem] w-36 sm:w-60 -translate-x-2 -translate-y-6 sm:-translate-x-8 sm:-translate-y-8 lg:-translate-x-24 lg:-translate-y-16 z-30 animate-float shadow-2xl border-white/10 hidden xs:block">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg sm:rounded-xl flex items-center justify-center text-green-500">
                      <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-[7px] sm:text-[9px] font-black uppercase text-muted-foreground tracking-widest">Rate</p>
                      <p className="text-xs sm:text-base font-black text-foreground">5.2 GB/s</p>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%]" />
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 glass-card p-3 sm:p-5 rounded-xl sm:rounded-[2rem] w-32 sm:w-52 translate-x-2 translate-y-6 sm:translate-x-8 sm:translate-y-8 lg:translate-x-20 lg:translate-y-16 z-30 animate-float delay-500 shadow-2xl border-white/10 hidden xs:block">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <p className="text-[7px] sm:text-[9px] font-black uppercase text-muted-foreground tracking-widest">Network</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-background overflow-hidden relative shadow-md">
                        <NextImage src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="user" fill />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="relative py-16 sm:py-24 lg:py-40 z-10 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 sm:mb-20 gap-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary font-black uppercase tracking-widest px-3 sm:px-4 py-1.5 text-[9px] sm:text-xs">
                Curated Selection
              </Badge>
              <h2 className="text-3xl xs:text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">
                Elite Learning <br />
                <span className="text-gradient">Experiences</span>
              </h2>
            </div>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="link" className="text-base sm:text-lg font-black group h-auto p-0 hover:text-primary transition-colors justify-start">
                Browse Catalog <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredCourses.map((course, i) => (
              <div key={course.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 lg:py-40 z-10">
        <div className="container mx-auto px-4 text-center mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6">
            Why <span className="text-gradient">CodeMaster?</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            We're a career accelerator designed for the next generation of builders.
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {[
            { icon: BookOpen, title: "Industry Standard", description: "Learn tools and workflows used at FAANG and top unicorn startups.", color: "text-blue-400", bg: "bg-blue-400/10" },
            { icon: Code, title: "Production Grade", description: "Don't just code. Build systems that scale to millions of users.", color: "text-purple-400", bg: "bg-purple-400/10" },
            { icon: Target, title: "Direct Placement", description: "Our exclusive network connects top graduates with high-paying roles.", color: "text-green-400", bg: "bg-green-400/10" },
            { icon: Zap, title: "Hyper-Growth", description: "A unique curriculum designed to compress years into weeks of intensity.", color: "text-yellow-400", bg: "bg-yellow-400/10" },
            { icon: Users, title: "Global Network", description: "Access a private community of founders, engineers, and mentors.", color: "text-pink-400", bg: "bg-pink-400/10" },
            { icon: Award, title: "Elite Certification", description: "Earn proof of mastery that carries weight in the job market.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
          ].map((feature, i) => (
            <div key={i} className="glass group p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.bg} rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-3 group-hover:text-primary transition-colors text-center sm:text-left">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed text-center sm:text-left">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 lg:py-40 z-10 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-24 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6 leading-tight">
              Powering <span className="text-gradient">Tomorrow's</span> Careers
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Alumni winning at companies you know and love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="glass p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border-white/5 relative flex flex-col h-full group hover:bg-white/[0.04] transition-colors">
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-primary/10 group-hover:text-primary/30 transition-colors">
                  <Star className="w-8 h-8 sm:w-12 sm:h-12 fill-current" />
                </div>
                <p className="text-base sm:text-lg font-bold mb-8 sm:mb-10 italic leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                    <NextImage src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-black text-lg sm:text-xl leading-tight">{testimonial.name}</p>
                    <p className="text-primary font-bold text-[10px] sm:text-sm uppercase tracking-wider mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-40 z-10">
        <div className="container mx-auto px-4">
          <div className="relative glass p-8 sm:p-16 lg:p-24 rounded-[2rem] sm:rounded-[4rem] border-primary/20 overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-pink-500/10 opacity-50" />

            <div className="relative z-10">
              <Badge variant="secondary" className="mb-6 sm:mb-8 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-primary/20 text-primary border-none px-4 sm:px-6 py-1.5 sm:py-2 text-[8px] sm:text-xs">
                Join the 1%
              </Badge>
              <h3 className="text-3xl xs:text-4xl md:text-7xl font-black mb-6 sm:mb-8 tracking-tighter leading-[1.1]">
                Ready to Build <br />
                <span className="text-gradient">Something Iconic?</span>
              </h3>
              <p className="text-sm sm:text-xl mb-10 sm:mb-12 text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed px-2 sm:px-4">
                Enroll today and get instant access to our ecosystem. The future belongs to those who build it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="h-14 sm:h-20 w-full sm:w-auto px-8 sm:px-12 rounded-xl sm:rounded-[2rem] text-base sm:text-xl font-black bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(124,58,237,0.4)] group">
                    Start Path <MoveRight className="w-4 h-4 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-3 transition-transform" />
                  </Button>
                </Link>
              </div>
              <p className="text-[8px] sm:text-sm font-bold text-muted-foreground mt-8 sm:mt-10 uppercase tracking-[0.1em] sm:tracking-widest opacity-60 flex flex-wrap justify-center gap-x-3 gap-y-1">
                <span>Unleash Potential</span>
                <span className="hidden xs:inline">•</span>
                <span>No Limits</span>
                <span className="hidden xs:inline">•</span>
                <span>Pro Grade</span>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}