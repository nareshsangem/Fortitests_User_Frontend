import React from "react";
import Navbar from '../Components/Navbar';
import LandingPageFooter from '../Components/LandingPageFooter';
const blogData = [
  {
    id: 1,
    title: "The Power of Mock Tests: Practice with Purpose",
    date: "Jan 5, 2025",
    subtitle: "Simulate real exams and boost confidence.",
    image: "../src/assets/blog1.jpeg",
    content: `When you prepare for competitive exams like SSC, TSPSC, or Banking, mock tests aren't optional—they're essential. A mock test is more than just a score; it reflects your readiness, adaptability, and time strategy.

Our platform’s mock tests mirror the real exam format. The timer, interface, and even negative marking rules are all aligned with official standards. Most importantly, detailed post-test analytics help you understand what you're doing right—and what needs work.

Students who consistently attempt and review 10–15 mocks see a jump of 25–40% in accuracy and time efficiency. Practice may not make you perfect, but it will certainly make you confident.`,
    points: [
      "Simulates real exam pressure",
      "Tracks weak and strong areas",
      "Improves time-bound solving",
      "Reduces anxiety with familiarity"
    ]
  },
  {
    id: 2,
    title: "My SSC Journey: From Nervous Beginner to Confident Performer",
    date: "Feb 12, 2025",
    subtitle: "Structured practice leads to massive improvement.",
    image: "../src/assets/blog2.jpeg",
    content: `I still remember scoring 112 in my first SSC Tier-1 mock and feeling disheartened. But then I came across this platform. With structured practice sets, targeted revisions, and weekly challenges, I was able to climb to a Tier-1 score of 178.

The journey wasn’t overnight. I built a habit of giving one mock every 2 days, reviewing all errors, and attempting mini-topic tests in between. What made the biggest difference? The performance tracker. It showed me where I improved, where I didn’t, and kept me honest about my prep.`,
    points: [
      "Practice every 2 days for momentum",
      "Focus on small daily improvements",
      "Trust the data; don’t rely on feeling",
      "Track progress consistently"
    ]
  },
  {
    id: 3,
    title: "TSPSC 2025: How to Tackle the Latest Pattern with Confidence",
    date: "Mar 3, 2025",
    subtitle: "Adapt to the evolving TSPSC exam structure.",
    image: "../src/assets/blog3.jpeg",
    content: `The TSPSC Group 1 exam has seen several changes in recent years—new paper structure, updated topics, and more dynamic questions. If you're preparing for 2025, staying updated is half the battle.

Our TSPSC mock series has been redesigned to match the latest format. From subject-specific questions to real-time scoring and detailed solutions, we’ve tailored the experience for serious aspirants.`,
    points: [
      "Stay updated with syllabus changes",
      "Prioritize General Studies & Mental Ability",
      "Focus on previous year trends",
      "Use mocks for adaptive learning"
    ]
  },
  {
    id: 4,
    title: "How This Platform Helps You Learn from Mistakes",
    date: "Mar 22, 2025",
    subtitle: "Turn every mistake into a learning moment.",
    image: "../src/assets/blog4.jpeg",
    content: `Most test-takers fail not because they didn’t study, but because they didn’t learn from past mistakes. That’s why our analytics dashboard is built to highlight your errors—subject-wise, topic-wise, and even by question type.

After every mock test, you receive insights like:
Accuracy %
Time taken per section
Topic you consistently get wrong
Suggested revision tests

These features turn mistakes into stepping stones for improvement.`,
    points: [
      "Analyze every test you take",
      "Focus on repeat mistakes",
      "Use retests for high-impact learning",
      "Turn weak areas into strengths"
    ]
  },
  {
    id: 5,
    title: "Building Confidence Before Exam Day: A Real User’s Story",
    date: "May 10, 2025",
    subtitle: "Mock test rituals that eliminate fear.",
    image: "../src/assets/blog5.jpeg",
    content: `I used to freeze before exams. I knew the concepts, but the pressure broke me. That changed when I committed to daily practice using this platform.

Mock tests became second nature. I trained under strict timing, took weekend full mocks, and reviewed every error.

When the real exam came, I wasn’t nervous—I had already “been there” 30 times.`,
    points: [
      "Confidence comes from consistency",
      "Replicate exam-day pressure in practice",
      "Use full-length mocks regularly",
      "Prepare mentally as much as academically"
    ]
  },
  {
    id: 6,
    title: "My SSC CGL 2025 Journey: How I Went from 200 to 300+ in Mains",
    date: "Mar 10, 2025",
    subtitle: "Focused revision and analytics made the difference.",
    image: "../src/assets/blog6.jpeg",
    content: `I started my SSC CGL preparation in early 2024 with just 200 marks in a full-length mock. But within 10 months, frequent mock practice on this platform skyrocketed my score above 300. The turning point? Consistent analysis of my weak topics and dedicated revision.

I used the analytics dashboard to track section-wise performance and prioritized GK and reasoning—my weakest areas. With regular tests, video solutions, and topic-wise drills, I improved not only speed but accuracy. The user‑friendly interface and timed quizzes kept me motivated during the last-leg prep.`,
    points: [
      "Test formats match the real SSC pattern exactly",
      "Performance dashboard highlights correct vs wrong by topic",
      "Repeated mock attempts improve endurance",
      "Detailed video explanations help learn from mistakes",
      "Community challenges and leaderboards boost accountability"
    ]
  },
  {
    id: 7,
    title: "5 Ways Mock Test Analytics Supercharge Your Prep",
    date: "Apr 18, 2025",
    subtitle: "Data-driven prep is smarter prep.",
    image: "../src/assets/blog7.jpeg",
    content: `Mock tests are more than trial runs—they’re feedback tools. This platform’s detailed analytics changed how I learned. After each test, I could see subject-wise accuracy, time spent per question, and comparison with peer percentiles.

Charts tracked my week-over-week improvement. I set up reminders to revisit weak topics. With color-coded heatmaps I could quickly see where I consistently lagged—making revision laser-focused. The integrated analytics dashboard was a game-changer.`,
    points: [
      "Subject-wise accuracy & time analysis",
      "Peer-comparison leaderboard and percentiles",
      "Weekly heatmaps showing weak zones",
      "Automated reminders for low-score topics",
      "Revision streak tracking"
    ]
  },
  {
    id: 8,
    title: "10 Common Mistakes Students Make in Competitive Exams",
    date: "May 28, 2025",
    subtitle: "Avoid these pitfalls to secure better scores.",
    image: "../src/assets/blog8.jpeg",
    content: `Even the most prepared candidates make critical mistakes on exam day. From ignoring negative marking to poor time allocation and panicking on unfamiliar questions, small errors can drastically impact results.

In this blog, we’ll break down the most frequent mistakes seen across SSC, TSPSC, and Banking aspirants—and how you can avoid them with smart prep techniques and regular mocks from our platform.`,
    points: [
      "Misreading questions",
      "Ignoring time tracking",
      "Not practicing OMR/multiple-choice logic",
      "Not reviewing mock results"
    ]
  },
  {
    id: 9,
    title: "How to Master Time Management in Exams",
    date: "Jun 15, 2025",
    subtitle: "Effective time strategies for every aspirant.",
    image: "../src/assets/blog9.jpeg",
    content: `Running out of time in an exam is a common nightmare. But with proper planning and timed mocks, you can finish every question with minutes to spare.

We explore techniques like the 3-pass approach, subject prioritization, and question selection strategies to help you get the most out of every second in your exam.`,
    points: [
      "Practice with a timer",
      "Skip hard questions first pass",
      "Use mock analysis to pace yourself",
      "Build endurance with full-length tests"
    ]
  }
];

const BlogsPage = () => {
   return (
    <div><Navbar />
    <div className="min-h-screen bg-blue-100 px-4 pt-24 py-8">
        
      <h1 className="text-4xl font-bold text-left mb-2  text-gray-800">Latest Blogs</h1>
      <hr className="border-2 mb-16 border-gray-600"  />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog, index) => {
          const isHiddenMd = index === 8;
          return (
            <div
              key={index}
              className={`bg-blue-50 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 ${
                isHiddenMd ? 'hidden md:hidden lg:block' : ''
              }`}
            >
              <div className="overflow-hidden h-90">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <h3 className="text-md font-medium text-gray-700 mb-2">{blog.subtitle}</h3>
                <p className="text-gray-700 text-sm mb-3 whitespace-pre-line">{blog.content}</p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                    {Array.isArray(blog.points) &&
                        blog.points.map((point, i) => (
                        <li key={i}>{point}</li>
                        ))}
                    </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <LandingPageFooter/>
    </div>
  );
};

export default BlogsPage;
