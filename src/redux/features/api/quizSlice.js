import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizSlice = createApi({
  reducerPath: "quizAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com", // Using placeholder API for mock
  }),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    // GET ALL QUIZZES
    getQuizzes: builder.query({
      query: () => ({
        url: "/posts?_limit=10",
      }),
      keepUnusedDataFor: 600,
      providesTags: ["Quiz"],
      transformResponse: (response) => {
        return response.map((item, index) => ({
          id: item.id,
          title: `Quiz ${item.id} ${item.title}`,
          description: item.body,
          questions: [
            {
              id: 1,
              question: "What is the capital of France?",
              options: ["London", "Berlin", "Paris", "Madrid"],
              correctAnswer: 2,
            },
            {
              id: 2,
              question: "Which planet is closest to the Sun?",
              options: ["Venus", "Mercury", "Earth", "Mars"],
              correctAnswer: 1,
            },
            {
              id: 3,
              question: "What is 2 + 2?",
              options: ["3", "4", "5", "6"],
              correctAnswer: 1,
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
      },
    }),

    // GET SINGLE QUIZ BY ID
    getQuizById: builder.query({
      query: (id) => ({ 
        url: `/posts/${id}` 
      }),
      transformResponse: (response) => ({
        id: response.id,
        title: `Quiz ${response.id} ${response.title}`,
        description: response.body,
        questions: [
          {
            id: 1,
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: 2,
          },
          {
            id: 2,
            question: "Which planet is closest to the Sun?",
            options: ["Venus", "Mercury", "Earth", "Mars"],
            correctAnswer: 3,
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    }),

    // CREATE NEW QUIZ
    createQuiz: builder.mutation({
      query: (quizData) => ({
        url: "/posts",
        method: "POST",
        body: {
          title: quizData.title,
          body: quizData.description,
          userId: 1,
          questions: quizData.questions,
        },
      }),
      invalidatesTags: ["Quiz"],
    }),

    // UPDATE QUIZ
    updateQuiz: builder.mutation({
      query: ({ id, quizData }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: {
          id: id,
          title: quizData.title,
          body: quizData.description,
          userId: 1,
          questions: quizData.questions,
        },
      }),
      invalidatesTags: ["Quiz"],
    }),

    // DELETE QUIZ
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),

    // SUBMIT QUIZ ANSWERS
    submitQuizAnswers: builder.mutation({
      query: ({ quizId, answers }) => ({
        url: "/posts",
        method: "POST",
        body: {
          quizId,
          answers,
          submittedAt: new Date().toISOString(),
        },
      }),
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useSubmitQuizAnswersMutation,
} = quizSlice; 