"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, Award, TrendingUp, Users, DollarSign, BarChart, Calendar, Target, Zap, Star, PlayCircle, CheckCircle } from "lucide-react"

interface EnrolledCourse {
  id: string
  progress: number
  course: {
    id: string
    title: string
    description: string
    imageUrl?: string
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in")
      return
    }

    if (status === "authenticated") {
      fetchEnrolledCourses()
    }
  }, [status, router])

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch("/api/user/enrollments")
      if (response.ok) {
        const data = await response.json()
        setEnrolledCourses(data)
      }
    } catch (error) {
      console.error("Failed to fetch enrollments:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const userRole = session?.user?.role || 'STUDENT'
  const isInstructor = userRole === 'INSTRUCTOR'
  const isAdmin = userRole === 'ADMIN'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-blue-100">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || 'User')}&background=random`} />
                    <AvatarFallback>{session?.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Welcome back, {session?.user?.name}!
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge variant={userRole === 'ADMIN' ? 'destructive' : userRole === 'INSTRUCTOR' ? 'default' : 'secondary'}>
                        {userRole}
                      </Badge>
                      <span className="text-sm text-gray-500">Member since 2024</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">Continue your {isInstructor ? 'teaching' : 'learning'} journey</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="relative">
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
                🔔
                <span className="ml-2 hidden sm:inline">3</span>
              </Button>
              {isInstructor && (
                <Link href="/instructor">
                  <Button variant="outline">Instructor Panel</Button>
                </Link>
              )}
              <Link href="/courses">
                <Button>🚀 Browse Courses</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <Card className="lg:col-span-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to continue learning?</h3>
                  <p className="text-blue-100">
                    You have {enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length} courses in progress. 
                    Pick up where you left off!
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/courses">
                    <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                      Explore Courses
                    </Button>
                  </Link>
                  {enrolledCourses.some(c => c.progress > 0 && c.progress < 100) && (
                    <Link href={`/courses/${enrolledCourses.find(c => c.progress > 0 && c.progress < 100)?.course.id}`}>
                      <Button className="bg-white text-blue-600 hover:bg-gray-100">
                        Continue Learning
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-600">Day Streak</div>
              <div className="text-xs text-gray-500 mt-2">Keep it going!</div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isInstructor || isAdmin ? (
            // Instructor/Admin Stats
            <>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231</div>
                  <p className="text-xs text-muted-foreground">+20% from last month</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+2 this month</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <BarChart className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
            </>
          ) : (
            // Student Stats
            <>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  <p className="text-xs text-muted-foreground">Active enrollments</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <Award className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {enrolledCourses.filter(c => c.progress === 100).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Certificates earned</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Currently learning</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Days in a row</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* My Courses */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isInstructor ? 'My Courses' : 'My Enrollments'}
            </h2>
            {enrolledCourses.length > 0 && (
              <Link href="/courses">
                <Button variant="outline">Browse More</Button>
              </Link>
            )}
          </div>
          
          {enrolledCourses.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-16">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {isInstructor ? 'No courses created yet' : 'No courses yet'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {isInstructor 
                    ? 'Start creating courses and share your knowledge with students worldwide.'
                    : 'Start your learning journey by enrolling in a course that interests you.'
                  }
                </p>
                <Link href="/courses">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    {isInstructor ? 'Create First Course' : 'Browse Courses'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((enrollment) => (
                <Card key={enrollment.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="h-12 w-12 text-blue-600" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {enrollment.course.title}
                      </CardTitle>
                      {enrollment.progress === 100 && (
                        <Badge className="bg-green-500 hover:bg-green-400">
                          <Award className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {enrollment.course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Progress</span>
                          <span className="font-bold">{Math.round(enrollment.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              enrollment.progress === 100 
                                ? 'bg-green-500' 
                                : enrollment.progress >= 50 
                                ? 'bg-blue-600' 
                                : 'bg-orange-500'
                            }`}
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Link href={`/courses/${enrollment.course.id}`}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          {enrollment.progress === 100 ? 'Review Course' : 'Continue Learning'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Additional Sections */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { course: 'React Development', lesson: 'useState Hook', time: '2 hours ago', progress: 100, icon: CheckCircle },
                      { course: 'Python Data Science', lesson: 'NumPy Fundamentals', time: '1 day ago', progress: 75, icon: PlayCircle },
                      { course: 'Flutter Mobile', lesson: 'Dart Programming Basics', time: '3 days ago', progress: 45, icon: Clock },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`p-2 rounded-full ${
                          activity.progress === 100 ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          <activity.icon className={`h-5 w-5 ${
                            activity.progress === 100 ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.lesson}</div>
                          <div className="text-sm text-gray-600">{activity.course}</div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                        <div className="text-sm font-medium">
                          {activity.progress}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Achievements
                  </CardTitle>
                  <CardDescription>Your learning milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Target, color: 'text-blue-600', bg: 'bg-blue-100', label: 'First Course' },
                      { icon: Zap, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Fast Learner' },
                      { icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100', label: '5 Star Student' },
                      { icon: Award, color: 'text-green-600', bg: 'bg-green-100', label: 'Course Complete' },
                      { icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100', label: 'On Fire' },
                      { icon: Users, color: 'text-red-600', bg: 'bg-red-100', label: 'Helper' },
                    ].map((achievement, index) => (
                      <div key={index} className="text-center group cursor-pointer">
                        <div className={`${achievement.bg} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                          <achievement.icon className={`h-6 w-6 mx-auto ${achievement.color}`} />
                        </div>
                        <div className="text-xs mt-2 font-medium">{achievement.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Learning Path */}
          {!isInstructor && (
            <div className="mt-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Recommended Learning Path
                  </CardTitle>
                  <CardDescription>Personalized recommendations based on your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { title: 'Advanced React', level: 'Next Step', progress: 60, color: 'blue' },
                      { title: 'TypeScript Mastery', level: 'Recommended', progress: 0, color: 'purple' },
                      { title: 'Node.js Backend', level: 'Future', progress: 0, color: 'green' },
                    ].map((path, index) => (
                      <div key={index} className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{path.title}</h4>
                          <Badge variant="outline">{path.level}</Badge>
                        </div>
                        {path.progress > 0 && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-${path.color}-500`}
                                style={{ width: `${path.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}