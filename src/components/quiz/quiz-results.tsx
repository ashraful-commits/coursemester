"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  passed: boolean
  passingScore: number
  onRetry?: () => void
  onNext?: () => void
}

export function QuizResults({ 
  score, 
  totalQuestions, 
  passed, 
  passingScore, 
  onRetry, 
  onNext 
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className={`text-2xl ${passed ? "text-green-600" : "text-red-600"}`}>
          {passed ? "🎉 Congratulations!" : "❌ Quiz Failed"}
        </CardTitle>
        <CardDescription>
          {passed 
            ? "You've successfully passed the quiz!"
            : "You didn't meet the passing score. Please try again."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold">
          {score}/{totalQuestions} ({percentage}%)
        </div>
        <div className="text-gray-600">
          Passing score: {passingScore}%
        </div>
        
        <div className="flex justify-center gap-4">
          {!passed && onRetry && (
            <Button onClick={onRetry} variant="outline">
              Retry Quiz
            </Button>
          )}
          {passed && onNext && (
            <Button onClick={onNext}>
              Continue to Next Lesson
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}