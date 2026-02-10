import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST() {
  try {
    // Create test users
    const testUsers = [
      {
        name: "Student User",
        email: "student@example.com",
        password: "password123",
        role: "STUDENT"
      },
      {
        name: "Instructor User", 
        email: "instructor@example.com",
        password: "password123",
        role: "INSTRUCTOR"
      },
      {
        name: "Admin User",
        email: "admin@example.com", 
        password: "password123",
        role: "ADMIN"
      }
    ]

    const results = []

    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await db.user.findUnique({
          where: { email: userData.email },
        })

        if (existingUser) {
          results.push({
            email: userData.email,
            status: "already_exists",
            role: userData.role
          })
          continue
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        // Create user
        const user = await db.user.create({
          data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
role: userData.role as any,
          },
        })

        results.push({
          email: userData.email,
          status: "created",
          role: userData.role,
          userId: user.id
        })
      } catch (error) {
        results.push({
          email: userData.email,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error"
        })
      }
    }

    return NextResponse.json({
      message: "Test users created successfully",
      results
    })
  } catch (error) {
    console.error("Seed users error:", error)
    return NextResponse.json(
      { error: "Failed to create test users" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}