


import StudentQuiz from '@/components/StudentQuiz';

export default function Home() {

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Hello Students</h1>
      <StudentQuiz />
    </main>
  );
}
