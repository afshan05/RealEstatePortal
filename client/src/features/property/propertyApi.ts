import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { PropertyParams } from "../../app/models/PropertyParams";
import type { Pagination } from "../../app/models/pagination";
import type { Property } from "./PropertyCard";
import { filterEmptyValues } from "../../lib/util";

export const propertyApi = createApi({
    reducerPath:'propertyApi',
    baseQuery:baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProperties: builder.query<{items: Property[], pagination: Pagination}, PropertyParams>({
                    query: (propertyParams) => {
                        return {
                            url: 'properties',
                            params: filterEmptyValues(propertyParams)
                        }
                    },
                    transformResponse: (items: Property[], meta) => {
                        const paginationHeader = meta?.response?.headers.get('Pagination');
                        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
                        return {items, pagination}
                    }
                }),
        fetchPropertyDetails: builder.query<Property, number>({
            query: (propertyId) => `properties/${propertyId}`
        }),
        fetchPropertyFilters: builder.query<{ city: string[], listingType: string[] }, void>({
            query: () => 'properties/filters'
        })
    })

});

export const {useFetchPropertyDetailsQuery, useLazyFetchPropertiesQuery,useLazyFetchPropertyFiltersQuery} = propertyApi;