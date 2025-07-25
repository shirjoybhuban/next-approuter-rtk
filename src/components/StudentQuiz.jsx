'use client';

import { useGetQuizzesQuery } from '@/redux/features/api/quizSlice';
import { useRouter } from 'next/navigation';

const StudentQuiz = () => {
  const { data: quizzes, isLoading, error } = useGetQuizzesQuery();
  const router = useRouter();

  if (isLoading) return <div className="text-center py-8">Loading quizzes...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading quizzes</div>;

  const handleTakeQuiz = (quizId) => {
    router.push(`/take-quiz/${quizId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Available Quizzes</h2>
      </div>

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes?.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="text-sm text-gray-500">
              <p>Questions: {quiz.questions?.length || 0}</p>
              <p>Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => handleTakeQuiz(quiz.id)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Take Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentQuiz; 