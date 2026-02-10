"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Users, Search, Heart, Filter, TrendingUp, Award, BookOpen, Play } from "lucide-react"
import Link from "next/link"
import { CourseCardSkeleton } from "@/components/ui/skeleton"

// Enhanced mock courses with real data
const mockCourses = [
  {
    id: "react-development",
    title: "Complete React Development Bootcamp",
    description: "Master React from scratch and build real-world applications. This comprehensive course covers React fundamentals, hooks, state management, routing, and deployment.",
    price: 89.99,
    originalPrice: 199.99,
    level: "BEGINNER",
    category: "Web Development",
    imageUrl: "/covers/react-bootcamp.svg",
    rating: 4.8,
    students: 2450,
    duration: "42 hours",
    lessons: 285,
    instructor: "Sarah Johnson",
    instructorAvatar: "/avatars/sarah.jpg",
    badge: "Bestseller",
    lastUpdated: "2 weeks ago"
  },
  {
    id: "python-data-science",
    title: "Python for Data Science and Machine Learning",
    description: "Learn Python programming and apply it to data science, machine learning, and artificial intelligence. Includes NumPy, Pandas, Matplotlib, and Scikit-learn.",
    price: 129.99,
    originalPrice: 249.99,
    level: "INTERMEDIATE",
    category: "Data Science",
    imageUrl: "/covers/python-data-science.svg",
    rating: 4.9,
    students: 3120,
    duration: "58 hours",
    lessons: 420,
    instructor: "Dr. Michael Chen",
    instructorAvatar: "/avatars/michael.jpg",
    badge: "Hot",
    lastUpdated: "1 week ago"
  },
  {
    id: "flutter-mobile",
    title: "Flutter Mobile App Development",
    description: "Build beautiful, native-quality iOS and Android apps using Flutter. Learn Dart programming, widgets, state management, and app deployment.",
    price: 99.99,
    originalPrice: 179.99,
    level: "INTERMEDIATE",
    category: "Mobile Development",
    imageUrl: "/covers/flutter-mobile.svg",
    rating: 4.7,
    students: 890,
    duration: "36 hours",
    lessons: 198,
    instructor: "Alex Kumar",
    instructorAvatar: "/avatars/alex.jpg",
    badge: "New",
    lastUpdated: "3 days ago"
  },
  {
    id: "docker-kubernetes",
    title: "Docker and Kubernetes Masterclass",
    description: "Master containerization and orchestration with Docker and Kubernetes. Learn to build, deploy, and scale modern applications.",
    price: 119.99,
    originalPrice: 229.99,
    level: "ADVANCED",
    category: "DevOps",
    imageUrl: "/covers/docker-kubernetes.svg",
    rating: 4.6,
    students: 567,
    duration: "44 hours",
    lessons: 312,
    instructor: "David Park",
    instructorAvatar: "/avatars/david.jpg",
    badge: "Popular",
    lastUpdated: "1 month ago"
  }
]

// Statistics data
const stats = [
  { label: "Active Students", value: "15,234", icon: Users, color: "text-blue-600" },
  { label: "Expert Instructors", value: "142", icon: Award, color: "text-green-600" },
  { label: "Total Courses", value: "384", icon: BookOpen, color: "text-purple-600" },
  { label: "Success Rate", value: "98%", icon: TrendingUp, color: "text-orange-600" }
]

// Testimonials
const testimonials = [
  {
    name: "Emma Thompson",
    role: "Full Stack Developer",
    content: "The React course transformed my career. The instructor's teaching style is exceptional and the projects are industry-relevant.",
    rating: 5,
    avatar: "/avatars/emma.jpg"
  },
  {
    name: "James Rodriguez",
    role: "Data Scientist",
    content: "Best investment in my professional development. The Python data science course gave me the skills I needed to land my dream job.",
    rating: 5,
    avatar: "/avatars/james.jpg"
  }
]

export default function CoursesPage() {
  // Simulate loading state
  const [isLoading, setIsLoading] = React.useState(false)

  // Demo function to toggle loading state
  const toggleLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-500 text-yellow-900 hover:bg-yellow-400">
              🎓 Limited Time: 30% OFF All Courses
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Master New Skills with
              <span className="text-yellow-400"> Premium Courses</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed">
              Join 15,000+ students learning from industry experts. 
              Transform your career with hands-on, project-based learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-in">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 text-lg font-semibold">
                  Start Learning Today
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold">
                Browse Free Courses
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="grid lg:grid-cols-12 gap-4 items-end">
              <div className="lg:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Courses</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="What do you want to learn?" 
                    className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <Select>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-2">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Most Popular</Button>
              <Button variant="ghost" size="sm">Highest Rated</Button>
              <Button variant="ghost" size="sm">Newest</Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 4 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))
            ) : (
              // Show actual course cards
              mockCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {course.imageUrl ? (
                    <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-gray-400">
                      {course.title.charAt(0)}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Badge */}
                  <Badge className={`absolute top-3 left-3 ${
                    course.badge === 'Bestseller' ? 'bg-yellow-500 hover:bg-yellow-400' :
                    course.badge === 'Hot' ? 'bg-red-500 hover:bg-red-400' :
                    course.badge === 'New' ? 'bg-green-500 hover:bg-green-400' :
                    'bg-purple-500 hover:bg-purple-400'
                  }`}>
                    {course.badge}
                  </Badge>

                  {/* Wishlist Button */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 h-8 w-8"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button className="bg-white hover:bg-gray-100 text-gray-900 rounded-full h-12 w-12 p-0">
                      <Play className="h-5 w-5 ml-1" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Category and Level */}
                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Rating and Students */}
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(course.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-gray-500">({course.students.toLocaleString()})</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={course.instructorAvatar} />
                      <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{course.instructor}</p>
                      <p className="text-xs text-gray-500">{course.lastUpdated}</p>
                    </div>
                  </div>

                  {/* Duration and Lessons */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                      <div className="text-sm text-gray-500 line-through">${course.originalPrice}</div>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        View Course
                      </Button>
                    </Link>
                  </div>
</CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Load More */}
          <div className="text-center mt-12 space-y-4">
            <div className="flex gap-4 justify-center">
              <Button variant="outline" size="lg" className="px-8">
                Load More Courses
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={toggleLoading}
                className="px-8"
              >
                Demo Loading State
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Click "Demo Loading State" to see skeleton loading animations
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied learners</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-gray-200">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}