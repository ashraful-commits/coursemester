import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, Award, BookOpen, Code, Target, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section with better design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🚀 Now with 100+ Courses
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Master Programming with
              <br />
              <span className="text-yellow-300">Interactive Courses</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Transform your career with hands-on learning from industry experts. 
              Build real projects, join a thriving community, and unlock your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/courses">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  Browse Courses
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                  Start Free Trial
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>50,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Industry Recognized</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features with better design */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CodeMaster?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to accelerate your programming journey and land your dream job
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Comprehensive Curriculum</CardTitle>
              <CardDescription className="text-gray-600">
                From beginner to advanced, master HTML, CSS, JavaScript, React, Python, and more with structured learning paths.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Hands-on Projects</CardTitle>
              <CardDescription className="text-gray-600">
                Build 20+ real-world projects including e-commerce sites, mobile apps, and machine learning models for your portfolio.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Career Support</CardTitle>
              <CardDescription className="text-gray-600">
                Get resume reviews, interview prep, and job placement assistance from our career services team.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Learn at Your Pace</CardTitle>
              <CardDescription className="text-gray-600">
                Flexible learning schedule with lifetime access to course materials and downloadable resources.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle>Community Support</CardTitle>
              <CardDescription className="text-gray-600">
                Join 50,000+ learners in our active Discord community and get help from instructors and peers.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle>Certificates</CardTitle>
              <CardDescription className="text-gray-600">
                Earn industry-recognized certificates that validate your skills and boost your resume.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="container mx-auto px-4 py-20 bg-gray-50 rounded-2xl">
        <div className="text-center mb-16">
          <Badge className="mb-4">Popular Courses</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Learning Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students mastering new skills with our best-selling courses
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
            <div className="relative h-48 overflow-hidden">
              <img 
                src="/covers/react-bootcamp.svg" 
                alt="React Development Bootcamp"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-600">Bestseller</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Complete React Development Bootcamp</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.8</span>
                </div>
                <span>•</span>
                <span>2,450 students</span>
              </div>
              <CardDescription>
                Master React from scratch and build real-world applications with Redux, Hooks, and deployment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">$89.99</span>
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                <span>42 hours</span>
                <span>•</span>
                <span>285 lessons</span>
              </div>
              <Link href="/courses/react-development">
                <Button className="w-full">View Course</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
            <div className="relative h-48 overflow-hidden">
              <img 
                src="/covers/python-data-science.svg" 
                alt="Python for Data Science"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-600">Hot</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Python for Data Science & ML</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.9</span>
                </div>
                <span>•</span>
                <span>3,120 students</span>
              </div>
              <CardDescription>
                Learn Python, NumPy, Pandas, and machine learning with hands-on projects and real datasets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">$129.99</span>
                <Badge variant="secondary">Intermediate</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                <span>58 hours</span>
                <span>•</span>
                <span>420 lessons</span>
              </div>
              <Link href="/courses/python-data-science">
                <Button className="w-full">View Course</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
            <div className="relative h-48 overflow-hidden">
              <img 
                src="/covers/flutter-mobile.svg" 
                alt="Flutter Mobile Development"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-purple-600">New</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Flutter Mobile App Development</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.7</span>
                </div>
                <span>•</span>
                <span>890 students</span>
              </div>
              <CardDescription>
                Build beautiful, cross-platform mobile apps for iOS and Android using Flutter and Dart.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">$99.99</span>
                <Badge variant="secondary">Intermediate</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                <span>36 hours</span>
                <span>•</span>
                <span>198 lessons</span>
              </div>
              <Link href="/courses/flutter-mobile">
                <Button className="w-full">View Course</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-12">
          <Link href="/courses">
            <Button variant="outline" size="lg" className="px-8">
              View All Courses
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-600">Active Students</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
            <div className="text-gray-600">Expert Courses</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Limited Time</Badge>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Career?</h3>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of students who are already mastering programming and landing their dream jobs with CodeMaster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                Browse Courses
              </Button>
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            ✨ 7-day free trial • Cancel anytime • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">CodeMaster</h3>
              <p className="text-gray-400">
                Master programming with interactive courses and real-world projects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/courses" className="hover:text-white transition-colors">Web Development</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Data Science</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Mobile Development</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">DevOps</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CodeMaster. All rights reserved. Made with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}