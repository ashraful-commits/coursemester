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

    const courses = await db.course.findMany({
      where: {
        instructorId: session.user.id,
      },
      include: {
        enrollments: true,
        reviews: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    })

    const totalRevenue = courses.reduce((acc, course) => {
      const courseRevenue = course.enrollments.length * course.price
      return acc + courseRevenue
    }, 0)

    const totalEnrollments = courses.reduce((acc, course) => {
      return acc + course.enrollments.length
    }, 0)

    const averageRating = courses.reduce((acc, course) => {
      const courseAvg =
        course.reviews.reduce((sum, review) => sum + review.rating, 0) /
        (course.reviews.length || 1)
      return acc + courseAvg
    }, 0) / (courses.length || 1)

    return NextResponse.json({
      totalRevenue,
      totalEnrollments,
      totalCourses: courses.length,
      averageRating: averageRating.toFixed(1),
      courses: courses.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        isPublished: course.isPublished,
        enrollments: course.enrollments.length,
        revenue: course.enrollments.length * course.price,
        rating:
          course.reviews.reduce((sum, review) => sum + review.rating, 0) /
          (course.reviews.length || 1),
        category: course.category,
        _count: {
          enrollments: course.enrollments.length,
          reviews: course.reviews.length,
        },
      })),
    })
  } catch (error) {
    console.error("[GET_ANALYTICS]", error)
    return NextResponse.json(
      { totalRevenue: 0, totalEnrollments: 0, totalCourses: 0, averageRating: "0", courses: [] },
      { status: 200 }
    )
  }
}