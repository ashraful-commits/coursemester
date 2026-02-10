"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Clock, 
  Users, 
  Star, 
  Award, 
  CheckCircle, 
  Lock, 
  CreditCard, 
  Shield, 
  BookOpen,
  DollarSign,
  Zap,
  TrendingUp,
  Target,
  Play
} from "lucide-react"
import { VideoPreviewModal } from "@/components/video-preview-modal"
import { PaymentModal } from "@/components/payment-modal"

interface Course {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number
  level: string
  category: string
  imageUrl?: string
  instructor: {
    name: string
    bio?: string
    image?: string
  }
  chapters: Array<{
    id: string
    title: string
    lessons: Array<{
      id: string
      title: string
      duration?: number
      isFree: boolean
    }>
  }>
  reviews: Array<{
    rating: number
    user: {
      name: string
    }
  }>
  _count: {
    enrollments: number
    reviews: number
  }
}

export default function EnrollmentPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params)
  const { data: session } = useSession()
  const router = useRouter()
  
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("standard")
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  useEffect(() => {
    fetchCourse()
  }, [resolvedParams.courseId])

  useEffect(() => {
    if (course) {
      const timer = setTimeout(() => {
        const firstFreeLesson = course.chapters.flatMap(ch => ch.lessons).find(l => l.isFree)
        if (firstFreeLesson) {
          setSelectedLesson({
            ...firstFreeLesson,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            description: "This is a free preview lesson that gives you a taste of the course content and teaching style. Click on any lesson to watch different videos!"
          })
          setIsVideoModalOpen(true)
        }
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [course])

  const fetchCourse = async () => {
    try {
      const mockCourses: Record<string, Course> = {
        "react-development": {
          id: "react-development",
          title: "Complete React Development Bootcamp",
          description: "Master React from scratch and build real-world applications. This comprehensive course covers React fundamentals, hooks, state management, routing, and deployment.",
          price: 89.99,
          originalPrice: 199.99,
          level: "BEGINNER",
          category: "Web Development",
          instructor: {
            name: "Sarah Johnson",
            bio: "Senior Frontend Developer with 8+ years of experience in React and JavaScript. Worked at Fortune 500 companies and startups.",
            image: "/avatars/sarah.jpg"
          },
          chapters: [
            {
              id: "ch1",
              title: "React Fundamentals",
              lessons: [
                { id: "l1", title: "Introduction to React", duration: 1800, isFree: true },
                { id: "l2", title: "Components and JSX", duration: 2400, isFree: true },
              ]
            }
          ],
          reviews: [
            { rating: 5, user: { name: "John Doe" } },
            { rating: 4, user: { name: "Jane Smith" } }
          ],
          _count: {
            enrollments: 2450,
            reviews: 18
          }
        },
        "python-data-science": {
          id: "python-data-science",
          title: "Python for Data Science and Machine Learning",
          description: "Learn Python programming and apply it to data science, machine learning, and artificial intelligence. Includes NumPy, Pandas, Matplotlib, and Scikit-learn.",
          price: 129.99,
          originalPrice: 249.99,
          level: "INTERMEDIATE",
          category: "Data Science",
          instructor: {
            name: "Dr. Michael Chen",
            bio: "PhD in Computer Science with 10+ years of experience in data science and machine learning. Published researcher and industry consultant.",
            image: "/avatars/michael.jpg"
          },
          chapters: [
            {
              id: "ch1",
              title: "Python Basics for Data Science",
              lessons: [
                { id: "l1", title: "Python Setup and Basics", duration: 2400, isFree: true },
                { id: "l2", title: "NumPy Fundamentals", duration: 3000, isFree: true },
                { id: "l3", title: "Pandas DataFrames", duration: 3600, isFree: false },
                { id: "l4", title: "Data Cleaning with Pandas", duration: 2700, isFree: false },
              ]
            },
            {
              id: "ch2",
              title: "Data Visualization",
              lessons: [
                { id: "l5", title: "Matplotlib Basics", duration: 2100, isFree: true },
                { id: "l6", title: "Advanced Plotting", duration: 2700, isFree: false },
                { id: "l7", title: "Seaborn Statistical Plots", duration: 2400, isFree: false },
              ]
            },
            {
              id: "ch3",
              title: "Machine Learning Fundamentals",
              lessons: [
                { id: "l8", title: "Introduction to ML", duration: 1800, isFree: false },
                { id: "l9", title: "Supervised Learning", duration: 3200, isFree: false },
                { id: "l10", title: "Unsupervised Learning", duration: 2800, isFree: false },
              ]
            }
          ],
          reviews: [
            { rating: 5, user: { name: "Emily Johnson" } },
            { rating: 4, user: { name: "James Rodriguez" } }
          ],
          _count: {
            enrollments: 3120,
            reviews: 24
          }
        },
        "docker-kubernetes": {
          id: "docker-kubernetes",
          title: "Docker and Kubernetes Masterclass",
          description: "Master containerization and orchestration with Docker and Kubernetes. Learn to build, deploy, and scale modern applications.",
          price: 119.99,
          originalPrice: 229.99,
          level: "ADVANCED",
          category: "DevOps",
          instructor: {
            name: "David Park",
            bio: "DevOps engineer with 9+ years of experience in containerization and cloud-native technologies. AWS and Kubernetes certified.",
            image: "/avatars/david.jpg"
          },
          chapters: [
            {
              id: "ch1",
              title: "Docker Fundamentals",
              lessons: [
                { id: "l1", title: "Introduction to Containers", duration: 1620, isFree: true },
                { id: "l2", title: "Docker Images and Containers", duration: 2220, isFree: true },
                { id: "l3", title: "Docker Compose", duration: 1980, isFree: false },
              ]
            },
            {
              id: "ch2",
              title: "Container Orchestration",
              lessons: [
                { id: "l4", title: "Kubernetes Architecture", duration: 2100, isFree: false },
                { id: "l5", title: "Deploying Applications", duration: 2400, isFree: false },
              ]
            },
            {
              id: "ch3",
              title: "Advanced Topics",
              lessons: [
                { id: "l6", title: "Monitoring and Logging", duration: 2280, isFree: false },
                { id: "l7", title: "Security and Best Practices", duration: 1950, isFree: false },
              ]
            }
          ],
          reviews: [
            { rating: 5, user: { name: "Maria Garcia" } },
            { rating: 4, user: { name: "Robert Wilson" } }
          ],
          _count: {
            enrollments: 567,
            reviews: 8
          }
        }
      }

      const courseData = mockCourses[resolvedParams.courseId]
      if (courseData) {
        setCourse(courseData)
        checkEnrollment()
      }
    } catch (error) {
      console.error("Failed to fetch course:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkEnrollment = async () => {
    try {
      const response = await fetch(`/api/courses/${resolvedParams.courseId}/enroll`)
      if (response.ok) {
        const data = await response.json()
        setIsEnrolled(data.isEnrolled)
      }
    } catch (error) {
      console.error("Failed to check enrollment:", error)
    }
  }

  const handleEnroll = async () => {
    if (!session?.user?.id) {
      router.push(`/sign-in?callbackUrl=/courses/${resolvedParams.courseId}/enroll`)
      return
    }

    // Open payment modal instead of direct enrollment
    setIsPaymentModalOpen(true)
  }

  const handlePaymentComplete = (paymentData: any) => {
    console.log("Payment completed:", paymentData)
    setEnrolling(true)
    setTimeout(() => {
      router.push(`/courses/${resolvedParams.courseId}/learn`)
    }, 2000)
  }

  const handlePreviewClick = (lesson: any) => {
    console.log("Preview clicked for lesson:", lesson, "isFree:", lesson.isFree)
    
    const lessonWithVideo = {
      ...lesson,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: lesson.isFree 
        ? "This is a free preview lesson that gives you a taste of the course content and teaching style."
        : "This is a premium lesson. Enroll in the course to get full access to all lessons and materials."
    }
    
    setSelectedLesson(lessonWithVideo)
    setIsVideoModalOpen(true)
    console.log("Opening video modal with lesson:", lessonWithVideo)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course information...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isEnrolled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Already Enrolled!</h1>
            <p className="text-gray-600 mb-6">You are already enrolled in this course.</p>
            <Link href={`/courses/${course.id}/learn`}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                Continue Learning
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalLessons = course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
  const avgRating = course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length
  const discountPercentage = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/courses/${course.id}`} className="text-blue-600 hover:underline flex items-center gap-2">
            ← Back to Course
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-2xl font-bold mb-1">{course.title}</h1>
                        <p className="text-gray-600 text-sm">{course.description}</p>
                      </div>
                      <Badge className="bg-yellow-500 hover:bg-yellow-400">
                        {discountPercentage}% OFF
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{avgRating.toFixed(1)}</span>
                        <span>({course._count.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course._count.enrollments.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{totalLessons} lessons</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Your Instructor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={course.instructor.image} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{course.instructor.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{course.instructor.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8 Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>15,234 Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>8 Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  What You'll Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Build modern React applications from scratch",
                    "Master React Hooks and state management",
                    "Implement routing and navigation",
                    "Deploy React apps to production",
                    "Use modern development tools and workflows",
                    "Write clean, maintainable React code"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Course Content
                </CardTitle>
                <CardDescription>{course.chapters.length} chapters • {totalLessons} lessons</CardDescription>
              </CardHeader>
              <CardContent className="p-4 mb-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-1">🎬 Video Preview Available!</h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Click on any FREE lesson below to watch sample videos and experience the teaching quality.
                        {course.chapters.some(ch => ch.lessons.some(l => l.isFree)) && (
                          <span> The first free lesson preview will start automatically.</span>
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Multiple free lessons available</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <Play className="h-4 w-4" />
                          <span>HD video quality</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="space-y-4">
                  {course.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{index + 1}. {chapter.title}</h4>
                        <Badge variant="outline">{chapter.lessons.length} lessons</Badge>
                      </div>
                      <div className="space-y-2">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lesson.id} 
                            className={`flex items-center justify-between py-2 px-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer transition-colors ${
                              lesson.isFree ? 'ring-2 ring-green-200' : ''
                            }`}
                            onClick={() => handlePreviewClick(lesson)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                                lesson.isFree ? 'bg-green-500' : 'bg-gray-400'
                              }`}>
                                {lesson.isFree ? '▶' : '🔒'}
                              </div>
                              <span className="text-sm text-gray-500">
                                {index + 1}.{lessonIndex + 1}
                              </span>
                              <span className="text-sm font-medium">{lesson.title}</span>
                              {lesson.isFree && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                  Free Preview
                                </Badge>
                              )}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handlePreviewClick(lesson)
                              }}
                            >
                              {lesson.isFree ? "Watch Video" : "Preview"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">${course.price}</div>
                    <div className="text-lg line-through opacity-75">${course.originalPrice}</div>
                    <div className="text-sm mt-2">
                      Save ${course.originalPrice - course.price} ({discountPercentage}% off)
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="font-medium">Standard Access</div>
                        <div className="text-sm text-gray-600">Full course access</div>
                      </Label>
                      <div className="font-bold">${course.price}</div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium" className="flex-1 cursor-pointer">
                        <div className="font-medium">Premium Access</div>
                        <div className="text-sm text-gray-600">Course + Certificate</div>
                      </Label>
                      <div className="font-bold">${(course.price * 1.5).toFixed(2)}</div>
                    </div>
                  </RadioGroup>

                  <Separator />

                  <Button 
                    onClick={handleEnroll} 
                    disabled={enrolling}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                  >
                    {enrolling ? "Processing..." : `Proceed to Payment - $${selectedPlan === 'premium' ? (course.price * 1.5).toFixed(2) : course.price}`}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Certificate of Completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm">Lifetime Access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Career Support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <VideoPreviewModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          lesson={selectedLesson}
          courseTitle={course.title}
        />

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentComplete={handlePaymentComplete}
          amount={selectedPlan === 'premium' ? course.price * 1.5 : course.price}
          courseTitle={course.title}
        />

        
      </div>
    </div>
  )
}