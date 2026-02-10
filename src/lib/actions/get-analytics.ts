import { db } from "@/lib/db";

interface Analytics {
  totalRevenue: number;
  totalEnrollments: number;
  totalCourses: number;
  totalLessons: number;
  averageRating: number;
  courses: Array<{
    id: string;
    title: string;
    enrollments: number;
    revenue: number;
    rating: number;
    reviewsCount: number;
  }>;
  recentEnrollments: Array<{
    id: string;
    createdAt: Date;
    user: {
      name: string;
      image?: string | null;
    };
    courseTitle: string;
  }>;
}

export async function getAnalytics(instructorId: string): Promise<Analytics> {
  try {
    // Get all courses for this instructor
    const courses = await db.course.findMany({
      where: {
        instructorId,
      },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
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
        },
        chapters: {
          include: {
            lessons: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate totals
    const totalRevenue = courses.reduce((sum, course) => 
      sum + (course.enrollments.length * course.price), 0
    );
    const totalEnrollments = courses.reduce((sum, course) => sum + course.enrollments.length, 0);
    const totalLessons = courses.reduce((sum, course) => 
      sum + course.chapters.reduce((chapterSum, chapter) => 
        chapterSum + chapter.lessons.length, 0), 0
    );

    // Calculate average rating
    const allReviews = courses.flatMap(course => course.reviews);
    const averageRating = allReviews.length > 0 
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length 
      : 0;

    // Format course data
    const formattedCourses = courses.map(course => {
      const courseRevenue = course.enrollments.length * course.price;
      const courseReviews = course.reviews;
      const courseRating = courseReviews.length > 0 
        ? courseReviews.reduce((sum, review) => sum + review.rating, 0) / courseReviews.length 
        : 0;

      return {
        id: course.id,
        title: course.title,
        enrollments: course.enrollments.length,
        revenue: courseRevenue,
        rating: courseRating,
        reviewsCount: courseReviews.length,
      };
    });

    // Get recent enrollments
    const recentEnrollments = courses
      .flatMap(course => 
        course.enrollments.map(enrollment => ({
          id: enrollment.id,
          createdAt: enrollment.createdAt,
          user: {
            name: enrollment.user.name || "Unknown User",
            image: enrollment.user.image,
          },
          courseTitle: course.title,
        }))
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    return {
      totalRevenue,
      totalEnrollments,
      totalCourses: courses.length,
      totalLessons,
      averageRating: parseFloat(averageRating.toFixed(1)),
      courses: formattedCourses,
      recentEnrollments,
    };
  } catch (error) {
    console.error("[GET_ANALYTICS]", error);
    return {
      totalRevenue: 0,
      totalEnrollments: 0,
      totalCourses: 0,
      totalLessons: 0,
      averageRating: 0.0,
      courses: [],
      recentEnrollments: [],
    };
  }
}