import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Favorite, FavoriteItem } from "../../app/models/favorite";
import type { Property } from "../property/PropertyCard";

// function isFavoriteProperty(property: Property | FavoriteProperty): property is FavoriteProperty {
//     return (property as FavoriteProperty) !== undefined;
// }

function isFavoriteProperty(property: Property | FavoriteItem): property is FavoriteItem {
    return 'propertyId' in property;
}

export const favoriteApi = createApi({
 reducerPath: 'favoriteApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Favorite'],
    endpoints: (builder) => ({
        fetchFavorite: builder.query<Favorite, void>({
            query: () => 'favorite',
            providesTags: ['Favorite']
        }),
        addFavoriteProperty: builder.mutation<Favorite, { property: Property | FavoriteItem }>({
            query: ({ property }) => {
                const propertyId = isFavoriteProperty(property) ? property.propertyId : property.id;
                return {
                    url: `favorite?propertyId=${propertyId}`,
                    method: 'POST'
                }
            },
            onQueryStarted: async ({ property }, { dispatch, queryFulfilled }) => {
                let isNewFavorite = false;
                const patchResult = dispatch(
                    favoriteApi.util.updateQueryData('fetchFavorite', undefined, (draft) => {
                        const propertyId = isFavoriteProperty(property) ? property.propertyId : property.id;

                        if (!draft?.favoriteId) isNewFavorite = true;

                        if (!isNewFavorite) {
                            const existingItem = draft.favoriteItems.find(item => item.propertyId === propertyId);
                            if (!existingItem) 
                                draft.favoriteItems.push(isFavoriteProperty(property) 
                                ? property : {...property, propertyId: property.id});
                        }
                
                    })
                )

                try {
                    await queryFulfilled;

                    if (isNewFavorite) dispatch(favoriteApi.util.invalidateTags(['Favorite']))
                } catch (error) {
                    console.log(error);
                    patchResult.undo();
                }
            }
        }),
        removeFromFavorite: builder.mutation<void, { propertyId: number }>({
            query: ({ propertyId }) => ({
                url: `favorite?properyId=${propertyId}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({ propertyId }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    favoriteApi.util.updateQueryData('fetchFavorite', undefined, (draft) => {
                        draft.favoriteItems = draft.favoriteItems.filter(
                                    item => item.propertyId !== propertyId
                            );
                        //const itemIndex = draft.favoriteProperties.findIndex(item => item.propertyId === propertyId);
                        // if (itemIndex >= 0) {
                        //     draft.favoriteProperties[itemIndex].quantity -= quantity;
                        //     if (draft.favoriteProperties[itemIndex].quantity <= 0) {
                        //         draft.favoriteProperties.splice(itemIndex, 1);
                        //     }
                        // }
                    })
                )

                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                    patchResult.undo();
                }
            }
        })
    })
});

export const {useFetchFavoriteQuery, useAddFavoritePropertyMutation, useRemoveFromFavoriteMutation  } = favoriteApi;