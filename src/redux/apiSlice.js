import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    // for signup purposes where userdata prop will be pass from component a object

    signup: builder.mutation({
      query: (userData) => ({
        url: `/v1/user/signup`,
        method: "POST",
        body: userData,
      }),
    }),

    // for login purposes where userdata prop will be pass from component a object

    login: builder.mutation({
      query: (userData) => ({
        url: `/v1/user/login`,
        method: "POST",
        body: userData,
      }),
    }),

    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/v1/user/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    // end of our apis
  }),
});

export const { useSignupMutation, useLoginMutation, useResetPasswordMutation } =
  api;
