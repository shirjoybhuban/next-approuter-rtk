import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BaseURL = "https://jsonplaceholder.typicode.com";

export const userSlice = createApi({
  reducerPath: "userAPI",
  // refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
    //credentials: 'include', // ⬅️ Important: Send cookies
  }),
  tagTypes: ["Photos"],
  endpoints: (builder) => ({
    // GET POSTS
    getUsers: builder.query({
      query: () => ({
        url: "/photos?_limit=21",
      }),
      keepUnusedDataFor: 600, // Can't refetch data under 10 min
      providesTags: ["Photos"],
    }),

    // GET SINGLE POST
    getUserById: builder.query({
      query: (id) => ({ url: `/photos/${id}` }),
    }),

    // ADD USER
    addUser: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Photos"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation } =
  userSlice;
