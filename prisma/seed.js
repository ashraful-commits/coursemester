const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Web Development' },
      update: {},
      create: { name: 'Web Development', description: 'Learn modern web development' },
    }),
    prisma.category.upsert({
      where: { name: 'Data Science' },
      update: {},
      create: { name: 'Data Science', description: 'Master data analysis and machine learning' },
    }),
    prisma.category.upsert({
      where: { name: 'Mobile Development' },
      update: {},
      create: { name: 'Mobile Development', description: 'Build native and cross-platform mobile apps' },
    }),
    prisma.category.upsert({
      where: { name: 'DevOps' },
      update: {},
      create: { name: 'DevOps', description: 'Learn deployment, CI/CD, and infrastructure' },
    }),
  ]);

  // Create demo instructor
  const hashedPassword = await bcrypt.hash('instructor123', 12);
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@codemaster.com' },
    update: {},
    create: {
      email: 'instructor@codemaster.com',
      name: 'Sarah Johnson',
      password: hashedPassword,
      role: 'INSTRUCTOR',
      image: '/instructors/sarah.jpg',
      bio: 'Full-stack developer with 10+ years of experience in web and mobile development. Passionate about teaching and helping students achieve their goals.',
    },
  });

  // Create demo student
  const studentPassword = await bcrypt.hash('student123', 12);
  const student = await prisma.user.upsert({
    where: { email: 'student@codemaster.com' },
    update: {},
    create: {
      email: 'student@codemaster.com',
      name: 'Alex Chen',
      password: studentPassword,
      role: 'STUDENT',
      image: '/instructors/alex.jpg',
      bio: 'Aspiring developer learning modern web technologies.',
    },
  });

  // Create demo courses
  const courses = [
    {
      title: 'Complete React Development Bootcamp',
      description: 'Master React from scratch and build real-world applications. This comprehensive course covers React fundamentals, hooks, state management, routing, and deployment.',
      price: 89.99,
      level: 'BEGINNER',
      categoryId: categories[0].id,
      instructorId: instructor.id,
      imageUrl: '/covers/react-bootcamp.svg',
      isPublished: true,
    },
    {
      title: 'Python for Data Science and Machine Learning',
      description: 'Learn Python programming and apply it to data science, machine learning, and artificial intelligence. Includes NumPy, Pandas, Matplotlib, and Scikit-learn.',
      price: 129.99,
      level: 'INTERMEDIATE',
      categoryId: categories[1].id,
      instructorId: instructor.id,
      imageUrl: '/covers/python-data-science.svg',
      isPublished: true,
    },
    {
      title: 'Flutter Mobile App Development',
      description: 'Build beautiful, native-quality iOS and Android apps using Flutter. Learn Dart programming, widgets, state management, and app deployment.',
      price: 99.99,
      level: 'INTERMEDIATE',
      categoryId: categories[2].id,
      instructorId: instructor.id,
      imageUrl: '/covers/flutter-mobile.svg',
      isPublished: true,
    },
    {
      title: 'Docker and Kubernetes Masterclass',
      description: 'Master containerization and orchestration with Docker and Kubernetes. Learn to build, deploy, and scale modern applications.',
      price: 119.99,
      level: 'ADVANCED',
      categoryId: categories[3].id,
      instructorId: instructor.id,
      imageUrl: '/covers/docker-kubernetes.svg',
      isPublished: true,
    },
  ];

  const createdCourses = await Promise.all(
    courses.map(async (course) => {
      return prisma.course.create({
        data: course,
      });
    })
  );

  // Create chapters and lessons for React course
  const reactCourse = createdCourses[0];
  const reactChapters = [
    {
      title: 'Getting Started with React',
      description: 'Introduction to React and setup',
      position: 1,
      courseId: reactCourse.id,
      isPublished: true,
      isFree: true,
    },
    {
      title: 'React Fundamentals',
      description: 'Components, props, and state',
      position: 2,
      courseId: reactCourse.id,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'React Hooks Deep Dive',
      description: 'useState, useEffect, and custom hooks',
      position: 3,
      courseId: reactCourse.id,
      isPublished: true,
      isFree: false,
    },
  ];

  const createdReactChapters = await Promise.all(
    reactChapters.map(chapter => prisma.chapter.create({ data: chapter }))
  );

  // Create lessons for first chapter
  const lessons = [
    {
      title: 'Course Introduction and Setup',
      description: 'Welcome to the course! Let\'s set up your development environment.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: 15, // 15 minutes
      position: 1,
      chapterId: createdReactChapters[0].id,
      isPublished: true,
      isFree: true,
      content: `
# Welcome to React Development!

## What You'll Learn

In this course, we'll cover:
- React fundamentals and concepts
- Building modern web applications
- Best practices and patterns
- Real-world projects

## Development Setup

1. Install Node.js (v16 or higher)
2. Install VS Code and recommended extensions
3. Set up your first React project with Vite

Let's get started on this exciting journey!
      `,
    },
    {
      title: 'Understanding React Components',
      description: 'Learn the building blocks of React applications.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      duration: 20,
      position: 2,
      chapterId: createdReactChapters[0].id,
      isPublished: true,
      isFree: true,
      content: `
# React Components

## What are Components?

Components are the building blocks of React applications. They are reusable pieces of UI that can be composed together.

## Types of Components

1. **Functional Components**: Modern approach using functions
2. **Class Components**: Older approach using ES6 classes

## Example

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

Components make your code modular and maintainable.
      `,
    },
  ];

  await Promise.all(
    lessons.map(lesson => prisma.lesson.create({ data: lesson }))
  );

  // Create some reviews
  await Promise.all([
    prisma.review.create({
      data: {
        courseId: reactCourse.id,
        userId: student.id,
        rating: 5,
        comment: 'Excellent course! Very well structured and easy to follow.',
      },
    }),
    prisma.review.create({
      data: {
        courseId: reactCourse.id,
        userId: instructor.id,
        rating: 4,
        comment: 'Great content for beginners. Looking forward to more advanced topics.',
      },
    }),
  ]);

  // Create enrollment
  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: reactCourse.id,
      enrolledAt: new Date(),
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Demo accounts:');
  console.log('Instructor: instructor@codemaster.com / instructor123');
  console.log('Student: student@codemaster.com / student123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });