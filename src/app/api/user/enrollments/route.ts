import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Return mock enrollments for test users
    if (session.user.email?.endsWith("@example.com")) {
      const mockEnrollments = [
        {
          id: "enroll1",
          progress: 75,
          userId: session.user.id,
          course: {
            id: "react-development",
            title: "Complete React Development Bootcamp",
            description: "Master React from scratch and build real-world applications.",
            imageUrl: "/covers/react-bootcamp.svg"
          }
        },
        {
          id: "enroll2", 
          progress: 45,
          userId: session.user.id,
          course: {
            id: "python-data-science",
            title: "Python for Data Science and Machine Learning",
            description: "Learn Python programming and apply it to data science.",
            imageUrl: "/covers/python-data-science.svg"
          }
        },
        {
          id: "enroll3",
          progress: 100,
          userId: session.user.id,
          course: {
            id: "flutter-mobile",
            title: "Flutter Mobile App Development", 
            description: "Build beautiful, native-quality iOS and Android apps.",
            imageUrl: "/covers/flutter-mobile.svg"
          }
        }
      ]
      return NextResponse.json(mockEnrollments)
    }

    // For real users, fetch from database
    const enrollments = await db.enrollment.findMany({
      where: { userId: session.user.id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error("GET enrollments error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}