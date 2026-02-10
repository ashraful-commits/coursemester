"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, PlayCircle } from "lucide-react";

interface CourseEnrollmentProps {
  courseId: string;
  price: number;
  isEnrolled: boolean;
  imageUrl: string | null;
}

export function CourseEnrollment({
  courseId,
  price,
  isEnrolled,
  imageUrl,
}: CourseEnrollmentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    setIsLoading(true);
    try {
      await axios.post(`/api/courses/${courseId}/enroll`);
      toast.success("Enrolled successfully!");
      router.refresh();
      router.push(`/courses/${courseId}/lessons`);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to enroll");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartCourse = () => {
    router.push(`/courses/${courseId}/lessons`);
  };

  return (
    <Card className="sticky top-4">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt="Course"
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="text-center mb-6">
          {price > 0 ? (
            <div>
              <div className="text-4xl font-bold">{formatPrice(price)}</div>
              <p className="text-sm text-muted-foreground mt-1">One-time payment</p>
            </div>
          ) : (
            <div className="text-4xl font-bold text-green-600">FREE</div>
          )}
        </div>

        {isEnrolled ? (
          <Button
            onClick={handleStartCourse}
            className="w-full"
            size="lg"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Continue Learning
          </Button>
        ) : (
          <Button
            onClick={handleEnroll}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {price > 0 ? "Enroll Now" : "Enroll for Free"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}