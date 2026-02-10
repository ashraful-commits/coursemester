import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const resolvedParams = await params
    const { title, description, position, isFree } = await req.json();

    const chapter = await db.chapter.create({
      data: {
        title,
        description,
        position,
        isFree,
        courseId: resolvedParams.courseId,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[CHAPTERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const resolvedParams = await params
    const chapters = await db.chapter.findMany({
      where: {
        courseId: resolvedParams.courseId,
      },
      include: {
        lessons: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    return NextResponse.json(chapters);
  } catch (error) {
    console.error("[CHAPTERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}