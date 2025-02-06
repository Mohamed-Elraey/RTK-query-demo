import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const jsonPlaceHolderApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
    getOnePost: builder.query<Post, number | null>({
      query: (id: number) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const { data: post } = await queryFulfilled;
          dispatch(
            jsonPlaceHolderApi.util.updateQueryData(
              "getPosts",
              undefined,
              () => {
                return [post];
              }
            )
          );
        } catch (err) {
          console.error("Something went wrong", err);
        }
      },
    }),
    createPost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data: createdPost } = await queryFulfilled;
          dispatch(
            jsonPlaceHolderApi.util.updateQueryData(
              "getPosts",
              undefined,
              (posts) => {
                return [createdPost, ...posts];
              }
            )
          );
        } catch (err) {
          console.error("Something went wrong", err);
        }
      },
    }),
    updatePost: builder.mutation<Post, Post>({
      query: ({ id, ...rest }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: rest,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            jsonPlaceHolderApi.util.updateQueryData(
              "getPosts",
              undefined,
              (posts) => {
                return posts.map((post) => {
                  if (post.id === args.id) {
                    return updatedPost;
                  } else {
                    return post;
                  }
                });
              }
            )
          );
        } catch (err) {
          console.error("Something went wrong", err);
        }
      },
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            jsonPlaceHolderApi.util.updateQueryData(
              "getPosts",
              undefined,
              (posts) => {
                return posts.filter((post) => post.id !== args);
              }
            )
          );
        } catch (err) {
          console.error("Something went wrong", err);
        }
      },
    }),
  }),
});
