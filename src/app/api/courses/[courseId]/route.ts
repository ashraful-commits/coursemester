import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const resolvedParams = await params
    const course = await db.course.findUnique({
      where: { id: resolvedParams.courseId },
      include: {
        category: true,
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
        chapters: {
          where: { isPublished: true },
          orderBy: { position: "asc" },
          include: {
            lessons: {
              where: { isPublished: true },
              orderBy: { position: "asc" },
            },
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true,
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error("GET course error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const resolvedParams = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const course = await db.course.findUnique({
      where: { id: resolvedParams.courseId },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    if (course.instructorId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    const { title, description, price, level, isPublished } = await req.json()

    const updatedCourse = await db.course.update({
      where: { id: resolvedParams.courseId },
      data: {
        ...(title && { 
          title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(level && { level }),
        ...(isPublished !== undefined && { isPublished }),
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

    return NextResponse.json(updatedCourse)
  } catch (error) {
    console.error("PUT course error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const resolvedParams = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const course = await db.course.findUnique({
      where: { id: resolvedParams.courseId },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    if (course.instructorId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    await db.course.delete({
      where: { id: resolvedParams.courseId },
    })

    return NextResponse.json({ message: "Course deleted successfully" })
  } catch (error) {
    console.error("DELETE course error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}