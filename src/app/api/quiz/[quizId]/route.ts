import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const resolvedParams = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const quiz = await db.quiz.findUnique({
      where: { id: resolvedParams.quizId },
      include: {
        questions: {
          orderBy: { position: "asc" },
        },
        lesson: {
          select: {
            id: true,
            title: true,
            chapter: {
              select: {
                id: true,
                courseId: true,
              },
            },
          },
        },
      },
    })

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      )
    }

    // Check if user is enrolled in the course
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: quiz.lesson.chapter.courseId,
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      )
    }

    // Return questions without correct answers for taking the quiz
    const questionsWithoutAnswers = quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      type: q.type,
      options: q.options,
      points: q.points,
      position: q.position,
    }))

    return NextResponse.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        passingScore: quiz.passingScore,
        lesson: quiz.lesson,
      },
      questions: questionsWithoutAnswers,
    })
  } catch (error) {
    console.error("GET quiz error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const resolvedParams = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { answers } = await req.json()

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Invalid answers" },
        { status: 400 }
      )
    }

    const quiz = await db.quiz.findUnique({
      where: { id: resolvedParams.quizId },
      include: {
        questions: {
          orderBy: { position: "asc" },
        },
        lesson: {
          select: {
            id: true,
            chapter: {
              select: {
                courseId: true,
              },
            },
          },
        },
      },
    })

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      )
    }

    // Check enrollment
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: quiz.lesson.chapter.courseId,
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      )
    }

    // Calculate score
    let totalPoints = 0
    let earnedPoints = 0
    const detailedResults: any[] = []

    for (const question of quiz.questions) {
      totalPoints += question.points
      const userAnswer = answers[question.id]
      
      if (userAnswer === question.correctAnswer) {
        earnedPoints += question.points
      }

      detailedResults.push({
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: userAnswer === question.correctAnswer,
        points: question.points,
        explanation: question.explanation,
      })
    }

    const scorePercentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0
    const isPassed = scorePercentage >= quiz.passingScore

    // Create quiz attempt
    const attempt = await db.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId: resolvedParams.quizId,
        score: scorePercentage,
        answers: answers,
        isPassed,
      },
    })

    return NextResponse.json({
      attempt: {
        id: attempt.id,
        score: scorePercentage,
        isPassed,
        totalPoints,
        earnedPoints,
      },
      results: detailedResults,
      passingScore: quiz.passingScore,
    })
  } catch (error) {
    console.error("POST quiz error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}