import { Metadata } from 'next';
import CourseHero from '@/components/course/CourseHero';
import CourseOverview from '@/components/course/CourseOverview';
import CourseModules from '@/components/course/CourseModules';
import CoursePillars from '@/components/course/CoursePillars';
import CourseWaitlist from '@/components/course/CourseWaitlist';

export const metadata: Metadata = {
  title: 'Online Course — Born to Create Project',
  description: 'A year-long Christian filmmaking curriculum pairing craft with calling. Course will be required to unlock retreats in the future.',
  openGraph: {
    title: 'Online Course — Born to Create Project',
    description: 'A year-long Christian filmmaking curriculum pairing craft with calling.',
    images: [
      {
        url: '/images/og-course.jpg',
        width: 1200,
        height: 630,
        alt: 'Born to Create Project Online Course',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Course — Born to Create Project',
    description: 'A year-long Christian filmmaking curriculum pairing craft with calling.',
    images: ['/images/og-course.jpg'],
  },
};

export default function CoursePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <CourseHero />

      {/* Overview Section */}
      <CourseOverview />

      {/* Modules Section */}
      <CourseModules />

      {/* Brand Pillars Section */}
      <CoursePillars />

      {/* Waitlist Section */}
      <CourseWaitlist />
    </main>
  );
}