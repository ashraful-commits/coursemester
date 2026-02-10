import { db } from "@/lib/db";

export async function getProgress(userId: string, courseId: string): Promise<number> {
  try {
    const enrolledCourse = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        course: {
          include: {
            chapters: {
              include: {
                lessons: true,
              },
            },
          },
        },
      },
    });

    if (!enrolledCourse) {
      return 0;
    }

    const courseLessons = enrolledCourse.course.chapters.flatMap(
      (chapter) => chapter.lessons
    );

    const completedLessons = await db.lessonProgress.count({
      where: {
        userId,
        lesson: {
          chapter: {
            courseId,
          },
        },
        isCompleted: true,
      },
    });

    return courseLessons.length > 0 ? (completedLessons / courseLessons.length) * 100 : 0;
  } catch (error) {
    console.error("[GET_PROGRESS]", error);
    return 0;
  }
}