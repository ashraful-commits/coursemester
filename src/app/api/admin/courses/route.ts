import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const courses = await db.course.findMany({
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                instructor: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                _count: {
                    select: {
                        enrollments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(courses)
    } catch (error) {
        console.error("[ADMIN_COURSES_GET]", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const { courseId, isPublished } = await req.json()

        if (!courseId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const updatedCourse = await db.course.update({
            where: { id: courseId },
            data: { isPublished },
        })

        return NextResponse.json(updatedCourse)
    } catch (error) {
        console.error("[ADMIN_COURSE_PATCH]", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const { courseId } = await req.json()

        if (!courseId) {
            return NextResponse.json(
                { error: "Missing courseId" },
                { status: 400 }
            )
        }

        await db.course.delete({
            where: { id: courseId },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[ADMIN_COURSE_DELETE]", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
