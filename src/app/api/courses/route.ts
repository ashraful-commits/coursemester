import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const courses = await db.course.findMany({
      where: { isPublished: true },
      include: {
        category: true,
        instructor: {
          select: {
            name: true,
            image: true,
          },
        },
        chapters: {
          where: { isPublished: true },
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error("GET courses error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { title, description, categoryId, price, level } = await req.json()

    if (!title || !description || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

    const course = await db.course.create({
      data: {
        title,
        slug,
        description,
        categoryId,
        price: price || 0,
        level: level || "BEGINNER",
        instructorId: session.user.id,
      },
      include: {
        category: true,
        instructor: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error("POST courses error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}