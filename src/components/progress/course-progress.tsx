import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-primary",
  success: "text-green-600",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export function CourseProgress({
  value,
  variant = "default",
  size = "default",
}: CourseProgressProps) {
  return (
    <div>
      <Progress value={value} className="h-2" />
      <p className={cn("font-medium mt-2", colorByVariant[variant], sizeByVariant[size])}>
        {Math.round(value)}% Complete
      </p>
    </div>
  );
}