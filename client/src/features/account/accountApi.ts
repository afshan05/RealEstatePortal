import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { router } from "../../app/routes/Routes";
import { toast } from "react-toastify";
import type { LoginSchema } from "../../lib/schemas/loginSchema";
import type { User } from "../../app/models/user";
import { favoriteApi } from "../favorite/favoriteApi";

const nukeCookies = () => {
    const domains = [
        window.location.hostname,
        'localhost',
        '127.0.0.1'
    ];
    
    const paths = ['/', '/api', '/account'];
    
    domains.forEach(domain => {
        paths.forEach(path => {
            document.cookie = `.AspNetCore.Identity.Application=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=${path};`;
        });
    });
};
export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints: (builder) => ({
        login: builder.mutation<{token: string}, LoginSchema>({
            query: (creds) => ({
                url: 'account/login',
                method: 'POST',
                body: creds
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                   // console.log("token=",data.token);
                    localStorage.setItem('jwt', data.token);
                    dispatch(accountApi.util.invalidateTags(['UserInfo']));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        register: builder.mutation<{token: string}, object>({
            query: (creds) => ({
                url: 'account/register',
                method: 'POST',
                body: creds
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('jwt', data.token);
                    toast.success('Registration successful!');
                    router.navigate('/');
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => 'account/user-info',
            providesTags: ['UserInfo']
        }),
        
        logout: builder.mutation<void, void>({
    query: () => ({
        url: 'account/logout',
        method: 'POST',
        // Ensure credentials are included
        credentials: 'include'
    }),
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
            // First make the logout request while still authenticated
            await queryFulfilled;
            
            // Then clear client-side state
            localStorage.removeItem('jwt');
            nukeCookies();
            
            // Reset API states
            dispatch(favoriteApi.util.resetApiState());
            dispatch(accountApi.util.resetApiState());
            dispatch(accountApi.util.invalidateTags(['UserInfo']));
            
            // Navigate after successful logout
            router.navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if request fails, clear client-side state
            localStorage.removeItem('jwt');
            nukeCookies();
            dispatch(favoriteApi.util.resetApiState());
            router.navigate('/');
        }
    }
})
    }),
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false
});
export const { useLoginMutation, useUserInfoQuery ,useLazyUserInfoQuery,useRegisterMutation,useLogoutMutation} = accountApi;