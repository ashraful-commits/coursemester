"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuizQuestionProps {
  question: {
    id: string
    question: string
    options: string[]
    type: string
    explanation?: string
    points: number
  }
  onAnswer: (questionId: string, answer: string) => void
  selectedAnswer?: string
  showResult?: boolean
  correctAnswer?: string
}

export function QuizQuestion({
  question,
  onAnswer,
  selectedAnswer,
  showResult = false,
  correctAnswer,
}: QuizQuestionProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg font-semibold">{question.question}</span>
          <span className="text-sm text-gray-500">({question.points} points)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer}
          onValueChange={(value) => onAnswer(question.id, value)}
          disabled={showResult}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={`${question.id}-${index}`} />
              <Label 
                htmlFor={`${question.id}-${index}`} 
                className={`cursor-pointer flex-1 ${
                  showResult && option === correctAnswer
                    ? "text-green-600 font-semibold"
                    : showResult && selectedAnswer === option && option !== correctAnswer
                    ? "text-red-600"
                    : ""
                }`}
              >
                {option}
                {showResult && option === correctAnswer && " ✓"}
                {showResult && selectedAnswer === option && option !== correctAnswer && " ✗"}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {showResult && question.explanation && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm"><strong>Explanation:</strong> {question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}