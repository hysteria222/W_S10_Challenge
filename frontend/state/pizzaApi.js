import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi', 
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza'}),
    tagTypes: [''],
    endpoints: builder => ({
        getHistory: builder.query({
            query: () => 'history'
        }),
        orderPizza: builder.mutation({
            query: newOrder => ({
                url: 'order',
                method: 'POST',
                body: newOrder ,
            }),
        })
    })
})

export const {
    useGetHistoryQuery,
    useOrderPizzaMutation,
} = pizzaApi

