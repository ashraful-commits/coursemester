import Link from "next/link";
import NextImage from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Star, BookOpen, Tv, BarChart3, ChevronRight, PlayCircle } from "lucide-react";
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
      image?: string | null;
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
  variant?: "default" | "enrolled" | "compact";
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

  if (variant === "compact") {
    return (
      <Link href={`/courses/${course.id}`}>
        <Card className="overflow-hidden group flex items-center gap-4 hover:bg-white/[0.05] transition-all duration-300 border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-3">
          <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-2xl">
            {course.imageUrl ? (
              <NextImage
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
          <div className="flex-grow min-w-0 pr-4">
            <Badge className="mb-1 text-[8px] uppercase tracking-[0.2em] font-black bg-primary/10 text-primary border-none px-2 py-0.5 glass">
              {course.category.name}
            </Badge>
            <h3 className="font-black text-sm line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
              {course.title}
            </h3>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground mt-1 font-black uppercase tracking-widest opacity-60">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="text-foreground">{avgRating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{studentsCount}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="overflow-hidden group h-full flex flex-col transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-white/5 bg-white/[0.02] backdrop-blur-xl relative rounded-[2.5rem] hover:ring-2 hover:ring-primary/20">
      {/* Dynamic Glow Effect */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <CardHeader className="p-0 relative">
        <Link href={`/courses/${course.id}`}>
          <div className="relative h-56 w-full overflow-hidden">
            {course.imageUrl ? (
              <NextImage
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                priority
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-violet-500/10 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-primary/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            <div className="absolute top-5 left-5 flex gap-2">
              <Badge className="glass border-white/10 text-white font-black uppercase tracking-widest text-[9px] px-4 py-1.5 rounded-xl border-none shadow-xl">
                {course.category.name}
              </Badge>
            </div>

            <div className="absolute bottom-5 left-5 right-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass rounded-full overflow-hidden border-2 border-white/20 shadow-xl">
                  <NextImage src={course.instructor.image || 'https://i.pravatar.cc/100?u=instructor'} alt={course.instructor.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-white leading-tight drop-shadow-lg">{course.instructor.name}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary leading-tight">Master Architect</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-primary scale-90 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                <PlayCircle className="w-10 h-10 fill-current ml-1" />
              </div>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-5 sm:p-8 flex-grow relative z-10 flex flex-col">
        <Link href={`/courses/${course.id}`}>
          <h3 className="font-black text-xl sm:text-2xl line-clamp-2 mb-3 sm:mb-4 group-hover:text-primary transition-colors leading-[1.15] tracking-tight">
            {course.title}
          </h3>
        </Link>

        <p className="text-xs sm:text-[13px] text-muted-foreground line-clamp-2 mb-6 sm:mb-8 font-medium leading-relaxed opacity-60">
          {course.description}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-[0.15em] opacity-80">
          <div className="flex items-center gap-2 sm:gap-2.5 bg-white/5 border border-white/5 p-2 sm:p-3 rounded-xl sm:rounded-2xl justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
            <Tv className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-primary" />
            <span className="truncate">{totalLessons} Nodes</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 bg-white/5 border border-white/5 p-2 sm:p-3 rounded-xl sm:rounded-2xl justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
            <Clock className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-primary" />
            <span className="truncate">{Math.floor(totalDuration / 60)}h Sync</span>
          </div>
        </div>

        {variant === "enrolled" && course.progress !== undefined && (
          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/5">
            <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="text-muted-foreground leading-none">Synchronization</span>
              <span className="text-primary leading-none">{Math.round(course.progress)}%</span>
            </div>
            <div className="h-1.5 sm:h-2 w-full bg-white/5 rounded-full overflow-hidden ring-1 ring-white/5">
              <div
                className={`h-full transition-all duration-1000 ease-out ${course.progress === 100 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)]'
                  }`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 sm:p-8 pt-0 mt-auto relative z-10">
        <div className="flex items-center justify-between w-full pt-5 sm:pt-8 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-1 opacity-60 leading-none">Access Level</span>
            <span className="text-xl sm:text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-none tracking-tighter">
              {course.price > 0 ? formatPrice(course.price) : "Industrial"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 sm:gap-1.5 text-yellow-500 bg-yellow-500/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-lg border border-yellow-500/10">
              <Star className="h-3 sm:h-3.5 w-3 sm:w-3.5 fill-current" />
              <span className="font-black text-[10px] sm:text-xs leading-none">{avgRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}