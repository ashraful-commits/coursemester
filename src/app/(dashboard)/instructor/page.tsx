"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Course {
  id: string
  title: string
  description: string
  price: number
  isPublished: boolean
  category: {
    name: string
  }
  _count: {
    enrollments: number
    reviews: number
  }
}

interface Analytics {
  totalRevenue: number
  totalEnrollments: number
  totalCourses: number
  averageRating: string
  courses: Course[]
}

export default function InstructorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in")
      return
    }

    if (status === "authenticated") {
      fetchAnalytics()
    }
  }, [status, router])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/instructor/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        // If user is not an instructor or has no courses, show empty state
        setAnalytics({
          totalRevenue: 0,
          totalEnrollments: 0,
          totalCourses: 0,
          averageRating: "0",
          courses: [],
        })
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your courses and track performance</p>
            </div>
            <Link href="/instructor/courses/new">
              <Button>Create Course</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics?.totalRevenue.toFixed(2) || "0.00"}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalEnrollments || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalCourses || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics?.averageRating || "0.0"} ⭐
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          {analytics?.courses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                <p className="text-gray-600 mb-4">Start creating your first course</p>
                <Link href="/instructor/courses/new">
                  <Button>Create Your First Course</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {analytics?.courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <span className={`px-2 py-1 text-xs rounded ${
                        course.isPublished 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Price:</span>
                        <span className="font-medium">${course.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Students:</span>
                        <span className="font-medium">{course._count.enrollments}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Reviews:</span>
                        <span className="font-medium">{course._count.reviews}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue:</span>
                        <span className="font-medium">
                          ${(course.price * course._count.enrollments).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link href={`/instructor/courses/${course.id}`}>
                        <Button variant="outline" className="w-full">Edit Course</Button>
                      </Link>
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="ghost" className="w-full">View Course</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}