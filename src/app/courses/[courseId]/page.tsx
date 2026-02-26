"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  Clock,
  BarChart,
  Users,
  PlayCircle,
  BookOpen,
  ChevronLeft,
  Check,
  Zap,
  Award,
  Play,
  Trophy,
  Globe,
  Share2,
  Heart,
  MessageSquare
} from "lucide-react"
import NextImage from "next/image"

// Mock course database that matches the courses list
const mockCourseDatabase: Record<string, any> = {
  "1": {
    id: "1",
    title: "The Ultimate React Bootcamp 2024",
    description: "Master React from beginner to advanced with hands-on projects. Learn to build enterprise-scale applications with the latest patterns.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    price: 49.99,
    category: { name: "Web Development" },
    instructor: { name: "John Doe", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
    chapters: [{ id: '1', title: 'Introduction', description: 'Getting started with React ecosystem and tools.', lessons: [{ id: '1', title: 'Welcome to the Bootcamp', duration: 120, isFree: true }, { id: '2', title: 'Modern JS for React', duration: 150, isFree: false }] }],
    reviews: [{ id: '1', rating: 5, user: { name: 'Alex Johnson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }, comment: "The most comprehensive React course I've ever taken. Pure gold!" }],
    enrollments: Array(1250),
    level: 'Beginner',
    _count: {
      enrollments: 1250,
      reviews: 1,
    }
  },
  "2": {
    id: "2",
    title: "Python for Data Science and AI",
    description: "Unlock the power of Python for data analysis, machine learning, and artificial intelligence at an elite level.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    price: 79.99,
    category: { name: "Data Science" },
    instructor: { name: "Jane Smith", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
    chapters: [{ id: '1', title: 'Logic Foundation', description: 'Mastering the core of Python logic.', lessons: [{ id: '1', title: 'Intelligence Overview', duration: 180, isFree: true }, { id: '2', title: 'Data Structures', duration: 200, isFree: false }] }],
    reviews: [{ id: '1', rating: 4.9, user: { name: 'Mike Ross', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' }, comment: "Incredible depth. The AI section is game-changing." }],
    enrollments: Array(2500),
    level: 'Intermediate',
    _count: {
      enrollments: 2500,
      reviews: 1,
    }
  },
  "3": {
    id: "3",
    title: "Flutter Mobile App Development",
    description: "Build beautiful, native-quality iOS and Android apps from a single codebase with high-precision UI.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    price: 59.99,
    category: { name: "Mobile Development" },
    instructor: { name: "Carlos Rossi", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
    chapters: [{ id: '1', title: 'Native Flow', description: 'Understanding the Flutter engine.', lessons: [{ id: '1', title: 'The Rendering Paradigm', duration: 160, isFree: true }, { id: '2', title: 'State Management', duration: 180, isFree: false }] }],
    reviews: [{ id: '1', rating: 4.8, user: { name: 'David Chen', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' }, comment: "The UI design patterns here are top-tier." }],
    enrollments: Array(1800),
    level: 'Intermediate',
    _count: {
      enrollments: 1800,
      reviews: 1,
    }
  },
  "4": {
    id: "4",
    title: "Docker & Kubernetes: The Complete Guide",
    description: "Deploy and scale modern applications with industrial-grade containerization and orchestration.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
    price: 69.99,
    category: { name: "DevOps" },
    instructor: { name: "Aisha Khan", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
    chapters: [{ id: '1', title: 'Infrastructure', description: 'Setting up the cluster environment.', lessons: [{ id: '1', title: 'Container Theory', duration: 140, isFree: true }, { id: '2', title: 'K8s Architecture', duration: 190, isFree: false }] }],
    reviews: [{ id: '1', rating: 4.9, user: { name: 'Maria Garcia', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }, comment: "Clear, concise, and incredibly powerful infrastructure knowledge." }],
    enrollments: Array(1500),
    level: 'Advanced',
    _count: {
      enrollments: 1500,
      reviews: 1,
    }
  },
};

interface Course {
  id: string
  title: string
  description: string
  imageUrl?: string
  price: number
  level: string
  isPublished: boolean
  instructor: {
    name: string
    bio?: string
    image?: string
  }
  category: {
    name: string
  }
  chapters: Array<{
    id: string
    title: string
    description?: string
    position: number
    lessons: Array<{
      id: string
      title: string
      duration?: number
      isFree: boolean
    }>
  }>
  reviews: Array<{
    id: string
    rating: number
    comment?: string
    user: {
      name: string
      image?: string
    }
  }>
  _count: {
    enrollments: number
    reviews: number
  }
}

export default function CourseDetail({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const resolvedParams = use(params)
  const { data: session } = useSession()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    fetchCourse()
  }, [resolvedParams.courseId])

  const fetchCourse = async () => {
    try {
      const courseData = mockCourseDatabase[resolvedParams.courseId]
      if (courseData) {
        setCourse(courseData)
        if (session?.user?.id) {
          checkEnrollment()
        }
      } else {
        const response = await fetch(`/api/courses/${resolvedParams.courseId}`)
        if (response.ok) {
          const data = await response.json()
          setCourse(data)
          if (session?.user?.id) {
            checkEnrollment()
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch course:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkEnrollment = async () => {
    try {
      const response = await fetch("/api/user/enrollments")
      if (response.ok) {
        const enrollments = await response.json()
        const enrolled = enrollments.some(
          (e: any) => e.courseId === resolvedParams.courseId
        )
        setIsEnrolled(enrolled)
      }
    } catch (error) {
      console.error("Failed to check enrollment:", error)
    }
  }

  const handleEnroll = async () => {
    if (!session?.user?.id) {
      router.push("/sign-in")
      return
    }

    setEnrolling(true)
    try {
      const response = await fetch(
        `/api/courses/${resolvedParams.courseId}/enroll`,
        {
          method: "POST",
        }
      )

      if (response.ok) {
        setIsEnrolled(true)
        router.push(`/courses/${resolvedParams.courseId}/learn`)
      } else {
        const data = await response.json()
        alert(data.error || "Failed to enroll")
      }
    } catch (error) {
      console.error("Failed to enroll:", error)
      alert("Failed to enroll")
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Course not found
      </div>
    )
  }

  const totalLessons = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  )
  const totalDuration = course.chapters.reduce(
    (acc, chapter) =>
      acc +
      chapter.lessons.reduce(
        (lessonAcc, lesson) => lessonAcc + (lesson.duration || 0),
        0
      ),
    0
  )

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-pink-500/5 rounded-full blur-[100px] animate-float" />
      </div>

      {/* Course Hero */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 z-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-all mb-8 sm:mb-12 group"
          >
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Universal Catalog
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <Badge variant="outline" className="border-primary/30 text-primary font-black uppercase tracking-widest px-3 sm:px-4 py-1 glass text-[8px] sm:text-[9px]">
                  {course.category.name}
                </Badge>
                <Badge variant="outline" className="border-white/10 text-muted-foreground font-black uppercase tracking-widest px-3 sm:px-4 py-1 glass text-[8px] sm:text-[9px]">
                  {course.level} Tier
                </Badge>
              </div>

              <h1 className="text-3xl xs:text-5xl lg:text-7xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tighter animate-fadeInUp">
                {course.title.split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{course.title.split(' ').pop()}</span>
              </h1>

              <p className="text-lg sm:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl font-medium leading-relaxed animate-fadeInUp delay-100">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-10 sm:mb-12 animate-fadeInUp delay-200">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
                    <NextImage src={course.instructor.image || ""} alt={course.instructor.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase font-black text-muted-foreground tracking-widest">Architect</p>
                    <p className="text-base sm:text-lg font-black">{course.instructor.name}</p>
                  </div>
                </div>

                <div className="h-10 w-px bg-white/10 hidden sm:block" />

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 glass rounded-xl sm:rounded-2xl flex items-center justify-center text-yellow-500">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase font-black text-muted-foreground tracking-widest">Global Rating</p>
                    <p className="text-base sm:text-lg font-black">4.9 <span className="text-xs sm:text-sm text-muted-foreground font-medium">/ 5.0</span></p>
                  </div>
                </div>

                <div className="h-10 w-px bg-white/10 hidden sm:block" />

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 glass rounded-xl sm:rounded-2xl flex items-center justify-center text-primary">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase font-black text-muted-foreground tracking-widest">Deployment</p>
                    <p className="text-base sm:text-lg font-black">{course._count.enrollments.toLocaleString()}+ <span className="text-xs sm:text-sm text-muted-foreground font-medium">Students</span></p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 animate-fadeInUp delay-300">
                <Button variant="secondary" className="glass border-white/10 h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
                <Button variant="secondary" className="glass border-white/10 h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-black">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-16">
            <Card className="p-10 lg:p-16 rounded-[3rem] border-white/5 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black tracking-tighter mb-10 border-l-4 border-primary pl-6">Mastery Objectives</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    "Engineered for enterprise-level scalability and precision.",
                    "Master complex state flows and distributed architectures.",
                    "Production-grade deployment and CI/CD optimization.",
                    "Industrial security protocols and performance auditing."
                  ].map((objective, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 glass rounded-2xl border-white/5 hover:border-primary/20 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="font-bold text-foreground/80 leading-relaxed">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="space-y-10">
              <h2 className="text-3xl font-black tracking-tighter border-l-4 border-primary pl-6">Mission Prerequisites</h2>
              <ul className="space-y-4">
                {[
                  "Proficiency in core JavaScript/TypeScript systems.",
                  "Foundational understanding of network protocols.",
                  "Terminal access and industrial-grade workstation."
                ].map((req, i) => (
                  <li key={i} className="flex items-center gap-4 text-muted-foreground font-medium">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tighter border-l-4 border-primary pl-6">Mission Modules</h2>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60 bg-white/5 px-4 py-2 rounded-full">
                  {course.chapters.length} Modules • {totalLessons} Operations
                </div>
              </div>

              <div className="space-y-6">
                {course.chapters.map((chapter, index) => (
                  <Card key={chapter.id} className="overflow-hidden border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all rounded-[2.5rem]">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="px-8 py-10 hover:no-underline group">
                          <div className="flex items-center gap-6 text-left">
                            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-xl font-black text-primary group-hover:scale-110 transition-transform">
                              {String(index + 1).padStart(2, '0')}
                            </div>
                            <div>
                              <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">{chapter.title}</h3>
                              <p className="text-sm text-muted-foreground font-bold mt-1 uppercase tracking-widest">{chapter.lessons.length} Operations • {chapter.description?.slice(0, 40)}...</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-8 pb-8 pt-0">
                          <p className="text-muted-foreground mb-8 pl-20 font-medium leading-relaxed border-l border-white/10 ml-7">
                            {chapter.description}
                          </p>
                          <div className="space-y-3 pl-20">
                            {chapter.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group/lesson"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-40 group-hover/lesson:opacity-100 transition-opacity">
                                    <Play className="h-4 w-4 fill-current" />
                                  </div>
                                  <span className="font-bold text-foreground/90 group-hover/lesson:text-primary transition-colors">{lesson.title}</span>
                                  {lesson.isFree && (
                                    <Badge className="bg-green-500/10 text-green-500 border-none px-3 py-0.5 text-[9px] font-black uppercase tracking-widest">Infiltration Ready</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-[10px] font-black font-mono text-muted-foreground uppercase opacity-40">
                                    {Math.floor((lesson.duration || 0) / 60)}:
                                    {((lesson.duration || 0) % 60).toString().padStart(2, "0")}
                                  </span>
                                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center opacity-0 group-hover/lesson:opacity-100 transition-all">
                                    <PlayCircle className="w-4 h-4 text-primary" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                ))}
              </div>
            </div>

            {/* Instructor Bio Section */}
            <div className="space-y-10">
              <h2 className="text-3xl font-black tracking-tighter border-l-4 border-primary pl-6">Head Architect</h2>
              <div className="p-10 lg:p-14 glass-card rounded-[3rem] border-white/5 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-12 relative z-10">
                  <div className="md:w-64 shrink-0">
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-primary/20 shadow-2xl mb-6">
                      <NextImage src={course.instructor.image || ""} alt={course.instructor.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span>Success Rate</span>
                        <span className="text-primary">98.4%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '98%' }} />
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <div className="text-center p-3 glass rounded-xl">
                          <p className="text-lg font-black text-foreground">152K</p>
                          <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Students</p>
                        </div>
                        <div className="text-center p-3 glass rounded-xl">
                          <p className="text-lg font-black text-foreground">42</p>
                          <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Courses</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black tracking-tight mb-2">{course.instructor.name}</h3>
                    <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">Senior Systems Architect & Elite Educator</p>
                    <div className="prose prose-invert max-w-none text-muted-foreground font-medium leading-relaxed mb-8">
                      <p>
                        Sarah is a recognized leader in distributed frontend architectures and production-grade system design. With a focus on scale and security, she has led engineering teams at top-tier global firms.
                      </p>
                      <p className="mt-4">
                        Her mission is to bridge the gap between academic theory and industrial reality, providing students with the exact intelligence required to excel in high-stakes environments.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 glass font-black uppercase tracking-widest text-[9px]">View Portfolio</Button>
                      <Button variant="ghost" className="h-12 w-12 rounded-xl glass border-white/10 text-muted-foreground hover:text-primary"><Globe className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q&A Section */}
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tighter border-l-4 border-primary pl-6">Communication Uplink (Q&A)</h2>
                <Button className="glass border-white/10 text-primary font-black uppercase tracking-widest text-[9px] h-10 px-5">Ask Question</Button>
              </div>
              <div className="space-y-4">
                {[
                  { q: "Is this module compatible with the latest Edge runtimes?", a: "Yes, fully optimized for V8 and WASM acceleration units.", user: "Agent_42" },
                  { q: "Do we get access to the architectural blueprints in PDF?", a: "High-resolution offline prints are included in the Resources vault.", user: "N7_Infiltrator" }
                ].map((item, i) => (
                  <div key={i} className="p-8 glass border-white/5 rounded-[2.5rem] group hover:border-primary/20 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg mb-2 group-hover:text-primary transition-colors">{item.q}</h4>
                        <div className="flex items-start gap-3 mt-4 pl-4 border-l-2 border-white/10">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5" />
                          <p className="text-sm text-muted-foreground font-medium opacity-80">{item.a}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-6 text-[9px] font-black uppercase tracking-widest opacity-30">
                          <span>Broadcast by {item.user}</span>
                          <span>•</span>
                          <span>2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Reviews */}
            <div className="space-y-10">
              <h2 className="text-3xl font-black tracking-tighter border-l-4 border-primary pl-6">Operator Testimonials</h2>
              <div className="grid gap-8">
                {course.reviews.map((review: any) => (
                  <Card key={review.id} className="p-10 rounded-[3rem] border-white/5 bg-white/[0.01] relative group overflow-hidden">
                    <div className="absolute top-6 right-10 text-primary/10">
                      <Trophy className="w-20 h-20" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? "text-yellow-500 fill-current" : "text-muted-foreground/20"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-xl font-bold leading-relaxed mb-10 italic text-foreground/90">
                        "{review.comment}"
                      </p>
                      <div className="flex items-center gap-5">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
                          <NextImage src={review.user.image || ""} alt={review.user.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-black text-2xl tracking-tighter">{review.user.name}</p>
                          <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mt-1">Verified Operator</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky top-32">
              <Card className="overflow-hidden rounded-[3rem] border-primary/20 bg-background/50 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 group">
                <CardHeader className="p-0 relative h-64 overflow-hidden">
                  <NextImage src={course.imageUrl || ""} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="outline" size="xl" className="glass border-white/20 rounded-full h-20 w-20 p-0 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group/play">
                      <Play className="h-8 w-8 fill-current ml-1 group-hover/play:scale-110 transition-transform" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-10 pt-4">
                  <div className="flex items-end gap-3 mb-10 pb-10 border-b border-white/10">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Access Tier</p>
                      <p className="text-5xl font-black tracking-tighter">
                        {course.price === 0 ? "FREE" : formatPrice(course.price)}
                      </p>
                    </div>
                    <p className="text-xl text-muted-foreground line-through font-bold mb-1 opacity-40">$199.99</p>
                  </div>

                  <div className="space-y-4">
                    {isEnrolled ? (
                      <Link href={`/courses/${course.id}/learn`} className="block">
                        <Button size="xl" className="w-full rounded-2xl font-black text-lg h-16 bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                          Continue Operation
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        size="xl"
                        className="w-full rounded-2xl font-black text-lg h-16 bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                        onClick={handleEnroll}
                        disabled={enrolling}
                      >
                        {enrolling ? "Synchronizing..." : "Initiate Access"}
                      </Button>
                    )}
                    <p className="text-[10px] font-black uppercase tracking-widest text-center text-muted-foreground opacity-60">
                      30-Day Failure Refund Policy
                    </p>
                  </div>

                  <div className="mt-12 space-y-8">
                    <h4 className="font-black uppercase tracking-widest text-xs text-foreground/60 border-b border-white/5 pb-4">Deployment Specs</h4>
                    <ul className="space-y-6">
                      {[
                        { icon: Clock, label: `${Math.floor(totalDuration / 3600)} Hours of High-Intensity Video` },
                        { icon: BookOpen, label: `${totalLessons} Targeted Combat Modules` },
                        { icon: Globe, label: "Global Professional Certification" },
                        { icon: Zap, label: "Infinite Lifetime Access" },
                        { icon: Laptop, label: "Access on any Intelligence Device" },
                      ].map((spec, i) => (
                        <li key={i} className="flex items-center gap-4 group/spec">
                          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary group-hover/spec:bg-primary group-hover/spec:text-white transition-all">
                            <spec.icon className="h-4 w-4" />
                          </div>
                          <span className="font-bold text-sm text-foreground/80">{spec.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Laptop(props: any) {
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
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  )
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}