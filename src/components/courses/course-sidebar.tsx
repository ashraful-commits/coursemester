import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Lock, PlayCircle } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  position: number;
  isFree: boolean;
  lessons: {
    id: string;
    title: string;
    position: number;
    isFree: boolean;
    isPublished: boolean;
    duration?: number;
    userProgress?: {
      isCompleted: boolean;
    } | null;
  }[];
}

interface CourseSidebarProps {
  course: {
    id: string;
    title: string;
  };
  chapters: Chapter[];
  progressPercentage: number;
  isEnrolled: boolean;
  currentLessonId?: string;
}

export function CourseSidebar({
  course,
  chapters,
  progressPercentage,
  isEnrolled,
  currentLessonId,
}: CourseSidebarProps) {
  return (
    <div className="h-full border-r bg-background">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">{course.title}</h2>
        
        {isEnrolled && (
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        <div className="space-y-4">
          {chapters.map((chapter, index) => (
            <Card key={chapter.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  Chapter {index + 1}: {chapter.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {chapter.lessons.map((lesson) => {
                    const isCompleted = lesson.userProgress?.isCompleted || false;
                    const isCurrent = lesson.id === currentLessonId;
                    const isAccessible = isEnrolled || lesson.isFree;

                    return (
                      <Link
                        key={lesson.id}
                        href={
                          isAccessible
                            ? `/courses/${course.id}/lessons/${lesson.id}`
                            : "#"
                        }
                        className={`
                          flex items-center gap-3 p-2 rounded-md text-sm transition-colors
                          ${isCurrent 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-muted"
                          }
                          ${!isAccessible ? "opacity-60 cursor-not-allowed" : ""}
                        `}
                      >
                        <div className="flex-shrink-0">
                          {isAccessible ? (
                            isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <PlayCircle className="h-4 w-4" />
                            )
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <span className="block truncate">
                            {lesson.position}. {lesson.title}
                          </span>
                        </div>

                        {lesson.isFree && !isEnrolled && (
                          <Badge variant="secondary" className="text-xs">
                            Free
                          </Badge>
                        )}

                        {lesson.duration && (
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {Math.floor(lesson.duration / 60)}m
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}