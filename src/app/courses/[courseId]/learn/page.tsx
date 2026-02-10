"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, PlayCircle, Clock, CheckCircle } from "lucide-react"
import { VideoPreviewModal } from "@/components/video-preview-modal"

export default function LearnPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    if (!session?.user?.id) {
      router.push("/sign-in")
      return
    }
    fetchCourse()
  }, [session, router])

  const fetchCourse = async () => {
    try {
      // Mock data for demonstration
      const mockCourse = {
        id: "react-development",
        title: "Complete React Development Bootcamp",
        instructor: "Sarah Johnson",
        progress: 45,
        chapters: [
          {
            id: "ch1",
            title: "React Fundamentals",
            lessons: [
              { id: "l1", title: "Introduction to React", duration: 1800, completed: true },
              { id: "l2", title: "Components and JSX", duration: 2400, completed: true },
              { id: "l3", title: "Props and State", duration: 2100, completed: false },
              { id: "l4", title: "Event Handling", duration: 1900, completed: false }
            ]
          },
          {
            id: "ch2", 
            title: "React Hooks",
            lessons: [
              { id: "l5", title: "useState Hook", duration: 1600, completed: false },
              { id: "l6", title: "useEffect Hook", duration: 2000, completed: false }
            ]
          }
        ]
      }
      
      setCourse(mockCourse)
    } catch (error) {
      console.error("Failed to fetch course:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = (lesson: any) => {
    setSelectedLesson({
      ...lesson,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Sample video
    })
    setIsVideoModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-blue-600 hover:underline">
                ← Dashboard
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-xl font-semibold">{course.title}</h1>
            </div>
            <Link href={`/courses/${course.id}`}>
              <Button variant="outline">Course Details</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Course Progress</h2>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{course.progress}%</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
            <Progress value={course.progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Course Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Course Content
            </CardTitle>
            <CardDescription>Click on any lesson to continue learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {course.chapters.map((chapter: any, chapterIndex: number) => (
                <div key={chapter.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-4">
                    {chapterIndex + 1}. {chapter.title}
                  </h3>
                  <div className="space-y-2">
                    {chapter.lessons.map((lesson: any, lessonIndex: number) => (
                      <div 
                        key={lesson.id} 
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          lesson.completed 
                            ? 'bg-green-50 hover:bg-green-100' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => handleVideoClick(lesson)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1 rounded ${
                            lesson.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : (
                              <PlayCircle className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{lesson.title}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{Math.round(lesson.duration / 60)} minutes</span>
                              {lesson.completed && (
                                <Badge className="bg-green-100 text-green-800 ml-2">
                                  Completed
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Video Preview Modal */}
        {selectedLesson && (
          <VideoPreviewModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            lesson={selectedLesson}
            courseTitle={course.title}
          />
        )}
      </div>
    </div>
  )
}