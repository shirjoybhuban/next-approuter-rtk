"use client";

import { useState, useEffect, use } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useGetQuizByIdQuery, useUpdateQuizMutation } from '@/redux/features/api/quizSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const EditQuizPage = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  const [updateQuiz, { isLoading: isUpdating }] = useUpdateQuizMutation();
  const { data: quiz, isLoading, error } = useGetQuizByIdQuery(id);
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      questions: [
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  // Reset form when quiz data is loaded
  useEffect(() => {
    if (quiz) {
      reset({
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions || [
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0
          }
        ]
      });
    }
  }, [quiz, reset]);

  const onSubmit = async (data) => {
    try {
      await updateQuiz({ id, quizData: data }).unwrap();
      router.push('/dashboard/quiz');
    } catch (error) {
      console.error('Failed to update quiz:', error);
    }
  };

  const addQuestion = () => {
    append({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const removeQuestion = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading quiz. Please try again.</p>
          <Link
            href="/dashboard/quiz"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Quiz</h1>
          <p className="text-gray-600">Update your quiz questions and settings</p>
        </div>
        <Link
          href="/dashboard/quiz"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Back to Quizzes
        </Link>
      </div>

      {/* Quiz Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Quiz Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Quiz Information
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title *
              </label>
              <input
                type="text"
                {...register("title", { 
                  required: "Quiz title is required",
                  minLength: { value: 3, message: "Title must be at least 3 characters" }
                })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter quiz title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register("description", { 
                  required: "Description is required",
                  minLength: { value: 10, message: "Description must be at least 10 characters" }
                })}
                rows="3"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe what this quiz is about"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Question
              </button>
            </div>

            {fields.map((field, questionIndex) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-gray-900">Question {questionIndex + 1}</h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Question Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Text *
                    </label>
                    <input
                      type="text"
                      {...register(`questions.${questionIndex}.question`, { 
                        required: "Question text is required" 
                      })}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.questions?.[questionIndex]?.question ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your question"
                    />
                    {errors.questions?.[questionIndex]?.question && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.questions[questionIndex].question.message}
                      </p>
                    )}
                  </div>

                  {/* Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[0, 1, 2, 3].map((optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            {...register(`questions.${questionIndex}.correctAnswer`)}
                            value={optionIndex}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            {...register(`questions.${questionIndex}.options.${optionIndex}`, { 
                              required: "Option is required" 
                            })}
                            className={`flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.questions?.[questionIndex]?.options?.[optionIndex] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    {errors.questions?.[questionIndex]?.options && (
                      <p className="mt-1 text-sm text-red-600">All options are required</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Link
              href="/dashboard/quiz"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update Quiz'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuizPage; 