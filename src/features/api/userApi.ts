import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../config/config";
import Cookies from 'universal-cookie';
const cookie = new Cookies();
const prepareHeaders = (headers: any) => {
    const token = cookie.get("token") as string | undefined;
    if (token) {
        headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
};


const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/users`, prepareHeaders }),
    tagTypes: ["User"],
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),

        editProfile: builder.mutation({
            query: (body) => ({
                url: "/profile",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        getProfile: builder.query({
            query: () => "/profile",
            providesTags: ["User"],
        }),

        getUsers: builder.query({
            query: () => "/",
            providesTags: ["User"],
        }),

        getAllUserByTeacher: builder.query({
            query: () => `/users/students`,
            providesTags: ['User']
        }),
        getUserById: builder.query({
            query: (id) => `/user/${id}`,
            providesTags: ["User"],
        }),

    }),
});
export const { useGetUsersQuery, useEditProfileMutation, useGetProfileQuery, useLoginMutation, useLogoutMutation, useRegisterMutation, useGetAllUserByTeacherQuery, useGetUserByIdQuery } = userApi;
export default userApi;