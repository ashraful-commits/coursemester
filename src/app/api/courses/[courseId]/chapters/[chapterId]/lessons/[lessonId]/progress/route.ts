import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string; lessonId: string }> }
) {
  try {
    const resolvedParams = await params;
    const { isCompleted } = await req.json();
    
    // You need to get user session here
    // For now, using a mock user ID - replace with actual auth logic
    const userId = "mock-user-id"; // Replace with real auth

    const progress = await db.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId: resolvedParams.lessonId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        lessonId: resolvedParams.lessonId,
        isCompleted,
      },
    });

    // Update enrollment progress
    const chapterLessons = await db.lesson.findMany({
      where: {
        chapterId: resolvedParams.chapterId,
      },
    });

    const totalLessons = chapterLessons.length;
    const completedLessons = await db.lessonProgress.count({
      where: {
        userId,
        lesson: {
          chapterId: resolvedParams.chapterId,
        },
        isCompleted: true,
      },
    });

    const chapterProgress = (completedLessons / totalLessons) * 100;

    // Update overall course progress (simplified)
    await db.enrollment.updateMany({
      where: {
        userId,
        courseId: resolvedParams.courseId,
      },
      data: {
        progress: chapterProgress,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("[LESSON_PROGRESS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}