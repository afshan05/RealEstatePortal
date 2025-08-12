// src/features/account/accountApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store/store";
import { toast } from "react-toastify";
import { router } from "../../app/routes/Routes";


interface User {
  id: number;
  username: string;
  email: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5001/backend/",

    prepareHeaders: (headers, { getState }) => {
  const reduxToken = (getState() as RootState).auth.token;
  const localToken = localStorage.getItem('token');
  console.log('Redux token:', reduxToken);
  console.log('LocalStorage token:', localToken);
  
  const token = reduxToken || localToken;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    console.log('Authorization header set');
  } else {
    console.log('No token available');
  }
  return headers;
},
  }),
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "account/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, {queryFulfilled}) {
    try {
      const { data } = await queryFulfilled;
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      // You should also dispatch an action to store token in Redux state
      // dispatch(setToken(data.token));
      toast.success('Login successful');
      router.navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Login failed');
    }
  }
    }),
     register: builder.mutation<void, object>({
            query: (creds) => {
                return {
                    url: 'account/register',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled;
                    toast.success('Registration successful - you can now sign in!');
                    router.navigate('/login');
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }),
    userInfo: builder.query<User, void>({
      query: () => "account/user-info",
      providesTags: ["UserInfo"],
    }),
     logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(accountApi.util.invalidateTags(['UserInfo']));
                router.navigate('/');
            }
        })
  }),
});

export const { useLoginMutation, useUserInfoQuery ,useLazyUserInfoQuery,useRegisterMutation,useLogoutMutation} = accountApi;
