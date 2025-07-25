"use client";

import { useGetQuizzesQuery, useDeleteQuizMutation } from '@/redux/features/api/quizSlice';
import Link from 'next/link';

const QuizPage = () => {
  const { data: quizzes, isLoading, error } = useGetQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();
  console.log(quizzes);
  const handleDeleteQuiz = async (id) => {
    // We can user third party package like swal
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(id).unwrap();
      } catch (error) {
        console.error('Failed to delete quiz:', error);
      }
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading quizzes...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading quizzes</div>;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quiz Management</h1>
          <p className="text-gray-600">Create, edit, and manage your quizzes</p>
        </div>
        <Link
          href="/dashboard/quiz/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          Create Quiz
        </Link>
      </div>

      {/* Quiz List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Quizzes</h2>
        </div>
        <div className="p-6">
          {quizzes && quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 h-16">{quiz.title}</h3>
                                      <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/quiz/edit/${quiz.id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Quiz"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                      <button
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Quiz"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2  h-20">{quiz.description}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Questions: {quiz.questions?.length || 0}</p>
                    <p>Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/dashboard/quiz/edit/${quiz.id}`}
                      className="block w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
                    >
                      Quiz Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No quizzes created yet. Create your first quiz to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 