import { db } from "@/lib/db";

export async function getCourses() {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: true,
        instructor: {
          select: {
            name: true,
            image: true,
          },
        },
        chapters: {
          where: {
            isPublished: true,
          },
          include: {
            lessons: {
              where: {
                isPublished: true,
              },
              select: {
                id: true,
                duration: true,
              },
            },
          },
        },
        enrollments: {
          select: {
            id: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses.map(course => ({
      ...course,
      totalLessons: course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0),
      totalDuration: course.chapters.reduce((acc, chapter) => 
        acc + chapter.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0), 0),
      studentsCount: course.enrollments.length,
      avgRating: course.reviews.length > 0 
        ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length 
        : 0,
    }));
  } catch (error) {
    console.error("[GET_COURSES]", error);
    return [];
  }
}