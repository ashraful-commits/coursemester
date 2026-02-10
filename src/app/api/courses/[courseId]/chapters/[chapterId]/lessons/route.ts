import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const resolvedParams = await params;
    const { title, description, videoUrl, duration, position, isFree, content } = await req.json();

    const lesson = await db.lesson.create({
      data: {
        title,
        description,
        videoUrl,
        duration,
        position,
        isFree,
        content,
        chapterId: resolvedParams.chapterId,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("[LESSONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const resolvedParams = await params;
    const lessons = await db.lesson.findMany({
      where: {
        chapterId: resolvedParams.chapterId,
      },
      orderBy: {
        position: "asc",
      },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    console.error("[LESSONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}