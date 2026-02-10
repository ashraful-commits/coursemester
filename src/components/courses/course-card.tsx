import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    price: number;
    isPublished: boolean;
    category: {
      name: string;
    };
    instructor: {
      name: string;
    };
    chapters: {
      id: string;
      lessons: {
        id: string;
        duration?: number;
      }[];
    }[];
    enrollments?: any[];
    reviews?: any[];
    progress?: number;
  };
  variant?: "default" | "enrolled";
}

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const totalLessons = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );

  const totalDuration = course.chapters.reduce(
    (acc, chapter) =>
      acc +
      chapter.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0),
    0
  );

  const avgRating =
    course.reviews && course.reviews.length > 0
      ? course.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) /
        course.reviews.length
      : 0;

  const studentsCount = course.enrollments?.length || 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {course.title.charAt(0)}
                </div>
                <p className="text-sm text-muted-foreground">Course Image</p>
              </div>
            </div>
          )}
          <Badge className="absolute top-2 left-2">
            {course.category.name}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{avgRating.toFixed(1)}</span>
              {course.reviews && (
                <span className="text-muted-foreground">
                  ({course.reviews.length})
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{studentsCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{Math.floor(totalDuration / 60)} min</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{totalLessons} lessons</span>
            </div>
          </div>

          {variant === "enrolled" && course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(course.progress)}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-bold">
            {course.price > 0 ? formatPrice(course.price) : "Free"}
          </div>
          {variant === "enrolled" ? (
            <Link href={`/courses/${course.id}/lessons`}>
              <Button>Continue</Button>
            </Link>
          ) : (
            <Link href={`/courses/${course.id}`}>
              <Button>View Course</Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}