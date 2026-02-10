import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
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

    const { isCompleted } = await req.json()

    // Verify enrollment
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: resolvedParams.courseId,
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      )
    }

    // Find the first lesson in this chapter (simplified for demo)
    const lesson = await db.lesson.findFirst({
      where: {
        chapterId: resolvedParams.chapterId,
        isPublished: true,
      },
      orderBy: { position: "asc" },
    })

    if (!lesson) {
      return NextResponse.json(
        { error: "No lessons found in this chapter" },
        { status: 404 }
      )
    }

    // Update or create lesson progress
    const lessonProgress = await db.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lesson.id,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId: session.user.id,
        lessonId: lesson.id,
        isCompleted,
      },
    })

    // Calculate overall course progress
    const publishedLessons = await db.lesson.count({
      where: {
        chapter: {
          courseId: resolvedParams.courseId,
          isPublished: true,
        },
        isPublished: true,
      },
    })

    const completedLessons = await db.lessonProgress.count({
      where: {
        userId: session.user.id,
        lesson: {
          chapter: {
            courseId: resolvedParams.courseId,
          },
        },
        isCompleted: true,
      },
    })

    const progressPercentage = (completedLessons / publishedLessons) * 100

    // Update enrollment progress
    await db.enrollment.update({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: resolvedParams.courseId,
        },
      },
      data: {
        progress: progressPercentage,
      },
    })

    return NextResponse.json({
      lessonProgress,
      courseProgress: progressPercentage,
    })
  } catch (error) {
    console.error("PUT progress error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}