"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock course database that matches the courses list
const mockCourseDatabase: Record<string, any> = {
  "react-development": {
    id: "react-development",
    title: "Complete React Development Bootcamp",
    description: "Master React from scratch and build real-world applications. This comprehensive course covers React fundamentals, hooks, state management, routing, and deployment.",
    price: 89.99,
    originalPrice: 199.99,
    level: "BEGINNER",
    isPublished: true,
    category: { name: "Web Development" },
    instructor: {
      name: "Sarah Johnson",
      bio: "Senior Frontend Developer with 8+ years of experience in React and JavaScript. Worked at Fortune 500 companies and startups.",
      image: "/avatars/sarah.jpg"
    },
    chapters: [
      {
        id: "ch1",
        title: "React Fundamentals",
        description: "Learn the basics of React including components, props, and state",
        position: 1,
        lessons: [
          { id: "l1", title: "Introduction to React", duration: 1800, isFree: true },
          { id: "l2", title: "Components and JSX", duration: 2400, isFree: false },
          { id: "l3", title: "Props and State", duration: 2100, isFree: false },
          { id: "l4", title: "Event Handling", duration: 1900, isFree: false }
        ]
      },
      {
        id: "ch2", 
        title: "React Hooks",
        description: "Master modern React hooks for state management",
        position: 2,
        lessons: [
          { id: "l5", title: "useState Hook", duration: 1600, isFree: false },
          { id: "l6", title: "useEffect Hook", duration: 2000, isFree: false },
          { id: "l7", title: "Custom Hooks", duration: 2200, isFree: false }
        ]
      },
      {
        id: "ch3",
        title: "Advanced React", 
        description: "Learn advanced React concepts and patterns",
        position: 3,
        lessons: [
          { id: "l8", title: "Context API", duration: 1800, isFree: false },
          { id: "l9", title: "Performance Optimization", duration: 2500, isFree: false },
          { id: "l10", title: "Testing React Apps", duration: 2100, isFree: false }
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        rating: 5,
        comment: "Excellent course! Sarah explains concepts clearly and the projects are very practical.",
        user: { name: "John Doe", image: "/avatars/john.jpg" }
      },
      {
        id: "r2", 
        rating: 4,
        comment: "Great content, but would like more advanced topics in future updates.",
        user: { name: "Jane Smith", image: "/avatars/jane.jpg" }
      }
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
    isPublished: true,
    category: { name: "Data Science" },
    instructor: {
      name: "Dr. Michael Chen",
      bio: "PhD in Computer Science with 10+ years of experience in data science and machine learning. Published researcher and industry consultant.",
      image: "/avatars/michael.jpg"
    },
    chapters: [
      {
        id: "ch1",
        title: "Python Basics for Data Science",
        description: "Python fundamentals specifically for data analysis",
        position: 1,
        lessons: [
          { id: "l1", title: "Python Setup and Basics", duration: 2400, isFree: true },
          { id: "l2", title: "NumPy Fundamentals", duration: 3000, isFree: false },
          { id: "l3", title: "Pandas DataFrames", duration: 3600, isFree: false }
        ]
      },
      {
        id: "ch2",
        title: "Data Visualization",
        description: "Create compelling data visualizations with Python",
        position: 2,
        lessons: [
          { id: "l4", title: "Matplotlib Basics", duration: 2100, isFree: false },
          { id: "l5", title: "Advanced Plotting", duration: 2700, isFree: false },
          { id: "l6", title: "Seaborn Statistical Plots", duration: 2400, isFree: false }
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        rating: 5,
        comment: "Comprehensive coverage of data science topics. Dr. Chen is an excellent instructor!",
        user: { name: "Emily Johnson", image: "/avatars/emily.jpg" }
      }
    ],
    _count: {
      enrollments: 3120,
      reviews: 24
    }
  },
  "flutter-mobile": {
    id: "flutter-mobile",
    title: "Flutter Mobile App Development",
    description: "Build beautiful, native-quality iOS and Android apps using Flutter. Learn Dart programming, widgets, state management, and app deployment.",
    price: 99.99,
    originalPrice: 179.99,
    level: "INTERMEDIATE",
    isPublished: true,
    category: { name: "Mobile Development" },
    instructor: {
      name: "Alex Kumar",
      bio: "Mobile app developer with 7+ years of experience building cross-platform apps. Flutter early adopter and community contributor.",
      image: "/avatars/alex.jpg"
    },
    chapters: [
      {
        id: "ch1",
        title: "Flutter and Dart Basics",
        description: "Learn the fundamentals of Flutter and Dart programming",
        position: 1,
        lessons: [
          { id: "l1", title: "Introduction to Flutter", duration: 1800, isFree: true },
          { id: "l2", title: "Dart Programming Basics", duration: 2400, isFree: false },
          { id: "l3", title: "Flutter Widgets", duration: 2000, isFree: false }
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        rating: 5,
        comment: "Great course for learning Flutter! Alex explains everything clearly.",
        user: { name: "Robert Wilson", image: "/avatars/robert.jpg" }
      }
    ],
    _count: {
      enrollments: 890,
      reviews: 12
    }
  },
  "docker-kubernetes": {
    id: "docker-kubernetes",
    title: "Docker and Kubernetes Masterclass",
    description: "Master containerization and orchestration with Docker and Kubernetes. Learn to build, deploy, and scale modern applications.",
    price: 119.99,
    originalPrice: 229.99,
    level: "ADVANCED",
    isPublished: true,
    category: { name: "DevOps" },
    instructor: {
      name: "David Park",
      bio: "DevOps engineer with 9+ years of experience in containerization and cloud-native technologies. AWS and Kubernetes certified.",
      image: "/avatars/david.jpg"
    },
    chapters: [
      {
        id: "ch1",
        title: "Docker Fundamentals",
        description: "Learn containerization with Docker",
        position: 1,
        lessons: [
          { id: "l1", title: "Introduction to Containers", duration: 1600, isFree: true },
          { id: "l2", title: "Docker Images and Containers", duration: 2200, isFree: false },
          { id: "l3", title: "Docker Compose", duration: 1900, isFree: false }
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        rating: 5,
        comment: "Excellent coverage of Docker and K8s. Very practical examples!",
        user: { name: "Maria Garcia", image: "/avatars/maria.jpg" }
      }
    ],
    _count: {
      enrollments: 567,
      reviews: 8
    }
  }
}

interface Course {
  id: string
  title: string
  description: string
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

export default function CourseDetail({ params }: { params: Promise<{ courseId: string }> }) {
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
      // Use mock data for demonstration
      const courseData = mockCourseDatabase[resolvedParams.courseId]
      
      if (courseData) {
        setCourse(courseData)
        
        // Check if enrolled (simplified - in real app, this would come from API)
        if (session?.user?.id) {
          checkEnrollment()
        }
      } else {
        // Fallback to API if not found in mock data
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
        const enrolled = enrollments.some((e: any) => e.courseId === resolvedParams.courseId)
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
      const response = await fetch(`/api/courses/${resolvedParams.courseId}/enroll`, {
        method: "POST",
      })

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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">Course not found</div>
  }

  const totalLessons = course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
  const totalDuration = course.chapters.reduce((acc, chapter) => 
    acc + chapter.lessons.reduce((lessonAcc, lesson) => lessonAcc + (lesson.duration || 0), 0), 0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/courses" className="text-blue-600 hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </div>

      {/* Course Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl mb-6">{course.description}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {course.level}
                </span>
                <span className="text-sm">
                  {totalLessons} lessons • {Math.round(totalDuration / 60)} hours
                </span>
                <span className="text-sm">
                  {course._count.enrollments} students enrolled
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-300">Instructor</p>
                  <p className="font-semibold">{course.instructor.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Category</p>
                  <p className="font-semibold">{course.category.name}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold mb-4">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </div>
                {isEnrolled ? (
                  <Link href={`/courses/${course.id}/learn`}>
                    <Button size="lg" className="w-full">Continue Learning</Button>
                  </Link>
                ) : (
                  <Link href={`/courses/${course.id}/enroll`}>
                    <Button size="lg" className="w-full">
                      Enroll Now
                    </Button>
                  </Link>
                )}
                <p className="text-sm mt-2 text-gray-300">30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {course.chapters.length} chapters • {totalLessons} lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                {course.chapters.map((chapter, index) => (
                  <div key={chapter.id} className="mb-6">
                    <h4 className="font-semibold mb-2">
                      {index + 1}. {chapter.title}
                    </h4>
                    {chapter.description && (
                      <p className="text-gray-600 text-sm mb-2">{chapter.description}</p>
                    )}
                    <div className="space-y-1">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                              {index + 1}.{lessonIndex + 1}
                            </span>
                            <span className="text-sm">{lesson.title}</span>
                            {lesson.isFree && (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Free</span>
                            )}
                          </div>
                          {lesson.duration && (
                            <span className="text-sm text-gray-500">
                              {Math.round(lesson.duration / 60)} min
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            {course.reviews.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>{course._count.reviews} reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            <span className="font-medium">{review.user.name}</span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold">{course.instructor.name}</p>
                    <p className="text-sm text-gray-600">Course Instructor</p>
                  </div>
                </div>
                {course.instructor.bio && (
                  <p className="text-sm text-gray-600">{course.instructor.bio}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}