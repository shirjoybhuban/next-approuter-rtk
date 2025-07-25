'use client';

import { useGetQuizzesQuery, useCreateQuizMutation, useDeleteQuizMutation } from '@/redux/features/api/quizSlice';
import { useState } from 'react';

const QuizList = () => {
  const { data: quizzes, isLoading, error } = useGetQuizzesQuery();
  const [createQuiz] = useCreateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]
  });

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      await createQuiz(formData).unwrap();
      setShowCreateForm(false);
      setFormData({
        title: '',
        description: '',
        questions: [
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0
          }
        ]
      });
    } catch (error) {
      console.error('Failed to create quiz:', error);
    }
  };

  const handleDeleteQuiz = async (id) => {
    try {
      await deleteQuiz(id).unwrap();
    } catch (error) {
      console.error('Failed to delete quiz:', error);
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading quizzes...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading quizzes</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Quizzes</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showCreateForm ? 'Cancel' : 'Create Quiz'}
        </button>
      </div>

      {/* Create Quiz Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Create New Quiz</h3>
          <form onSubmit={handleCreateQuiz} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Question</label>
              <input
                type="text"
                value={formData.questions[0].question}
                onChange={(e) => setFormData({
                  ...formData, 
                  questions: [{...formData.questions[0], question: e.target.value}]
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {formData.questions[0].options.map((option, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    Option {index + 1}
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...formData.questions[0].options];
                      newOptions[index] = e.target.value;
                      setFormData({
                        ...formData,
                        questions: [{...formData.questions[0], options: newOptions}]
                      });
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
              <select
                value={formData.questions[0].correctAnswer}
                onChange={(e) => setFormData({
                  ...formData,
                  questions: [{...formData.questions[0], correctAnswer: parseInt(e.target.value)}]
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {formData.questions[0].options.map((_, index) => (
                  <option key={index} value={index}>Option {index + 1}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Quiz
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes?.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
              <button
                onClick={() => handleDeleteQuiz(quiz.id)}
                className="text-red-600 hover:text-red-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="text-sm text-gray-500">
              <p>Questions: {quiz.questions?.length || 0}</p>
              <p>Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-4">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Take Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList; 