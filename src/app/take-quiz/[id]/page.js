'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetQuizByIdQuery, useSubmitQuizAnswersMutation } from '@/redux/features/api/quizSlice';

const TakeQuiz = () => {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { data: quiz, isLoading, error } = useGetQuizByIdQuery(quizId);
  const [submitQuizAnswers] = useSubmitQuizAnswersMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading quiz</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Quiz not found</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleAnswerSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitQuizAnswers({
        quizId: quiz.id,
        answers: answers
      }).unwrap();
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateScore = () => {
    const correctAnswers = quiz.questions.reduce((count, question) => 
      count + (answers[question.id] === question.correctAnswer ? 1 : 0), 0);
    
    return {
      correct: correctAnswers,
      total: totalQuestions,
      percentage: Math.round((correctAnswers / totalQuestions) * 100)
    };
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h1>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{quiz.title}</h2>
                <p className="text-gray-600">{quiz.description}</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">{score.percentage}%</div>
                <div className="text-lg text-gray-700">
                  {score.correct} out of {score.total} questions correct
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-4"
                >
                  Back to Quizzes
                </button>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestionIndex(0);
                    setAnswers({});
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            
          </div>
          <p className="text-gray-600 mb-4">{quiz.description}</p>
          

          <div className="w-full bg-gray-200 rounded-lg">
          <p className="text-lg font-semibold text-center p-4 text-gray-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  answers[currentQuestion.id] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={index}
                  checked={answers[currentQuestion.id] === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                  answers[currentQuestion.id] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                  )}
                </div>
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-2 rounded-md ${
                currentQuestionIndex === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-3">
              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion.id] === undefined || answers[currentQuestion.id] === null}
                  className={`px-6 py-2 rounded-md ${
                    answers[currentQuestion.id] === undefined || answers[currentQuestion.id] === null
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || answers[currentQuestion.id] === undefined || answers[currentQuestion.id] === null}
                  className={`px-6 py-2 rounded-md ${
                    isSubmitting || answers[currentQuestion.id] === undefined || answers[currentQuestion.id] === null
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigation Has some Issue need time*/}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigation</h3>
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`p-3 rounded-md text-sm font-medium ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : answers[quiz.questions[index].id] !== undefined
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TakeQuiz;
